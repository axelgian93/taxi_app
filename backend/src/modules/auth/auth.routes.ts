// src/modules/auth/auth.routes.ts
import { FastifyInstance } from 'fastify'
import bcrypt from 'bcrypt'
import { prisma } from '../../lib/prisma'
import { signJwt, verifyJwt } from '../../lib/jwt'

export default async function authRoutes(app: FastifyInstance) {
  // Registro
  app.post('/auth/register', async (req, reply) => {
    const body = (req.body || {}) as {
      email?: string
      password?: string
      firstName?: string
      lastName?: string
      role?: 'RIDER' | 'DRIVER'
      licenseNumber?: string
    }
    const { email, password, firstName, lastName } = body
    const role = body.role ?? 'RIDER'
    if (!email || !password || !firstName || !lastName) {
      return reply.code(400).send({ error: 'email, password, firstName, lastName son requeridos' })
    }

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return reply.code(409).send({ error: 'Email ya registrado' })

    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { email, passwordHash, firstName, lastName, role },
    })

    if (role === 'DRIVER') {
      await prisma.driverProfile.create({
        data: {
          userId: user.id,
          licenseNumber: body.licenseNumber ?? `LIC-${user.id.substring(0, 6)}`,
          status: 'OFFLINE',
        },
      })
    } else {
      await prisma.riderProfile.create({ data: { userId: user.id } })
    }

    const token = signJwt({ sub: user.id, email: user.email, role: user.role })
    return reply.send({ token, user: { id: user.id, email: user.email, role: user.role } })
  })

  // Login
  app.post('/auth/login', async (req, reply) => {
    const { email, password } = (req.body || {}) as { email?: string; password?: string }
    if (!email || !password) return reply.code(400).send({ error: 'email y password son requeridos' })

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) return reply.code(401).send({ error: 'Credenciales inválidas' })

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return reply.code(401).send({ error: 'Credenciales inválidas' })

    const token = signJwt({ sub: user.id, email: user.email, role: user.role })
    return reply.send({ token, user: { id: user.id, email: user.email, role: user.role } })
  })

  // Perfil actual
  app.get('/auth/me', async (req, reply) => {
    const auth = req.headers.authorization
    if (!auth?.toLowerCase().startsWith('bearer ')) return reply.code(401).send({ error: 'Missing token' })
    const token = auth.slice(7)
    try {
      const payload = verifyJwt(token)
      return reply.send({ user: { id: payload.sub, email: payload.email, role: payload.role } })
    } catch {
      return reply.code(401).send({ error: 'Invalid/expired token' })
    }
  })
}
