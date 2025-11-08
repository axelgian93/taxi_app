// src/modules/push/push.routes.ts
import type { FastifyInstance } from 'fastify'
import { registerPushToken, unregisterPushToken, listAllTokens } from '../../services/push.service'

export default async function pushRoutes(app: FastifyInstance) {
  app.post('/push/register', {
    schema: {
      operationId: 'pushRegister', tags: ['push'], summary: 'Registrar token de push',
      body: {
        type: 'object', required: ['token'],
        properties: { token: { type: 'string' }, platform: { type: 'string' }, role: { type: 'string' } },
        additionalProperties: false
      },
      response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } } }
    },
    preHandler: app.auth.verifyJWT,
  }, async (req: any, reply) => {
    const userId = req.user?.id as string | undefined
    if (!userId) return reply.code(401).send({ error: 'Unauthorized' })
    const { token, platform, role } = (req.body || {}) as { token: string, platform?: string, role?: string }
    if (!token) return reply.code(400).send({ error: 'Missing token' })
    registerPushToken(userId, token, platform, role)
    return reply.send({ ok: true })
  })

  app.post('/push/unregister', {
    schema: {
      operationId: 'pushUnregister', tags: ['push'], summary: 'Eliminar token de push',
      body: { type: 'object', required: ['token'], properties: { token: { type: 'string' } }, additionalProperties: false },
      response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } } }
    },
    preHandler: app.auth.verifyJWT,
  }, async (req: any, reply) => {
    const userId = req.user?.id as string | undefined
    if (!userId) return reply.code(401).send({ error: 'Unauthorized' })
    const { token } = (req.body || {}) as { token: string }
    if (!token) return reply.code(400).send({ error: 'Missing token' })
    unregisterPushToken(userId, token)
    return reply.send({ ok: true })
  })

  // Admin debug: list tokens (ADMIN only)
  app.get('/admin/push/tokens', {
    schema: { operationId: 'adminPushTokens', tags: ['admin','push'], security: [{ bearerAuth: [] }], response: { 200: { type: 'array', items: { type: 'object' } } } },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (_req, reply) => {
    return reply.send(listAllTokens())
  })
}

