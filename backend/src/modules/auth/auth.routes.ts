// src/modules/auth/auth.routes.ts
import type { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import prisma from '../../lib/prisma'
type Role = 'ADMIN' | 'DRIVER' | 'RIDER'

export default async function authRoutes(app: FastifyInstance) {
  // Schemas (Swagger + validaciÃ³n)
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
      response: {
        201: loginResponseSchema,
        400: { type: 'object', properties: { error: { type: 'string' } } }
      }
    }
  }, async (req, reply) => {
    const { email, password, firstName, lastName, role } = req.body as {
      email: string; password: string; firstName: string; lastName: string; role: Role
    }

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return reply.code(400).send({ error: 'Email ya registrado' })

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { email, passwordHash, firstName, lastName, role }
    })

    if (role === 'DRIVER') {
      await prisma.driverProfile.upsert({
        where:  { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          rating: 5.0,
          totalTrips: 0,
          status: 'IDLE', // enum vÃ¡lido
          licenseNumber: "PENDING-{user.id}"          // requerido por tu schema
        }
      })
    }

    if (role === 'RIDER') {
      await prisma.riderProfile.upsert({
        where:  { userId: user.id },
        update: {},
        create: { userId: user.id }
      })
    }

    const token = (app as any).jwt.sign({ id: user.id, email: user.email, role: user.role })

    return reply.code(201).send({
      token,
      user: { id: user.id, email: user.email, role: user.role }
    })
  })

  // POST /auth/login
  app.post('/auth/login', {
    schema: {
      operationId: 'authLogin',
      tags: ['auth'],
      security: [],
      body: loginBodySchema,
      response: {
        200: loginResponseSchema,
        401: { type: 'object', properties: { error: { type: 'string' } } }
      }
    }
  }, async (req, reply) => {
    const { email, password } = req.body as { email: string; password: string }

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return reply.code(401).send({ error: 'Credenciales invÃ¡lidas' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return reply.code(401).send({ error: 'Credenciales invÃ¡lidas' })

    const token = (app as any).jwt.sign({ id: user.id, email: user.email, role: user.role })

    return reply.send({
      token,
      user: { id: user.id, email: user.email, role: user.role }
    })
  })

  // GET /auth/me
  app.get('/auth/me', { schema: { operationId: 'authMe', tags: ['auth'], response: { 200: { type: 'object', properties: { user: { type: 'object', properties: { id: { type: 'string' }, email: { type: 'string' }, role: { type: 'string', enum: ['ADMIN','DRIVER','RIDER'] }, firstName: { type: 'string' }, lastName: { type: 'string' } } } } }, 401: { type: 'object', properties: { error: { type: 'string' } } } } } }, async (req: any, reply) => {
    try {
      await req.jwtVerify()
    } catch {
      return reply.code(401).send({ error: 'Unauthorized' })
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id as string },
      select: { id: true, email: true, role: true, firstName: true, lastName: true }
    })

    return reply.send({ user })
  })
}
