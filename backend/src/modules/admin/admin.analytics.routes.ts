// src/modules/admin/admin.analytics.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'

export default async function adminAnalyticsRoutes(app: FastifyInstance) {
  const qs = {
    type: 'object',
    properties: {
      from: { type: 'string', format: 'date-time' },
      to: { type: 'string', format: 'date-time' },
      city: { type: 'string' },
      groupBy: { type: 'string', enum: ['city','day'], nullable: true },
      limit: { type: 'integer', minimum: 1, maximum: 2000, default: 200 }
    },
    additionalProperties: false,
  } as const

  // GET /admin/analytics/trips - summary counts for trips (total, completed, canceled) and rates
  app.get('/admin/analytics/trips', {
    schema: { operationId: 'adminAnalyticsTrips', tags: ['admin'], summary: 'Resumen de viajes', description: 'Totales de trips y tasas (completados/cancelados) por rango de fechas y ciudad. Si se especifica groupBy, devuelve items por grupo.', querystring: qs },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (req: any, reply) => {
    const { from, to, city, groupBy, limit = 200 } = (req.query || {}) as any
    const params: any[] = []
    const where: string[] = []
    if (from) { params.push(new Date(from).toISOString()); where.push(`t."requestedAt" >= $${params.length}`) }
    if (to) { params.push(new Date(to).toISOString()); where.push(`t."requestedAt" <= $${params.length}`) }
    if (city) { params.push(String(city)); where.push(`(t.city = $${params.length})`) }
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : ''
    if (groupBy === 'city' || groupBy === 'day') {
      let selectKey = ''
      if (groupBy === 'city') selectKey = 'COALESCE(t.city, \"unknown\") AS key'
      else selectKey = `to_char(t."requestedAt", 'YYYY-MM-DD') AS key`
      const sql = `SELECT ${selectKey},
                          COUNT(*)::int AS total,
                          COALESCE(SUM(CASE WHEN t.status = 'COMPLETED' THEN 1 ELSE 0 END),0)::int AS completed,
                          COALESCE(SUM(CASE WHEN t.status = 'CANCELED' THEN 1 ELSE 0 END),0)::int AS canceled
                   FROM "Trip" t
                   ${whereSql}
                   GROUP BY 1
                   ORDER BY total DESC
                   LIMIT ${Number(limit)}`
      const rows = await prisma.$queryRawUnsafe<any[]>(sql, ...params)
      const items = (rows || []).map(r => {
        const total = Number(r.total || 0)
        const completed = Number(r.completed || 0)
        const canceled = Number(r.canceled || 0)
        const completionRate = total > 0 ? completed / total : 0
        const cancelRate = total > 0 ? canceled / total : 0
        return { key: String(r.key || ''), total, completed, canceled, completionRate, cancelRate }
      })
      return reply.send({ items })
    } else {
      const sql = `SELECT COUNT(*)::int AS total,
                          COALESCE(SUM(CASE WHEN t.status = 'COMPLETED' THEN 1 ELSE 0 END),0)::int AS completed,
                          COALESCE(SUM(CASE WHEN t.status = 'CANCELED' THEN 1 ELSE 0 END),0)::int AS canceled
                   FROM "Trip" t
                   ${whereSql}`
      const rows = await prisma.$queryRawUnsafe<any[]>(sql, ...params)
      const r = rows && rows[0] ? rows[0] : { total: 0, completed: 0, canceled: 0 }
      const total = Number(r.total || 0)
      const completed = Number(r.completed || 0)
      const canceled = Number(r.canceled || 0)
      const completionRate = total > 0 ? completed / total : 0
      const cancelRate = total > 0 ? canceled / total : 0
      return reply.send({ total, completed, canceled, completionRate, cancelRate })
    }
  })
}
