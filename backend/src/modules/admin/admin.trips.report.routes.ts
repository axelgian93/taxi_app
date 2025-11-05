// src/modules/admin/admin.trips.report.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import crypto from 'crypto'
import { incCounter } from '../../services/metrics.service'

export default async function adminTripsReportRoutes(app: FastifyInstance) {
  const querySchema = {
    type: 'object',
    properties: {
      from: { type: 'string', format: 'date-time' },
      to: { type: 'string', format: 'date-time' },
      city: { type: 'string' },
      status: { type: 'string' },
      groupBy: { type: 'string', enum: ['city','status','city_status'], default: 'city_status' },
      format: { type: 'string', enum: ['json','csv'], default: 'json' },
      limit: { type: 'integer', minimum: 1, maximum: 1000, default: 1000 }
    },
    additionalProperties: false,
  } as const

  app.get('/admin/trips/report', {
    schema: { operationId: 'adminTripsReport', tags: ['admin'], summary: 'Reporte de trips por ciudad/estado', description: 'Agregados de trips por ciudad y/o estado con CSV opcional.', querystring: querySchema },
    preHandler: app.auth.requireRole('ADMIN'),
    config: { rateLimit: { max: Number(process.env.RL_ADMIN_EXPORT_MAX || 30), timeWindow: process.env.RL_ADMIN_EXPORT_WIN || '1 minute', keyGenerator: (req: any) => `admexp:${req.user?.id || req.ip}` } }
  }, async (req: any, reply) => {
    incCounter('admin_trips_report_queries_total' as any)
    const { from, to, city, status, groupBy = 'city_status', format = 'json', limit = 1000 } = req.query as any
    const params: any[] = []
    const where: string[] = []
    if (from) { params.push(new Date(from).toISOString()); where.push(`t."requestedAt" >= $${params.length}`) }
    if (to) { params.push(new Date(to).toISOString()); where.push(`t."requestedAt" <= $${params.length}`) }
    if (city) { params.push(String(city)); where.push(`t.city = $${params.length}`) }
    if (status) { params.push(String(status)); where.push(`t.status = $${params.length}`) }
    const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : ''
    let selectSql = ''
    let groupSql = ''
    if (groupBy === 'city') { selectSql = 't.city AS city'; groupSql = 'GROUP BY t.city' }
    else if (groupBy === 'status') { selectSql = 't.status AS status'; groupSql = 'GROUP BY t.status' }
    else { selectSql = 't.city AS city, t.status AS status'; groupSql = 'GROUP BY t.city, t.status' }
    const sql = `SELECT ${selectSql}, COUNT(*)::int AS count, COALESCE(SUM(t."costUsd"),0)::float AS amountUsd
                 FROM "Trip" t
                 ${whereSql}
                 ${groupSql}
                 ORDER BY count DESC
                 LIMIT ${Number(limit)}`
    const rows = await prisma.$queryRawUnsafe<any[]>(sql, ...params)
    if (format === 'csv') {
      incCounter('admin_trips_report_csv_exports_total' as any)
      const keys = groupBy === 'city' ? ['city'] : groupBy === 'status' ? ['status'] : ['city','status']
      const header = [...keys, 'count','amountUsd'].join(',') + '\n'
      const body = rows.map(r => keys.map(k => String(r[k] ?? '')).concat([String(r.count ?? 0), String(Number(r.amountUsd ?? 0).toFixed(2))])
        .map(v => /[,"]/.test(v) ? `"${v.replace(/"/g,'""')}"` : v).join(',')).join('\n')
      const csv = header + body + '\n'
      const etag = 'W/"' + crypto.createHash('md5').update(csv).digest('hex') + '"'
      if ((req.headers['if-none-match'] as string) === etag) { return reply.code(304).send() }
      reply.header('ETag', etag)
      reply.header('Cache-Control', 'private, max-age=60')
      reply.header('Content-Type','text/csv; charset=utf-8')
      return reply.send(csv)
    }
    const payload = { items: rows }
    const etag = 'W/"' + crypto.createHash('md5').update(JSON.stringify(payload)).digest('hex') + '"'
    if ((req.headers['if-none-match'] as string) === etag) { return reply.code(304).send() }
    reply.header('ETag', etag)
    reply.header('Cache-Control', 'private, max-age=60')
    return reply.send(payload)
  })
}
