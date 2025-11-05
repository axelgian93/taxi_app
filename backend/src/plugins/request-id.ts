// src/plugins/request-id.ts
import type { FastifyInstance } from 'fastify'

export default async function requestIdPlugin(app: FastifyInstance) {
  app.addHook('onRequest', async (req, reply) => {
    // Ensure X-Request-Id header is set for downstream and responses
    const incoming = (req.headers['x-request-id'] as string | undefined)?.trim()
    const id = incoming && incoming.length > 0 ? incoming : req.id
    reply.header('x-request-id', id)
  })
}

