// src/utils/authGuard.ts
import { FastifyReply, FastifyRequest } from 'fastify'
import { verifyJwt } from '../lib/jwt'

export function authGuard(roles?: Array<'ADMIN' | 'DRIVER' | 'RIDER'>) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const auth = req.headers.authorization
    if (!auth || !auth.toLowerCase().startsWith('bearer ')) {
      return reply.code(401).send({ error: 'Missing Bearer token' })
    }
    const token = auth.slice(7)
    try {
      const payload = verifyJwt(token)
      req.user = { id: payload.sub, role: payload.role, email: payload.email }
      if (roles && roles.length > 0 && !roles.includes(payload.role)) {
        return reply.code(403).send({ error: 'Forbidden: role not allowed' })
      }
    } catch {
      return reply.code(401).send({ error: 'Invalid/expired token' })
    }
  }
}
