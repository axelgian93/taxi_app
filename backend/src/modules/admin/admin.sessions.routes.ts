// src/modules/admin/admin.sessions.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'

export default async function adminSessionsRoutes(app: FastifyInstance) {
  // List sessions (refresh tokens) for a user
  app.get('/admin/auth/sessions', {
    schema: {
      operationId: 'adminAuthSessionsList', tags: ['admin'],
      summary: 'List user sessions',
      querystring: {
        type: 'object',
        properties: {
          userId: { type: 'string', nullable: true },
          email: { type: 'string', nullable: true },
          limit: { type: 'integer', minimum: 1, maximum: 1000, default: 200 },
          format: { type: 'string', enum: ['json','csv'], default: 'json' }
        }
      },
      response: { 200: { type: 'object', properties: { items: { type: 'array', items: { type: 'object' } } } } }
    },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (req: any, reply) => {
    const q = (req.query || {}) as any
    const limit = Math.min(Math.max(Number(q.limit || 200), 1), 1000)
    const params: any[] = [limit]
    let where = '1=1'
    if (q.userId) { params.push(String(q.userId)); where += ` AND rt."userId" = $${params.length}` }
    if (q.email) { params.push(String(q.email)); where += ` AND u.email = $${params.length}` }
    const sql = `SELECT rt.id::text, rt."userId", u.email, rt."deviceId", rt."deviceName", rt."userAgent", rt.ip, rt."createdAt", rt."lastUsedAt", rt."expiresAt", rt."revokedAt"
                 FROM "RefreshToken" rt
                 LEFT JOIN "User" u ON u.id = rt."userId"
                 WHERE ${where}
                 ORDER BY rt."createdAt" DESC
                 LIMIT $1`
    const rows = await prisma.$queryRawUnsafe<any[]>(sql, ...params)
    if ((q.format || 'json') === 'csv') {
      const header = 'id,userId,email,deviceId,deviceName,userAgent,ip,createdAt,lastUsedAt,expiresAt,revokedAt\n'
      const body = rows.map(r => [r.id, r.userId, r.email || '', r.deviceId || '', r.deviceName || '', (r.userAgent || '').replace(/"/g,'""'), r.ip || '',
        new Date(r.createdAt).toISOString(), r.lastUsedAt ? new Date(r.lastUsedAt).toISOString() : '', r.expiresAt ? new Date(r.expiresAt).toISOString() : '', r.revokedAt ? new Date(r.revokedAt).toISOString() : ''
      ].map((v: any) => {
        const s = String(v)
        return /[,"]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s
      }).join(',')).join('\n')
      reply.header('Content-Type', 'text/csv; charset=utf-8')
      return reply.send(header + body + '\n')
    }
    return reply.send({ items: rows })
  })

  // Revoke sessions for a user (by deviceId or tokenId, or all)
  app.post('/admin/auth/sessions/revoke', {
    schema: {
      operationId: 'adminAuthSessionsRevoke', tags: ['admin'],
      summary: 'Revoke sessions for user',
      body: { type: 'object', properties: { userId: { type: 'string' }, deviceId: { type: 'string', nullable: true }, tokenId: { type: 'string', nullable: true }, all: { type: 'boolean', nullable: true } }, required: ['userId'] },
      response: { 200: { type: 'object', properties: { count: { type: 'integer' } } } }
    },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (req: any, reply) => {
    const b = (req.body || {}) as { userId: string; deviceId?: string; tokenId?: string; all?: boolean }
    if (!b.all && !b.deviceId && !b.tokenId) {
      return (reply as any).code(400).send({ error: 'Provide deviceId, tokenId, or all=true' })
    }
    const where: any = { userId: b.userId, revokedAt: null }
    if (b.deviceId) where.deviceId = b.deviceId
    if (b.tokenId) where.id = Number(b.tokenId)
    const res = await (prisma as any).refreshToken.updateMany({ where, data: { revokedAt: new Date() } })
    if (res.count > 0) { try { const { incCounter } = await import('../../services/metrics.service'); for (let i=0;i<res.count;i++) incCounter('session_revokes_total' as any) } catch {} }
    return reply.send({ count: res.count })
  })

  // Sweep stale sessions (older than REFRESH_INACTIVITY_MAX_DAYS)
  app.post('/admin/auth/sessions/sweep', {
    schema: { operationId: 'adminAuthSessionsSweep', tags: ['admin'], summary: 'Revoke stale sessions by inactivity', response: { 200: { type: 'object', properties: { count: { type: 'integer' } } } } },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (_req: any, reply) => {
    const days = Number(process.env.REFRESH_INACTIVITY_MAX_DAYS || 90)
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    const res = await (prisma as any).refreshToken.updateMany({ where: { revokedAt: null, OR: [ { lastUsedAt: { lt: cutoff } }, { AND: [ { lastUsedAt: null }, { createdAt: { lt: cutoff } } ] } ] }, data: { revokedAt: new Date() } })
    if (res.count > 0) { try { const { incCounter } = await import('../../services/metrics.service'); for (let i=0;i<res.count;i++) incCounter('session_revokes_total' as any) } catch {} }
    return reply.send({ count: res.count })
  })
}
