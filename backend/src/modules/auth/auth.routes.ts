import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import prisma from '../../lib/prisma'
import { signJwt } from '../../lib/jwt'
import {
  loginBodySchema,
  loginResponseSchema,
  registerBodySchema,
  errorResponse
} from './auth.schemas'

export default async function authRoutes(app: FastifyInstance) {
  // POST /auth/register
  app.post('/auth/register', {
    schema: {
      tags: ['auth'],
      body: registerBodySchema,
      response: {
        201: loginResponseSchema,
        400: errorResponse,
        409: errorResponse
      }
    }
  }, async (req, reply) => {
    const { email, password, firstName, lastName, role } = req.body as any

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return reply.code(409).send({ error: 'Email ya registrado' })

    const hash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, passwordHash: hash, firstName, lastName, role }
    })

    if (role === 'DRIVER') {
      await prisma.driverProfile.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id, rating: 5, totalTrips: 0, status: 'IDLE' }
      })
    } else if (role === 'RIDER') {
      await prisma.riderProfile.upsert({
        where: { userId: user.id },
        update: {},
        create: { userId: user.id }
      })
    }

    const token = signJwt({ sub: user.id, email: user.email, role: user.role })
    return reply.code(201).send({ token, user: { id: user.id, email: user.email, role: user.role } })
  })

  // POST /auth/login
  app.post('/auth/login', {
    schema: {
      tags: ['auth'],
      body: loginBodySchema,
      response: {
        200: loginResponseSchema,
        400: errorResponse,
        401: errorResponse
      }
    }
  }, async (req, reply) => {
    const { email, password } = (req.body || {}) as { email?: string; password?: string }
    if (!email || !password) return reply.code(400).send({ error: 'email y password son requeridos' })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return reply.code(401).send({ error: 'Credenciales inválidas' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return reply.code(401).send({ error: 'Credenciales inválidas' })

    const token = signJwt({ sub: user.id, email: user.email, role: user.role })
    return reply.send({ token, user: { id: user.id, email: user.email, role: user.role } })
  })
}
