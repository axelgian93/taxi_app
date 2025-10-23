import { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import bcrypt from 'bcrypt'
import { signJwt, verifyJwt } from '../../lib/jwt'

// ---------- Schemas comunes ----------
const userSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    email: { type: 'string' },
    role: { type: 'string', enum: ['ADMIN', 'DRIVER', 'RIDER'] }
  }
} as const

// ---------- /auth/register ----------
const registerBodySchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6, description: 'mínimo 6 caracteres' },
    role: { type: 'string', enum: ['RIDER', 'DRIVER'], default: 'RIDER' },
    firstName: { type: 'string' },
    lastName: { type: 'string' }
  },
  additionalProperties: false
} as const

const registerResponseSchema = {
  201: {
    type: 'object',
    properties: {
      token: { type: 'string' },
      user: userSchema
    }
  },
  400: { type: 'object', properties: { error: { type: 'string' } } },
  409: { type: 'object', properties: { error: { type: 'string' } } }
} as const

// ---------- /auth/login ----------
const loginBodySchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 3 }
  },
  additionalProperties: false
} as const

const loginResponseSchema = {
  200: {
    type: 'object',
    properties: {
      token: { type: 'string' },
      user: userSchema
    }
  },
  400: { type: 'object', properties: { error: { type: 'string' } } },
  401: {
    type: 'object',
    properties: { error: { type: 'string' } }
  }
} as const

// ---------- /auth/me ----------
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
  // POST /auth/register
  app.post(
    '/auth/register',
    {
      schema: {
        tags: ['auth'],
        description: 'Crea un usuario (RIDER o DRIVER) y devuelve JWT',
        body: registerBodySchema,
        response: registerResponseSchema
      }
    },
    async (req, reply) => {
      const { email, password, role = 'RIDER', firstName, lastName } = (req.body || {}) as {
        email?: string
        password?: string
        role?: 'RIDER' | 'DRIVER'
        firstName?: string
        lastName?: string
      }

      if (!email || !password) {
        return reply.code(400).send({ error: 'email y password son requeridos' })
      }

      const exists = await prisma.user.findUnique({ where: { email } })
      if (exists) {
        return reply.code(409).send({ error: 'Email ya registrado' })
      }

      const hash = await bcrypt.hash(password, 10)

      // Creamos user básico; ADMIN no se permite por aquí
      const user = await prisma.user.create({
        data: {
          email,
          passwordHash: hash,
          firstName: (firstName ?? null) as any,
          lastName: (lastName ?? null) as any,
          role: role as any,
          isActive: true
        }
      })

      // Si registró como DRIVER, aseguramos su DriverProfile (licenseNumber es obligatorio)
      if (role === 'DRIVER') {
        await prisma.driverProfile.upsert({
          where: { userId: user.id },
          update: {},
          create: {
            userId: user.id,
            rating: 5.0,
            totalTrips: 0,
            status: 'OFFLINE' as any,
            licenseNumber: 'PENDING' // <- requerido por tu schema
          }
        })
      }

      // Si registró como RIDER, aseguramos su RiderProfile
      if (role === 'RIDER') {
        await prisma.riderProfile.upsert({
          where: { userId: user.id },
          update: {},
          create: { userId: user.id }
        })
      }

      const token = signJwt({ sub: user.id, email: user.email, role: user.role })
      return reply.code(201).send({ token, user: { id: user.id, email: user.email, role: user.role } })
    }
  )

  // POST /auth/login
  app.post(
    '/auth/login',
    {
      schema: {
        tags: ['auth'],
        body: loginBodySchema,
        response: loginResponseSchema
      }
    },
    async (req, reply) => {
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

  // GET /auth/me
  app.get(
    '/auth/me',
    {
      schema: {
        tags: ['auth'],
        security: [{ bearerAuth: [] }],
        response: meResponseSchema
      }
    },
    async (req, reply) => {
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
