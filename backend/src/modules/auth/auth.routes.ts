// src/modules/auth/auth.routes.ts
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import prisma from '../../lib/prisma'
import bcrypt from 'bcrypt'
import { signJwt, verifyJwt } from '../../lib/jwt'
import { Role } from '@prisma/client' // 👈 usamos el enum de Prisma

// --- Schemas Zod ---
const loginSchema = {
  tags: ['auth'],
  body: z.object({
    email: z.string().email(),
    password: z.string().min(4)
  }),
  response: {
    200: z.object({
      token: z.string(),
      user: z.object({
        id: z.string(),
        email: z.string().email(),
        role: z.enum(['ADMIN', 'DRIVER', 'RIDER'])
      })
    }),
    401: z.object({ error: z.string() }).describe('Credenciales inválidas')
  }
} as const

const registerSchema = {
  tags: ['auth'],
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    // Solo permitimos crear DRIVER o RIDER desde este endpoint de pruebas
    role: z.enum(['DRIVER', 'RIDER']).default('RIDER')
  }),
  response: {
    201: z.object({
      id: z.string(),
      email: z.string().email(),
      role: z.enum(['ADMIN', 'DRIVER', 'RIDER'])
    }),
    400: z.object({ error: z.string() }).describe('Usuario ya existe')
  }
} as const

const meSchema = {
  tags: ['auth'],
  security: [{ bearerAuth: [] }],
  response: {
    200: z.object({
      ok: z.literal(true),
      user: z.object({
        id: z.string(),
        email: z.string().email(),
        role: z.enum(['ADMIN', 'DRIVER', 'RIDER'])
      })
    }),
    401: z.object({ error: z.string() })
  }
} as const

export default async function authRoutes(app: FastifyInstance) {
  // POST /auth/login
  app.post(
    '/auth/login',
    { schema: loginSchema },
    async (req, reply) => {
      const { email, password } = req.body as z.infer<typeof loginSchema.body>

      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) return reply.code(401).send({ error: 'Credenciales inválidas' })

      const ok = await bcrypt.compare(password, user.passwordHash)
      if (!ok) return reply.code(401).send({ error: 'Credenciales inválidas' })

      const token = signJwt({ sub: user.id, email: user.email, role: user.role })
      return reply.send({
        token,
        user: { id: user.id, email: user.email, role: user.role }
      })
    }
  )

  // POST /auth/register  (opcional, útil para pruebas)
  app.post(
    '/auth/register',
    { schema: registerSchema },
    async (req, reply) => {
      const { email, password, role } = req.body as z.infer<typeof registerSchema.body>

      const exists = await prisma.user.findUnique({ where: { email } })
      if (exists) return reply.code(400).send({ error: 'Ya existe un usuario con ese email' })

      const hash = await bcrypt.hash(password, 10)

      // 👇 Cast explícito al enum de Prisma
      const created = await prisma.user.create({
        data: { email, passwordHash: hash, role: role as Role }
      })

      return reply.code(201).send({ id: created.id, email: created.email, role: created.role })
    }
  )

  // GET /auth/me  (decodifica el JWT del Authorization Bearer)
  app.get(
    '/auth/me',
    { schema: meSchema },
    async (req, reply) => {
      const auth = req.headers.authorization || ''
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : ''
      if (!token) return reply.code(401).send({ error: 'Falta token' })

      try {
        const decoded = verifyJwt(token) as { sub: string; email: string; role: 'ADMIN' | 'DRIVER' | 'RIDER' }
        return reply.send({ ok: true, user: { id: decoded.sub, email: decoded.email, role: decoded.role } })
      } catch {
        return reply.code(401).send({ error: 'Token inválido o expirado' })
      }
    }
  )
}
