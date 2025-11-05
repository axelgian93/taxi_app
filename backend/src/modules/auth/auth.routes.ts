// src/modules/auth/auth.routes.ts
import type { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import prisma from '../../lib/prisma'
import { issueRefreshToken, rotateRefreshToken, revokeRefreshToken, revokeAllForUser } from './refresh.service'

type Role = 'ADMIN' | 'DRIVER' | 'RIDER'

export default async function authRoutes(app: FastifyInstance) {
  // Simple per-email throttle (fallback in-memory)
  const RL_LOGIN_MAX = Number(process.env.RL_LOGIN_PER_EMAIL_MAX || 10)
  const RL_LOGIN_WIN_MS = Number(process.env.RL_LOGIN_PER_EMAIL_WIN_SEC || 60) * 1000
  const rlMap = new Map<string, { count: number; resetAt: number }>()
  function checkLoginThrottle(key: string): boolean {
    const now = Date.now()
    const cur = rlMap.get(key)
    if (!cur || now >= cur.resetAt) {
      rlMap.set(key, { count: 1, resetAt: now + RL_LOGIN_WIN_MS })
      return true
    }
    cur.count += 1
    if (cur.count > RL_LOGIN_MAX) return false
    return true
  }

  // Schemas
  const registerBodySchema = {
    type: 'object',
    required: ['email', 'password', 'firstName', 'lastName', 'role'],
    properties: {
      email:     { type: 'string', format: 'email', example: 'driver@taxi.local' },
      password:  { type: 'string', minLength: 6, example: '123456' },
      firstName: { type: 'string', example: 'John' },
      lastName:  { type: 'string', example: 'Doe' },
      role:      { type: 'string', enum: ['ADMIN', 'DRIVER', 'RIDER'], example: 'DRIVER' }
    },
    additionalProperties: false
  } as const

  const loginBodySchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email:    { type: 'string', format: 'email', example: 'driver@taxi.local' },
      password: { type: 'string', minLength: 6, example: '123456' }
    },
    additionalProperties: false
  } as const

  const loginResponseSchema = {
    type: 'object',
    properties: {
      token: { type: 'string' },
      refreshToken: { type: 'string' },
      user: {
        type: 'object',
        properties: {
          id:    { type: 'string' },
          email: { type: 'string' },
          role:  { type: 'string', enum: ['ADMIN', 'DRIVER', 'RIDER'] }
        }
      }
    }
  } as const

  // POST /auth/register
  app.post('/auth/register', {
    schema: {
      operationId: 'authRegister',
      tags: ['auth'],
      security: [],
      body: registerBodySchema,
      response: { 201: loginResponseSchema, 400: { type: 'object', properties: { error: { type: 'string' } } } }
    }
  }, async (req, reply) => {
    const { email, password, firstName, lastName, role } = req.body as { email: string; password: string; firstName: string; lastName: string; role: Role }
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return reply.code(400).send({ error: 'Email ya registrado' })
    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({ data: { email, passwordHash, firstName, lastName, role } })

    if (role === 'DRIVER') {
      await prisma.driverProfile.upsert({
        where:  { userId: user.id },
        update: {},
        create: { userId: user.id, rating: 5.0 as any, totalTrips: 0, status: 'IDLE' as any, licenseNumber: `PENDING-${user.id}` }
      })
    }
    if (role === 'RIDER') {
      await prisma.riderProfile.upsert({ where: { userId: user.id }, update: {}, create: { userId: user.id } })
    }

    const token = app.jwt.sign({ id: user.id, email: user.email, role: user.role })
    const rt = await issueRefreshToken(user.id)
    return reply.code(201).send({ token, refreshToken: rt.token, user: { id: user.id, email: user.email, role: user.role } })
  })

  // POST /auth/login
  app.post('/auth/login', {
    schema: {
      operationId: 'authLogin', tags: ['auth'], security: [],
      body: loginBodySchema,
      response: { 200: loginResponseSchema, 401: { type: 'object', properties: { error: { type: 'string' } } }, 429: { type: 'object', properties: { error: { type: 'string' } } } }
    },
    config: {
      rateLimit: {
        max: Number(process.env.RL_LOGIN_PER_EMAIL_MAX || 10),
        timeWindow: process.env.RL_LOGIN_PER_EMAIL_WIN || '1 minute',
        keyGenerator: (req: any) => `login:${(req.body && req.body.email) || req.ip}`,
      }
    }
  }, async (req, reply) => {
    const { email, password } = req.body as { email: string; password: string }
    const key = `login:${(email || '').toLowerCase() || req.ip}`
    if (!checkLoginThrottle(key)) return reply.code(429).send({ error: 'Too Many Requests' })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return (reply as any).code(401).send({ error: 'Credenciales inválidas' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return (reply as any).code(401).send({ error: 'Credenciales inválidas' })

    const token = app.jwt.sign({ id: user.id, email: user.email, role: user.role })
    const rt = await issueRefreshToken(user.id)
    return reply.send({ token, refreshToken: rt.token, user: { id: user.id, email: user.email, role: user.role } })
  })

  // POST /auth/refresh
  const refreshBody = { type: 'object', required: ['refreshToken'], properties: { refreshToken: { type: 'string' } }, additionalProperties: false } as const
  app.post('/auth/refresh', {
    schema: {
      operationId: 'authRefresh', tags: ['auth'], security: [],
      body: refreshBody,
      response: { 200: { type: 'object', properties: { token: { type: 'string' }, refreshToken: { type: 'string' } } }, 401: { type: 'object', properties: { error: { type: 'string' } } } }
    }
  }, async (req, reply) => {
    const { refreshToken } = req.body as { refreshToken: string }
    const rotated = await rotateRefreshToken(refreshToken)
    if (!rotated) return (reply as any).code(401).send({ error: 'Invalid refresh token' })
    const u = await prisma.user.findUnique({ where: { id: rotated.userId }, select: { email: true, role: true } })
    const token = app.jwt.sign({ id: rotated.userId, email: u?.email || '', role: (u?.role as any) || 'RIDER' })
    return reply.send({ token, refreshToken: rotated.token })
  })

  // POST /auth/logout
  const logoutBody = { type: 'object', properties: { refreshToken: { type: 'string' } }, additionalProperties: false } as const
  app.post('/auth/logout', {
    schema: { operationId: 'authLogout', tags: ['auth'], body: logoutBody, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } } } }
  }, async (req: any, reply) => {
    const b = (req.body || {}) as { refreshToken?: string }
    if (b.refreshToken) { await revokeRefreshToken(b.refreshToken); return reply.send({ ok: true }) }
    try { await req.jwtVerify() } catch { return (reply as any).code(401).send({ error: 'Unauthorized' }) }
    const userId = req.user?.id as string
    if (!userId) return (reply as any).code(401).send({ error: 'Unauthorized' })
    await revokeAllForUser(userId)
    return reply.send({ ok: true })
  })

  // GET /auth/me
  app.get('/auth/me', { schema: { operationId: 'authMe', tags: ['auth'], response: { 200: { type: 'object', properties: { user: { type: 'object', properties: { id: { type: 'string' }, email: { type: 'string' }, role: { type: 'string', enum: ['ADMIN','DRIVER','RIDER'] }, firstName: { type: 'string' }, lastName: { type: 'string' } } } } }, 401: { type: 'object', properties: { error: { type: 'string' } } } } } }, async (req: any, reply) => {
    try { await req.jwtVerify() } catch { return (reply as any).code(401).send({ error: 'Unauthorized' }) }
    const user = await prisma.user.findUnique({ where: { id: req.user.id as string }, select: { id: true, email: true, role: true, firstName: true, lastName: true } })
    return reply.send({ user })
  })
}
