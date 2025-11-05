// src/modules/admin/admin.trips.detailed.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import crypto from 'crypto'

export default async function adminTripsDetailedRoutes(app: FastifyInstance) {
  const query = {
    type: 'object',
    properties: {
      from: { type: 'string', format: 'date-time' },
      to: { type: 'string', format: 'date-time' },
      city: { type: 'string' },
      status: { type: 'string' },
      riderEmail: { type: 'string' },
      driverEmail: { type: 'string' },
      limit: { type: 'integer', minimum: 1, maximum: 2000, default: 500 },
      cursor: { type: 'string' },
      format: { type: 'string', enum: ['json','csv'], default: 'json' }
    },
    additionalProperties: false,
  } as const

  app.get('/admin/trips/detailed', {
    schema: { operationId: 'adminTripsDetailed', tags: ['admin'], summary: 'Export trips (detailed)', description: 'Detalle de trips con rider/driver email y filtros. CSV soportado (usar ?format=csv).', querystring: query, response: { 200: { type: 'object', properties: { items: { type: 'array', items: { type: 'object' } }, nextCursor: { type: ['string','null'] } }, example: { items: [ { id: 'trp_123', status: 'COMPLETED', requestedAt: '2025-01-01T12:00:00.000Z', completedAt: '2025-01-01T12:20:00.000Z', city: 'LIM', costUsd: 8.5, currency: 'USD', pickupLat: -12.05, pickupLng: -77.04, dropoffLat: -12.06, dropoffLng: -77.05, distanceKm: 5.2, durationMin: 18, riderEmail: 'rider@taxi.local', driverEmail: 'driver@taxi.local', paymentStatus: 'PAID', paymentMethod: 'CASH' } ], nextCursor: null } } } },
    preHandler: app.auth.requireRole('ADMIN'),
    config: {
      rateLimit: {
        max: Number(process.env.RL_ADMIN_EXPORT_MAX || 30),
        timeWindow: process.env.RL_ADMIN_EXPORT_WIN || '1 minute',
        keyGenerator: (req: any) => `admexp:${req.user?.id || req.ip}`,
      }
    }
  }, async (req: any, reply) => {
    const { from, to, city, status, riderEmail, driverEmail, limit = 500, cursor, format = 'json' } = req.query as any
    let riderId: string | undefined
    let driverId: string | undefined
    if (riderEmail) { const u = await prisma.user.findUnique({ where: { email: String(riderEmail) }, select: { id: true } }); riderId = u?.id }
    if (driverEmail) { const u = await prisma.user.findUnique({ where: { email: String(driverEmail) }, select: { id: true } }); driverId = u?.id }
    if ((riderEmail && !riderId) || (driverEmail && !driverId)) {
      return reply.send(format === 'csv' ? '' : { items: [], nextCursor: null })
    }
    const where: any = {}
    if (from || to) where.requestedAt = { ...(from ? { gte: new Date(from) } : {}), ...(to ? { lte: new Date(to) } : {}) }
    if (city) where.city = String(city)
    if (status) where.status = status as any
    if (riderId) where.riderId = riderId
    if (driverId) where.driverId = driverId
    const items = await (prisma as any).trip.findMany({
      where,
      take: limit,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: [{ requestedAt: 'desc' }, { id: 'desc' }],
      select: { id: true, status: true, requestedAt: true, completedAt: true, city: true, costUsd: true, currency: true, riderId: true, driverId: true, pickupLat: true, pickupLng: true, dropoffLat: true, dropoffLng: true, distanceKm: true, durationMin: true }
    })
    const userIds = Array.from(new Set(items.flatMap((t: any) => [t.riderId, t.driverId]).filter(Boolean)))
    const users = await prisma.user.findMany({ where: { id: { in: userIds as any } }, select: { id: true, email: true } })
    const emailById = new Map(users.map(u => [u.id, u.email]))
    // Fetch latest payment per trip
    const tripIds = items.map((t: any) => t.id)
    const pays = await prisma.payment.findMany({ where: { tripId: { in: tripIds as any } }, orderBy: { createdAt: 'desc' }, select: { tripId: true, status: true, method: true, provider: true, createdAt: true } })
    const payByTrip = new Map<string, any>()
    for (const p of pays) { if (!payByTrip.has(p.tripId)) payByTrip.set(p.tripId, p) }

    const mapped = items.map((t: any) => {
      const riderEmailOut = t.riderId ? (emailById.get(t.riderId) || null) : null
      const driverEmailOut = t.driverId ? (emailById.get(t.driverId) || null) : null
      const pay = payByTrip.get(t.id)
      const paymentStatus = pay?.status || null
      const paymentMethod = pay?.method || null
      return {
        id: t.id,
        status: t.status,
        requestedAt: t.requestedAt,
        completedAt: t.completedAt,
        city: t.city,
        costUsd: t.costUsd,
        currency: t.currency,
        pickupLat: t.pickupLat,
        pickupLng: t.pickupLng,
        dropoffLat: t.dropoffLat,
        dropoffLng: t.dropoffLng,
        distanceKm: t.distanceKm,
        durationMin: t.durationMin,
        riderEmail: riderEmailOut,
        driverEmail: driverEmailOut,
        paymentStatus,
        paymentMethod,
      }
    })
    const nextCursor = items.length === Number(limit) ? items[items.length - 1].id : null
    if (format === 'csv') {
      const header = 'id,status,requestedAt,completedAt,city,costUsd,currency,pickupLat,pickupLng,dropoffLat,dropoffLng,distanceKm,durationMin,riderEmail,driverEmail,paymentStatus,paymentMethod\n'
      const body = mapped.map(r => [r.id, r.status, r.requestedAt ? new Date(r.requestedAt).toISOString() : '', r.completedAt ? new Date(r.completedAt).toISOString() : '', r.city || '', r.costUsd ?? '', r.currency ?? '', r.pickupLat ?? '', r.pickupLng ?? '', r.dropoffLat ?? '', r.dropoffLng ?? '', r.distanceKm ?? '', r.durationMin ?? '', r.riderEmail ?? '', r.driverEmail ?? '', r.paymentStatus ?? '', r.paymentMethod ?? '']
        .map((v: any) => { const s = String(v); return /[,"]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s }).join(',')).join('\n')
      const csv = header + body + '\n'
      const etag = 'W/"' + crypto.createHash('md5').update(csv).digest('hex') + '"'
      if ((req.headers['if-none-match'] as string) === etag) {
        return (reply as any).code(304).send()
      }
      reply.header('ETag', etag)
      reply.header('Cache-Control', 'private, max-age=60')
      reply.header('Content-Type','text/csv; charset=utf-8')
      return reply.send(csv)
    }
    const payload = { items: mapped, nextCursor }
    const etag = 'W/"' + crypto.createHash('md5').update(JSON.stringify(payload)).digest('hex') + '"'
    if ((req.headers['if-none-match'] as string) === etag) {
      return (reply as any).code(304).send()
    }
    reply.header('ETag', etag)
    reply.header('Cache-Control', 'private, max-age=60')
    return reply.send(payload)
  })
}
