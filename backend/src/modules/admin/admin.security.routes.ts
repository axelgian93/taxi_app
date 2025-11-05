// src/modules/admin/admin.security.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'

type Row = { id: string; email: string; success: boolean; ip: string | null; userAgent: string | null; reason: string | null; createdAt: Date }

export default async function adminSecurityRoutes(app: FastifyInstance) {
  app.get('/admin/login-attempts', {
    schema: {
      operationId: 'adminLoginAttempts',
      tags: ['admin'],
      summary: 'Login attempts audit',
      description: 'Lista de intentos de login con filtros y salida CSV opcional.',
      querystring: {
        type: 'object',
        properties: {
          email: { type: 'string', nullable: true },
          success: { type: 'boolean', nullable: true },
          since: { type: 'string', format: 'date-time', nullable: true },
          limit: { type: 'integer', minimum: 1, maximum: 1000, default: 200 },
          format: { type: 'string', enum: ['json','csv'], default: 'json' }
        }
      },
      response: { 200: { type: 'object', properties: { items: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, email: { type: 'string' }, success: { type: 'boolean' }, ip: { type: 'string', nullable: true }, userAgent: { type: 'string', nullable: true }, reason: { type: 'string', nullable: true }, createdAt: { type: 'string', format: 'date-time' } } } } } } }
    },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (req: any, reply) => {
    const q = (req.query || {}) as any
    const limit = Math.min(Math.max(Number(q.limit || 200), 1), 1000)
    const params: any[] = []
    let where = '1=1'
    if (q.email) { params.push(String(q.email)); where += ` AND email = $${params.length}` }
    if (q.success === true || q.success === 'true') { where += ' AND success = true' }
    if (q.success === false || q.success === 'false') { where += ' AND success = false' }
    if (q.since) { const d = new Date(String(q.since)); if (!isNaN(d.getTime())) { params.push(d.toISOString()); where += ` AND "createdAt" >= $${params.length}` } }
    params.push(limit)
    const sql = `SELECT id::text, email, success, ip, "userAgent", reason, "createdAt" FROM "LoginAttempt" WHERE ${where} ORDER BY "createdAt" DESC LIMIT $${params.length}`
    const rows = await prisma.$queryRawUnsafe<Row[]>(sql, ...params)
    if ((q.format || 'json') === 'csv') {
      const header = 'id,email,success,ip,userAgent,reason,createdAt\n'
      const body = rows.map(r => [r.id, r.email, r.success ? 'true':'false', r.ip||'', (r.userAgent||'').replace(/"/g,'""'), r.reason||'', r.createdAt.toISOString()].map(v => {
        const s = String(v)
        return /[,"]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s
      }).join(',')).join('\n')
      reply.header('Content-Type', 'text/csv; charset=utf-8')
      return reply.send(header + body + '\n')
    }
    return reply.send({ items: rows })
  })

  // Check lock status for an email
  app.get('/admin/login-locks', {
    schema: {
      operationId: 'adminLoginLockStatus', tags: ['admin'],
      summary: 'Login lock status',
      querystring: { type: 'object', properties: { email: { type: 'string' } }, required: ['email'] },
      response: { 200: { type: 'object', properties: { email: { type: 'string' }, secondsLeft: { type: 'integer' }, lockedUntil: { type: 'string', nullable: true }, lockCount: { type: 'integer' } } } }
    },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (req: any, reply) => {
    const email = String((req.query || {}).email || '')
    const { checkLockedSeconds, getLockInfo } = await import('../auth/login-lock.service')
    const secondsLeft = checkLockedSeconds(email)
    const info = getLockInfo(email)
    return reply.send({ email, secondsLeft, lockedUntil: info?.lockedUntil ? new Date(info.lockedUntil).toISOString() : null, lockCount: info?.lockCount || 0 })
  })

  // Manual unlock
  app.post('/admin/login-locks/unlock', {
    schema: {
      operationId: 'adminLoginUnlock', tags: ['admin'],
      summary: 'Unlock login for email',
      body: { type: 'object', required: ['email'], properties: { email: { type: 'string' } } },
      response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } } }
    },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (req: any, reply) => {
    const email = String((req.body || {}).email || '')
    const { clearFailuresAndUnlock } = await import('../auth/login-lock.service')
    clearFailuresAndUnlock(email)
    return reply.send({ ok: true })
  })
}
