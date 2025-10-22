import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import prisma from '../../lib/prisma'
import bcrypt from 'bcrypt'
import { signJwt, verifyJwt } from '../../lib/jwt'

const loginBodySchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 3 }
  }
} as const

const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    email: { type: 'string' },
    role: { type: 'string', enum: ['ADMIN', 'DRIVER', 'RIDER'] }
  }
} as const

const loginResponseSchema = {
  200: {
    type: 'object',
    properties: {
      token: { type: 'string' },
      user: userSchema
    }
  },
  401: {
    type: 'object',
    properties: { error: { type: 'string' } }
  }
} as const

const meResponseSchema = {
  200: {
    type: 'object',
    properties: {
      ok: { type: 'boolean' },
      user: userSchema
    }
  },
  401: {
    type: 'object',
    properties: { error: { type: 'string' } }
  }
} as const

export default async function authRoutes(app: FastifyInstance) {
  app.post(
    '/auth/login',
    {
      schema: {
        tags: ['auth'],
        body: loginBodySchema,
        response: loginResponseSchema
      }
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { email, password } = (req.body || {}) as { email?: string; password?: string }
      if (!email || !password) return reply.code(400).send({ error: 'email y password son requeridos' })

      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) return reply.code(401).send({ error: 'Credenciales inválidas' })

      const ok = await bcrypt.compare(password, user.passwordHash)
      if (!ok) return reply.code(401).send({ error: 'Credenciales inválidas' })

      const token = signJwt({ sub: user.id, email: user.email, role: user.role })
      return reply.send({ token, user: { id: user.id, email: user.email, role: user.role } })
    }
  )

  app.get(
    '/auth/me',
    {
      schema: {
        tags: ['auth'],
        security: [{ bearerAuth: [] }],
        response: meResponseSchema
      }
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const auth = req.headers.authorization || ''
      const t = auth.startsWith('Bearer ') ? auth.slice(7) : ''
      if (!t) return reply.code(401).send({ error: 'Falta token' })

      try {
        const decoded = verifyJwt(t)
        return reply.send({ ok: true, user: { id: decoded.sub, email: decoded.email, role: decoded.role } })
      } catch {
        return reply.code(401).send({ error: 'Token inválido' })
      }
    }
  )
}
