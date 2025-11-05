// src/plugins/jwt.ts
import fp from 'fastify-plugin'
import jwt from '@fastify/jwt'
import { ensureBootstrapFromEnv, findByKid } from '../services/jwks.service'

import { env } from '../config/env'

declare module 'fastify' {
  interface FastifyInstance {
    auth: {
      verifyJWT: (request: any, reply: any) => Promise<void>;
      requireRole: (role: 'ADMIN' | 'DRIVER' | 'RIDER') => (request: any, reply: any) => Promise<void>;
    };
  }

  // 👇 Importante: debe coincidir con tu otra declaración (email requerido)
  interface FastifyRequest {
    user: {
      id: string;
      role: 'ADMIN' | 'DRIVER' | 'RIDER';
      email: string;
    };
  }
}

export default fp(async (app) => {
  await ensureBootstrapFromEnv()

  await app.register(jwt, {
    // Provide dynamic secret based on token header.kid
    secret: async (request: any, token: any) => {
      const kid = token?.header?.kid as string | undefined
      const key = findByKid(kid)
      return key?.secret || (env.jwtSecret || process.env.JWT_SECRET || 'dev-secret')
    },
    sign: { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
  })

  async function verifyJWT(request: any, reply: any) {
    try {
      await request.jwtVerify()
    } catch {
      return reply.code(401).send({ error: 'Unauthorized' })
    }
  }

  function requireRole(role: 'ADMIN' | 'DRIVER' | 'RIDER') {
    return async (request: any, reply: any) => {
      try {
        await request.jwtVerify()
      } catch {
        return reply.code(401).send({ error: 'Unauthorized' })
      }
      if (request.user.role !== role) {
        return reply.code(403).send({ error: 'Forbidden' })
      }
    }
  }

  app.decorate('auth', { verifyJWT, requireRole })
})
