// src/modules/rider/rider.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import { env } from '../../config/env'

export default async function riderRoutes(app: FastifyInstance) {
  function encodeCursor(id: string, requestedAt: Date): string {
    return Buffer.from(JSON.stringify({ id, requestedAt: requestedAt.toISOString() }), 'utf8').toString('base64')
  }
  function decodeCursor(raw?: string | null): { id: string; requestedAt: Date } | null {
    if (!raw) return null
    try {
      const obj = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'))
      const id = String(obj.id || '')
      const atStr = String(obj.requestedAt || '')
      const at = new Date(atStr)
      if (!id || isNaN(at.getTime())) return null
      return { id, requestedAt: at }
    } catch { return null }
  }
  // GET /rider/my-trips — últimos viajes del rider autenticado
  app.get(
    '/rider/my-trips',
    {
      schema: {
        operationId: 'riderMyTrips',
        tags: ['rider'],
        summary: 'Mis viajes (rider)',
        description: 'Lista los últimos viajes del rider autenticado.',
        querystring: { type: 'object', properties: { limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 }, cursor: { type: 'string', nullable: true } } },
        response: {
          200: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    status: { type: 'string', enum: ['REQUESTED','ASSIGNED','ACCEPTED','ARRIVED','STARTED','COMPLETED','CANCELED'] },
                    pickupLat: { type: 'number' },
                    pickupLng: { type: 'number' },
                    dropoffLat: { type: 'number' },
                    dropoffLng: { type: 'number' },
                    requestedAt: { type: 'string', format: 'date-time' },
                    completedAt: { type: 'string', format: 'date-time', nullable: true },
                    costUsd: { type: 'number', nullable: true },
                    currency: { type: 'string', nullable: true },
                    preferredMethod: { type: 'string', enum: ['CASH','CARD'], nullable: true },
                  }
                }
              },
              nextCursor: { type: 'string', nullable: true }
            },
            example: {
              items: [
                { id: 'trp_123', status: 'COMPLETED', pickupLat: -2.17, pickupLng: -79.92, dropoffLat: -2.19, dropoffLng: -79.89, requestedAt: '2025-01-01T12:00:00.000Z', completedAt: '2025-01-01T12:30:00.000Z', costUsd: 5.5, currency: 'USD', preferredMethod: 'CASH' }
              ],
              nextCursor: 'eyJpZCI6InRycF8xMjMiLCJyZXF1ZXN0ZWRBdCI6IjIwMjUtMDEtMDFUMTI6MzA6MDAuMDAwWiJ9'
            }
          },
          401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } },
          403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } },
        }
      },
      preHandler: app.auth.requireRole('RIDER')
    },
    async (req: any, reply) => {
      const userId = req.user?.id as string
      const q = (req.query || {}) as any
      const lim = Math.min(Math.max(Number(q.limit || 20), 1), 100)
      const cur = decodeCursor(q.cursor)
      const where: any = { riderId: userId }
      if (cur) {
        where.OR = [
          { requestedAt: { lt: cur.requestedAt } },
          { AND: [ { requestedAt: cur.requestedAt }, { id: { lt: cur.id } } ] }
        ]
      }
      const rows = await prisma.trip.findMany({
        where,
        orderBy: [{ requestedAt: 'desc' }, { id: 'desc' }],
        take: lim,
        select: { id: true, status: true, pickupLat: true, pickupLng: true, dropoffLat: true, dropoffLng: true, requestedAt: true, completedAt: true, costUsd: true, currency: true, pricingSnapshot: true }
      })
      const items = rows.map((r: any) => ({
        id: r.id,
        status: r.status,
        pickupLat: Number(r.pickupLat),
        pickupLng: Number(r.pickupLng),
        dropoffLat: Number(r.dropoffLat),
        dropoffLng: Number(r.dropoffLng),
        requestedAt: r.requestedAt,
        completedAt: r.completedAt ?? null,
        costUsd: r.costUsd ?? null,
        currency: r.currency ?? null,
        preferredMethod: (r.pricingSnapshot as any)?.preferredMethod ?? null,
      }))
      const last = rows[rows.length - 1]
      const nextCursor = last ? encodeCursor(last.id, last.requestedAt as any) : null
      return reply.send({ items, nextCursor })
    }
  )

  // GET /rider/trips/:id/cancel/quote — Estimar tarifa de cancelación
  app.get(
    '/rider/trips/:id/cancel/quote',
    {
      schema: {
        operationId: 'riderCancelQuote',
        tags: ['rider'],
        summary: 'Cotizar cancelación (rider)',
        description: 'Devuelve el monto estimado de la tarifa de cancelación según estado y ventana de gracia.',
        response: {
          200: {
            type: 'object',
            properties: {
              cancellable: { type: 'boolean' },
              feeUsd: { type: 'number' },
              currency: { type: 'string' },
              reason: { type: 'string' },
              graceRemainingSec: { type: 'integer', nullable: true }
            },
            example: { cancellable: true, feeUsd: 2.0, currency: 'USD', reason: 'AFTER_GRACE_ACCEPTED', graceRemainingSec: 0 }
          },
          401: { type: 'object', properties: { error: { type: 'string' } } },
          403: { type: 'object', properties: { error: { type: 'string' } } },
          404: { type: 'object', properties: { error: { type: 'string' } } }
        }
      },
      preHandler: app.auth.requireRole('RIDER')
    },
    async (req: any, reply) => {
      const userId = req.user?.id as string
      const id = (req.params as any).id as string
      if (!id) return reply.code(400).send({ error: 'Invalid id' })
      const t = await prisma.trip.findUnique({ where: { id }, select: { id: true, riderId: true, status: true, requestedAt: true, acceptedAt: true, arrivedAt: true } as any })
      if (!t) return reply.code(404).send({ error: 'Trip not found' })
      if (t.riderId !== userId) return reply.code(403).send({ error: 'Forbidden' })
      const now = Date.now()
      const graceMs = Number(env.cancellationFeeGraceSec || 0) * 1000
      const remaining = (from?: Date | null) => {
        if (!from || !graceMs) return 0
        const diff = now - new Date(from as any).getTime()
        return Math.max(0, Math.floor((graceMs - diff) / 1000))
      }
      let fee = 0
      let reason = 'NO_FEE'
      let graceRemainingSec: number | null = null
      let cancellable = true
      const st = String(t.status)
      if (st === 'REQUESTED' || st === 'ASSIGNED') {
        fee = 0; reason = 'BEFORE_ACCEPT'; graceRemainingSec = null
      } else if (st === 'ACCEPTED') {
        const rem = remaining((t as any).acceptedAt || (t as any).requestedAt)
        graceRemainingSec = rem
        if (rem > 0) { fee = 0; reason = 'WITHIN_GRACE_ACCEPTED' }
        else { fee = Number(env.cancellationFeeAcceptedUsd || 0); reason = 'AFTER_GRACE_ACCEPTED' }
      } else if (st === 'ARRIVED') {
        const rem = remaining((t as any).arrivedAt || (t as any).acceptedAt)
        graceRemainingSec = rem
        if (rem > 0) { fee = 0; reason = 'WITHIN_GRACE_ARRIVED' }
        else { fee = Number(env.cancellationFeeArrivedUsd || 0); reason = 'AFTER_GRACE_ARRIVED' }
      } else {
        // STARTED/COMPLETED/CANCELED
        cancellable = false; fee = 0; reason = 'NOT_CANCELLABLE'; graceRemainingSec = null
      }
      return reply.send({ cancellable, feeUsd: Number(fee || 0), currency: 'USD', reason, graceRemainingSec })
    }
  )
}
