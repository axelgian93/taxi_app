// src/modules/admin/admin.audit.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'

export default async function adminAuditRoutes(app: FastifyInstance) {
  // Tariff audits
  app.get('/admin/audit/tariffs', {
    schema: { operationId: 'adminAuditTariffs', tags: ['admin'], summary: 'Tariff audits', description: 'Lista auditorías de TariffRule con CSV.', querystring: { type: 'object', properties: { tariffRuleId: { type: 'string' }, from: { type: 'string', format: 'date-time' }, to: { type: 'string', format: 'date-time' }, format: { type: 'string', enum: ['json','csv'], default: 'json' }, limit: { type: 'integer', minimum: 1, maximum: 1000, default: 200 } }, additionalProperties: false } },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (req: any, reply) => {
    const { tariffRuleId, from, to, format = 'json', limit = 200 } = req.query as any
    const params: any[] = []
    let where = '1=1'
    if (tariffRuleId) { params.push(String(tariffRuleId)); where += ` AND "tariffRuleId" = $${params.length}` }
    if (from) { params.push(new Date(from).toISOString()); where += ` AND "createdAt" >= $${params.length}` }
    if (to) { params.push(new Date(to).toISOString()); where += ` AND "createdAt" <= $${params.length}` }
    params.push(Number(limit))
    const sql = `SELECT id::text, "adminUserId", action, "tariffRuleId", before, after, "createdAt" FROM "TariffAudit" WHERE ${where} ORDER BY "createdAt" DESC LIMIT $${params.length}`
    const rows = await prisma.$queryRawUnsafe<any[]>(sql, ...params)
    if (format === 'csv') {
      const header = 'id,adminUserId,action,tariffRuleId,createdAt\n'
      const body = rows.map(r => [r.id, r.adminUserId || '', r.action, r.tariffRuleId || '', new Date(r.createdAt).toISOString()]
        .map((v: any) => { const s = String(v); return /[,"]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s }).join(',')).join('\n')
      reply.header('Content-Type','text/csv; charset=utf-8')
      return reply.send(header + body + '\n')
    }
    return reply.send({ items: rows })
  })

  // User role audits
  app.get('/admin/audit/roles', {
    schema: { operationId: 'adminAuditRoles', tags: ['admin'], summary: 'User role audits', description: 'Lista auditorías de cambios de rol con CSV.', querystring: { type: 'object', properties: { userId: { type: 'string' }, adminUserId: { type: 'string' }, from: { type: 'string', format: 'date-time' }, to: { type: 'string', format: 'date-time' }, format: { type: 'string', enum: ['json','csv'], default: 'json' }, limit: { type: 'integer', minimum: 1, maximum: 1000, default: 200 } }, additionalProperties: false } },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (req: any, reply) => {
    const { userId, adminUserId, from, to, format = 'json', limit = 200, email } = req.query as any
    const params: any[] = []
    let where = '1=1'
    if (email) {
      const u = await prisma.user.findUnique({ where: { email: String(email) }, select: { id: true } })
      if (u?.id) {
        params.push(u.id); where += ` AND "targetUserId" = $${params.length}`
      } else {
        return reply.send({ items: [] })
      }
    }
    if (userId) { params.push(String(userId)); where += ` AND "targetUserId" = $${params.length}` }
    if (adminUserId) { params.push(String(adminUserId)); where += ` AND "adminUserId" = $${params.length}` }
    if (from) { params.push(new Date(from).toISOString()); where += ` AND "createdAt" >= $${params.length}` }
    if (to) { params.push(new Date(to).toISOString()); where += ` AND "createdAt" <= $${params.length}` }
    params.push(Number(limit))
    const sql = `SELECT id::text, "adminUserId", "targetUserId", "beforeRole", "afterRole", "createdAt" FROM "UserRoleAudit" WHERE ${where} ORDER BY "createdAt" DESC LIMIT $${params.length}`
    const rows = await prisma.$queryRawUnsafe<any[]>(sql, ...params)
    if (format === 'csv') {
      const header = 'id,adminUserId,targetUserId,beforeRole,afterRole,createdAt\n'
      const body = rows.map(r => [r.id, r.adminUserId || '', r.targetUserId, r.beforeRole || '', r.afterRole || '', new Date(r.createdAt).toISOString()]
        .map((v: any) => { const s = String(v); return /[,"]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s }).join(',')).join('\n')
      reply.header('Content-Type','text/csv; charset=utf-8')
      return reply.send(header + body + '\n')
    }
    return reply.send({ items: rows })
  })
}
