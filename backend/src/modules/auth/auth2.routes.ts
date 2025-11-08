// src/modules/auth/auth2.routes.ts
import type { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import prisma from '../../lib/prisma'
import { issueRefreshToken, rotateRefreshToken, revokeRefreshToken, revokeAllForUser } from './refresh.service'
import { checkLockedSeconds, registerFailureAndMaybeLock, clearFailuresAndUnlock } from './login-lock.service'
import crypto from 'crypto'
import { sendMail, tokenLink } from '../../services/email.service'

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
  function secsUntilThrottleReset(key: string): number {
    const cur = rlMap.get(key)
    if (!cur) return 0
    const now = Date.now()
    return cur.resetAt > now ? Math.ceil((cur.resetAt - now) / 1000) : 0
  }

  // Simple per-IP throttle (independent bucket)
  const RL_LOGIN_PER_IP_MAX = Number(process.env.RL_LOGIN_PER_IP_MAX || 50)
  const RL_LOGIN_PER_IP_WIN_MS = Number(process.env.RL_LOGIN_PER_IP_WIN_SEC || 60) * 1000
  const rlIp = new Map<string, { count: number; resetAt: number }>()
  function checkIpThrottle(ip: string): boolean {
    const now = Date.now()
    const cur = rlIp.get(ip)
    if (!cur || now >= cur.resetAt) {
      rlIp.set(ip, { count: 1, resetAt: now + RL_LOGIN_PER_IP_WIN_MS })
      return true
    }
    cur.count += 1
    if (cur.count > RL_LOGIN_PER_IP_MAX) return false
    return true
  }
  function secsUntilIpReset(ip: string): number {
    const cur = rlIp.get(ip)
    if (!cur) return 0
    const now = Date.now()
    return cur.resetAt > now ? Math.ceil((cur.resetAt - now) / 1000) : 0
  }

  // Brute-force hardening functions imported from service

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
      password: { type: 'string', minLength: 6, example: '123456' },
      deviceId: { type: 'string', nullable: true, example: 'dev-123' },
      deviceName: { type: 'string', nullable: true, example: 'Mi iPhone' },
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
    },
    example: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', refreshToken: 'rt_abcdefgh123456', user: { id: 'usr_123', email: 'driver@taxi.local', role: 'DRIVER' } }
  } as const

  // POST /auth/register
  app.post('/auth/register', {
    config: {
      rateLimit: {
        max: Number(process.env.RL_AUTH_REGISTER_MAX || 5),
        timeWindow: process.env.RL_AUTH_REGISTER_WIN || '1 minute',
        keyGenerator: (req: any) => `areg:${(req.body as any)?.email || req.ip}`,
      }
    },
    schema: {
      operationId: 'authRegister',
      tags: ['auth'],
      security: [],
      body: registerBodySchema,
      response: { 201: loginResponseSchema, 400: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Email already registered' } } }
    }
  }, async (req, reply) => {
    const { email, password, firstName, lastName, role } = req.body as { email: string; password: string; firstName: string; lastName: string; role: Role }
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return reply.code(400).send({ error: 'Email already registered' })
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

    const { signAccessToken } = await import('../../services/jwks.service')
    const token = signAccessToken({ id: user.id, email: user.email, role: user.role })
    const rt = await issueRefreshToken(user.id)
    return reply.code(201).send({ token, refreshToken: rt.token, user: { id: user.id, email: user.email, role: user.role } })
  })

  // POST /auth/login
  app.post('/auth/login', {
    config: {
      rateLimit: {
        max: Number(process.env.RL_AUTH_LOGIN_MAX || 20),
        timeWindow: process.env.RL_AUTH_LOGIN_WIN || '1 minute',
        keyGenerator: (req: any) => `alogin:${(req.body as any)?.email || req.ip}`,
      }
    },
    schema: {
      operationId: 'authLogin', tags: ['auth'], security: [],
      body: loginBodySchema,
      response: { 200: loginResponseSchema, 401: { type: 'object', properties: { error: { type: 'string' } } }, 429: { type: 'object', properties: { error: { type: 'string' } } } }
    }
  }, async (req, reply) => {
    const { email, password, deviceId, deviceName } = req.body as { email: string; password: string; deviceId?: string; deviceName?: string }
    // Global IP throttle
    const ip = (req.ip || '').toString()
    if (!checkIpThrottle(ip)) {
      const sec = secsUntilIpReset(ip)
      if (sec > 0) reply.header('Retry-After', String(sec))
      await logAttempt(email, false, 'RATE_LIMIT_IP', req)
      return reply.code(429).send({ error: 'Too Many Requests' })
    }
    const key = `login:${(email || '').toLowerCase() || req.ip}`
    if (!checkLoginThrottle(key)) {
      const sec = secsUntilThrottleReset(key)
      if (sec > 0) reply.header('Retry-After', String(sec))
      await logAttempt(email, false, 'RATE_LIMIT', req)
      return reply.code(429).send({ error: 'Too Many Requests' })
    }

    const lockedFor = checkLockedSeconds(email || '')
    if (lockedFor > 0) {
      reply.header('Retry-After', String(lockedFor))
      await logAttempt(email, false, 'LOCKED', req)
      return reply.code(429).send({ error: 'Too Many Requests' })
    }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      const sec = registerFailureAndMaybeLock(email || 'unknown')
      if (sec > 0) {
        try { const { incCounter } = await import('../../services/metrics.service'); incCounter('login_locked' as any) } catch {}
        reply.header('Retry-After', String(sec))
      } else {
        try { const { incCounter } = await import('../../services/metrics.service'); incCounter('login_failures' as any) } catch {}
      }
      await logAttempt(email, false, 'INVALID', req)
      return (reply as any).code(401).send({ error: 'Invalid credentials' })
    }

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) {
      const sec = registerFailureAndMaybeLock(email)
      if (sec > 0) {
        try { const { incCounter } = await import('../../services/metrics.service'); incCounter('login_locked' as any) } catch {}
        reply.header('Retry-After', String(sec))
      } else {
        try { const { incCounter } = await import('../../services/metrics.service'); incCounter('login_failures' as any) } catch {}
      }
      await logAttempt(email, false, 'INVALID', req)
      return (reply as any).code(401).send({ error: 'Invalid credentials' })
    }

    clearFailuresAndUnlock(email)
    const { signAccessToken } = await import('../../services/jwks.service')
    const token = signAccessToken({ id: user.id, email: user.email, role: user.role })
    const rt = await issueRefreshToken(user.id, undefined as any, { deviceId, deviceName, userAgent: (req.headers['user-agent'] as string) || null, ip: req.ip || null })
    await logAttempt(email, true, 'OK', req)
    return reply.send({ token, refreshToken: rt.token, user: { id: user.id, email: user.email, role: user.role } })
  })

  // POST /auth/refresh
  const refreshBody = { type: 'object', required: ['refreshToken'], properties: { refreshToken: { type: 'string' }, deviceId: { type: 'string', nullable: true }, deviceName: { type: 'string', nullable: true } }, additionalProperties: false } as const
  app.post('/auth/refresh', {
    schema: {
      operationId: 'authRefresh', tags: ['auth'], security: [],
      body: refreshBody,
      response: {
        200: { type: 'object', properties: { token: { type: 'string' }, refreshToken: { type: 'string' } }, example: { token: 'eyJhbGciOiJIUzI1NiIs...', refreshToken: 'rt_new_abcdef123456' } },
        401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Invalid refresh token' } }
      }
    }
  }, async (req, reply) => {
    const { refreshToken, deviceId, deviceName } = req.body as { refreshToken: string; deviceId?: string; deviceName?: string }
    const rotated = await rotateRefreshToken(refreshToken, { deviceId, deviceName, userAgent: (req.headers['user-agent'] as string) || null, ip: req.ip || null })
    if (!rotated) return (reply as any).code(401).send({ error: 'Invalid refresh token' })
    const u = await prisma.user.findUnique({ where: { id: rotated.userId }, select: { email: true, role: true } })
    const { signAccessToken } = await import('../../services/jwks.service')
    const token = signAccessToken({ id: rotated.userId, email: u?.email || '', role: (u?.role as any) || 'RIDER' })
    return reply.send({ token, refreshToken: rotated.token })
  })

  // POST /auth/logout
  const logoutBody = { type: 'object', properties: { refreshToken: { type: 'string' } }, additionalProperties: false } as const
  app.post('/auth/logout', {
    schema: { operationId: 'authLogout', tags: ['auth'], body: logoutBody, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } }, 401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } } } }
  }, async (req: any, reply) => {
    const b = (req.body || {}) as { refreshToken?: string }
    if (b.refreshToken) { await revokeRefreshToken(b.refreshToken); return reply.send({ ok: true }) }
    try { await req.jwtVerify() } catch { return (reply as any).code(401).send({ error: 'Unauthorized' }) }
    const userId = req.user?.id as string
    if (!userId) return (reply as any).code(401).send({ error: 'Unauthorized' })
    await revokeAllForUser(userId)
    return reply.send({ ok: true })
  })

  // Sessions: list own
  app.get('/auth/sessions', {
    schema: {
      operationId: 'authSessionsList', tags: ['auth'],
      response: { 200: { type: 'object', properties: { items: { type: 'array', items: { type: 'object' } } }, example: { items: [ { id: '1', deviceId: 'dev-123', deviceName: 'Mi iPhone', userAgent: 'Dart/Flutter', ip: '10.0.2.2', createdAt: '2025-01-01T12:00:00.000Z', lastUsedAt: '2025-01-01T12:10:00.000Z', expiresAt: '2025-02-01T12:00:00.000Z' } ] } } }
    },
    preHandler: app.auth.verifyJWT
  }, async (req: any, reply) => {
    const userId = req.user?.id as string
    const rows = await (prisma as any).refreshToken.findMany({ where: { userId, revokedAt: null }, orderBy: { createdAt: 'desc' }, take: 50, select: { id: true, deviceId: true, deviceName: true, userAgent: true, ip: true, createdAt: true, lastUsedAt: true, expiresAt: true } })
    return reply.send({ items: rows.map(r => ({ ...r, id: String(r.id) })) })
  })

  // Sessions: revoke by deviceId or token id
  app.post('/auth/sessions/revoke', {
    schema: { operationId: 'authSessionsRevoke', tags: ['auth'], body: { type: 'object', properties: { deviceId: { type: 'string' }, tokenId: { type: 'string' } }, additionalProperties: false }, response: { 200: { type: 'object', properties: { count: { type: 'integer' } } } } },
    preHandler: app.auth.verifyJWT
  }, async (req: any, reply) => {
    const userId = req.user?.id as string
    const b = (req.body || {}) as { deviceId?: string; tokenId?: string }
    if (!b.deviceId && !b.tokenId) return (reply as any).code(400).send({ error: 'deviceId or tokenId required' })
    const where: any = { userId, revokedAt: null }
    if (b.deviceId) where.deviceId = b.deviceId
    if (b.tokenId) where.id = Number(b.tokenId)
    const res = await prisma.refreshToken.updateMany({ where, data: { revokedAt: new Date() } })
    if (res.count > 0) { try { const { incCounter } = await import('../../services/metrics.service'); for (let i=0;i<res.count;i++) incCounter('session_revokes_total' as any) } catch {} }
    return reply.send({ count: res.count })
  })

  // Request email verification (logged-in)
  app.post('/auth/request-verify-email', {
    preHandler: app.auth.verifyJWT,
    schema: { operationId: 'authRequestVerifyEmail', tags: ['auth'], response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } } } },
    config: { rateLimit: { max: 3, timeWindow: '10 minute', keyGenerator: (req:any)=> `vreq:${req.user?.id}` } }
  }, async (req: any, reply) => {
    const userId = req.user?.id as string
    const token = crypto.randomBytes(24).toString('hex')
    const ttlMin = Number(process.env.EMAIL_VERIFY_TTL_MIN || 30)
    const expiresAt = new Date(Date.now() + ttlMin*60*1000)
    await (prisma as any).emailVerifyToken.create({ data: { userId, token, expiresAt } })
    req.log.info({ to: req.user?.email, token }, 'Email verify token issued')
    return reply.send({ ok: true })
  })

  // Request email verification (logged-in)
  app.post('/auth/request-verify-email', {
    preHandler: app.auth.verifyJWT,
    schema: { operationId: 'authRequestVerifyEmail', tags: ['auth'], response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } } } },
    config: { rateLimit: { max: 3, timeWindow: '10 minute', keyGenerator: (req:any)=> `vreq:${req.user?.id}` } }
  }, async (req: any, reply) => {
    const userId = req.user?.id as string
    const token = crypto.randomBytes(24).toString('hex')
    const ttlMin = Number(process.env.EMAIL_VERIFY_TTL_MIN || 30)
    const expiresAt = new Date(Date.now() + ttlMin*60*1000)
    await (prisma as any).emailVerifyToken.create({ data: { userId, token, expiresAt } })
    const link = tokenLink('VERIFY_EMAIL_URL', token)
    const ok = await sendMail({
      to: String((req.user as any)?.email || ''),
      subject: 'Verify your email',
      text: link ? `Click to verify your email: ${link}` : `Your verification token: ${token}`,
      html: link ? `<p>Click to verify your email:</p><p><a href="${link}">${link}</a></p>` : `<p>Your verification token:</p><pre>${token}</pre>`,
    }).catch(() => false)
    if (!ok) req.log.info({ to: req.user?.email, token, link }, 'Email verify token (email not configured; logged only)')
    return reply.send({ ok: true })
  })

  // Verify email
  app.post('/auth/verify-email', {
    schema: { operationId: 'authVerifyEmail', tags: ['auth'], body: { type: 'object', required: ['token'], properties: { token: { type: 'string' } }, additionalProperties: false }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } }, 400: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Invalid or expired token' } } } },
    config: { rateLimit: { max: 20, timeWindow: '10 minute' } }
  }, async (req: any, reply) => {
    const { token } = req.body as { token: string }
    const row = await (prisma as any).emailVerifyToken.findUnique({ where: { token } })
    if (!row || row.usedAt || row.expiresAt < new Date()) return reply.code(400).send({ error: 'Invalid or expired token' })
    await prisma.$transaction([
      (prisma as any).user.update({ where: { id: row.userId }, data: { emailVerifiedAt: new Date() } as any }),
      (prisma as any).emailVerifyToken.update({ where: { token }, data: { usedAt: new Date() } })
    ])
    return reply.send({ ok: true })
  })

  // Request password reset
  app.post('/auth/request-password-reset', {
    schema: { operationId: 'authRequestPasswordReset', tags: ['auth'], body: { type: 'object', required: ['email'], properties: { email: { type: 'string', format: 'email' } }, additionalProperties: false }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } } } },
    config: { rateLimit: { max: 5, timeWindow: '10 minute', keyGenerator: (req:any)=> `pr:${(req.body as any)?.email || req.ip}` } }
  }, async (req: any, reply) => {
    const { email } = req.body as { email: string }
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } })
    if (user) {
      const token = crypto.randomBytes(24).toString('hex')
      const ttlMin = Number(process.env.PASSWORD_RESET_TTL_MIN || 30)
      const expiresAt = new Date(Date.now() + ttlMin*60*1000)
      await (prisma as any).passwordResetToken.create({ data: { userId: user.id, token, expiresAt } })
      const link = tokenLink('RESET_PASSWORD_URL', token)
      const ok = await sendMail({
        to: email,
        subject: 'Reset your password',
        text: link ? `Click to reset your password: ${link}` : `Your reset token: ${token}`,
        html: link ? `<p>Click to reset your password:</p><p><a href="${link}">${link}</a></p>` : `<p>Your reset token:</p><pre>${token}</pre>`,
      }).catch(() => false)
      if (!ok) req.log.info({ to: email, token, link }, 'Password reset token (email not configured; logged only)')
    }
    return reply.send({ ok: true })
  })
  // Verify email
  app.post('/auth/verify-email', {
    schema: { operationId: 'authVerifyEmail', tags: ['auth'], body: { type: 'object', required: ['token'], properties: { token: { type: 'string' } }, additionalProperties: false }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } }, 400: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Invalid or expired token' } } } },
    config: { rateLimit: { max: 20, timeWindow: '10 minute' } }
  }, async (req: any, reply) => {
    const { token } = req.body as { token: string }
    const row = await (prisma as any).emailVerifyToken.findUnique({ where: { token } })
    if (!row || row.usedAt || row.expiresAt < new Date()) return reply.code(400).send({ error: 'Invalid or expired token' })
    await prisma.$transaction([
      (prisma as any).user.update({ where: { id: row.userId }, data: { emailVerifiedAt: new Date() } as any }),
      (prisma as any).emailVerifyToken.update({ where: { token }, data: { usedAt: new Date() } })
    ])
    return reply.send({ ok: true })
  })

  // Request password reset
  app.post('/auth/request-password-reset', {
    schema: { operationId: 'authRequestPasswordReset', tags: ['auth'], body: { type: 'object', required: ['email'], properties: { email: { type: 'string', format: 'email' } }, additionalProperties: false }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } } } },
    config: { rateLimit: { max: 5, timeWindow: '10 minute', keyGenerator: (req:any)=> `pr:${(req.body as any)?.email || req.ip}` } }
  }, async (req: any, reply) => {
    const { email } = req.body as { email: string }
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } })
    if (user) {
      const token = crypto.randomBytes(24).toString('hex')
      const ttlMin = Number(process.env.PASSWORD_RESET_TTL_MIN || 30)
      const expiresAt = new Date(Date.now() + ttlMin*60*1000)
      await (prisma as any).passwordResetToken.create({ data: { userId: user.id, token, expiresAt } })
      req.log.info({ to: email, token }, 'Password reset token issued')
    }
    return reply.send({ ok: true })
  })

  // Reset password
  app.post('/auth/reset-password', {
    schema: { operationId: 'authResetPassword', tags: ['auth'], body: { type: 'object', required: ['token','newPassword'], properties: { token: { type: 'string' }, newPassword: { type: 'string', minLength: 6 } }, additionalProperties: false }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } }, 400: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Invalid or expired token' } } } },
    config: { rateLimit: { max: 20, timeWindow: '10 minute' } }
  }, async (req: any, reply) => {
    const { token, newPassword } = req.body as { token: string; newPassword: string }
    const row = await (prisma as any).passwordResetToken.findUnique({ where: { token } })
    if (!row || row.usedAt || row.expiresAt < new Date()) return reply.code(400).send({ error: 'Invalid or expired token' })
    const passwordHash = await bcrypt.hash(newPassword, 10)
    await prisma.$transaction([
      (prisma as any).user.update({ where: { id: row.userId }, data: { passwordHash } as any }),
      (prisma as any).passwordResetToken.update({ where: { token }, data: { usedAt: new Date() } }),
      prisma.refreshToken.updateMany({ where: { userId: row.userId, revokedAt: null }, data: { revokedAt: new Date() } })
    ])
    return reply.send({ ok: true })
  })

  // Sessions: revoke all (alias)
  app.post('/auth/sessions/revoke-all', {
    schema: { operationId: 'authSessionsRevokeAll', tags: ['auth'], response: { 200: { type: 'object', properties: { count: { type: 'integer' } } } } },
    preHandler: app.auth.verifyJWT
  }, async (req: any, reply) => {
    const userId = req.user?.id as string
    const res = await prisma.refreshToken.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } })
    if (res.count > 0) { try { const { incCounter } = await import('../../services/metrics.service'); for (let i=0;i<res.count;i++) incCounter('session_revokes_total' as any) } catch {} }
    return reply.send({ count: res.count })
  })

  // GET /auth/me
  app.get('/auth/me', { schema: { operationId: 'authMe', tags: ['auth'], response: { 200: { type: 'object', properties: { user: { type: 'object', properties: { id: { type: 'string' }, email: { type: 'string' }, role: { type: 'string', enum: ['ADMIN','DRIVER','RIDER'] }, firstName: { type: 'string' }, lastName: { type: 'string' }, emailVerifiedAt: { anyOf: [{ type: 'string', format: 'date-time' }, { type: 'null' }] } } } } }, 401: { type: 'object', properties: { error: { type: 'string' } } } } } }, async (req: any, reply) => {
    try { await req.jwtVerify() } catch { return (reply as any).code(401).send({ error: 'Unauthorized' }) }
    const user = await prisma.user.findUnique({ where: { id: req.user.id as string }, select: { id: true, email: true, role: true, firstName: true, lastName: true, emailVerifiedAt: true } as any })
    return reply.send({ user })
  })
}

async function logAttempt(email: string, success: boolean, reason: string, req: any) {
  try {
    const ip = (req.ip || '').toString()
    const ua = (req.headers?.['user-agent'] || '').toString()
    await prisma.$executeRawUnsafe(
      'INSERT INTO "LoginAttempt" (email, success, ip, "userAgent", reason) VALUES ($1, $2, $3, $4, $5)',
      email || '', success, ip, ua, reason || ''
    )
  } catch {
    // ignore
  }
}

