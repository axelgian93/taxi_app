// src/modules/admin/admin.jwks.routes.ts
import type { FastifyInstance } from 'fastify'
import { listKeyMeta, rotateKey, getActive } from '../../services/jwks.service'

export default async function adminJwksRoutes(app: FastifyInstance) {
  // List keys (metadata only)
  app.get('/admin/jwks', {
    schema: { operationId: 'adminJwksList', tags: ['admin'], summary: 'JWT keys (metadata)', response: { 200: { type: 'object', properties: { items: { type: 'array', items: { type: 'object', properties: { kid: { type: 'string' }, active: { type: 'boolean' }, createdAt: { type: 'string', format: 'date-time' } } } }, activeKid: { type: 'string' } } } } },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (_req, reply) => {
    const items = listKeyMeta()
    const active = getActive()?.kid || 'default'
    return reply.send({ items, activeKid: active })
  })

  // Rotate key
  app.post('/admin/jwks/rotate', {
    schema: { operationId: 'adminJwksRotate', tags: ['admin'], summary: 'Rotate JWT key', body: { type: 'object', properties: { kid: { type: 'string' }, secret: { type: 'string' } }, required: ['secret'] }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, kid: { type: 'string' } } } } },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (req: any, reply) => {
    const b = (req.body || {}) as { kid?: string; secret: string }
    const kid = (b.kid && String(b.kid).trim()) || `kid_${Date.now()}`
    const secret = String(b.secret)
    await rotateKey(kid, secret)
    return reply.send({ ok: true, kid })
  })
}

