// src/modules/payments/payment.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'

export default async function paymentRoutes(app: FastifyInstance) {
  const idParamSchema = {
    type: 'object',
    required: ['tripId'],
    properties: { tripId: { type: 'string', example: 'trp_123' } },
    additionalProperties: false,
  } as const

  const errorSchema = { type: 'object', properties: { error: { type: 'string' } } } as const
  const paymentSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      tripId: { type: 'string' },
      amountUsd: { type: 'number' },
      status: { type: 'string', enum: ['PENDING','AUTHORIZED','PAID','FAILED','REFUNDED'] },
      method: { type: 'string' },
      provider: { type: 'string', nullable: true },
      externalId: { type: 'string', nullable: true },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
      // Derived flags for client simplicity
      isAuthorized: { type: 'boolean' },
      isPaid: { type: 'boolean' },
      isFailed: { type: 'boolean' },
      providerDisplay: { type: 'string' },
      capturable: { type: 'boolean' },
    },
    example: {
      id: 'pay_123', tripId: 'trp_123', amountUsd: 7.8, status: 'PAID', method: 'CASH', provider: null, externalId: null,
      isAuthorized: false, isPaid: true, isFailed: false, providerDisplay: 'Cash', capturable: false,
      createdAt: '2025-01-01T12:20:00.000Z', updatedAt: '2025-01-01T12:20:00.000Z'
    }
  } as const

  // Admin list payments with filters
  const listQuery = {
    type: 'object',
    properties: {
      userId: { type: 'string' },
      status: { type: 'string', enum: ['PENDING','AUTHORIZED','PAID','FAILED','REFUNDED'] },
      city: { type: 'string' },
      from: { type: 'string', format: 'date-time' },
      to: { type: 'string', format: 'date-time' },
      limit: { type: 'integer', minimum: 1, maximum: 200, default: 50 },
      cursor: { type: 'string' },
      format: { type: 'string', enum: ['json','csv'], default: 'json' },
    },
    additionalProperties: false,
  } as const

  app.get(
    '/payments',
    { schema: { operationId: 'paymentsList', tags: ['payments'], summary: 'Listar pagos (ADMIN)', description: 'Lista pagos con filtros opcionales y paginacion. Si format=csv, devuelve text/csv.', querystring: listQuery, response: { 200: { content: { 'application/json': { schema: { type: 'object', properties: { items: { type: 'array', items: paymentSchema }, nextCursor: { type: 'string', nullable: true } }, example: { items: [paymentSchema.example], nextCursor: null } } }, 'text/csv': { schema: { type: 'string', example: 'id,tripId,amountUsd,status,method,provider,externalId,createdAt,updatedAt,isAuthorized,isPaid,isFailed,providerDisplay,capturable\n"pay_123","trp_123",7.8,"PAID","CASH","","","2025-01-01T12:20:00.000Z","2025-01-01T12:20:00.000Z",false,true,false,"Cash",false\n' } } } } } }, preHandler: app.auth.requireRole('ADMIN') },
    async (req: any, reply) => {
      const { userId, status, city, from, to, limit = 50, cursor, format = 'json' } = req.query as { userId?: string; status?: any; city?: string; from?: string; to?: string; limit?: number; cursor?: string; format?: 'json'|'csv' }
      const where: any = {}
      if (status) where.status = status
      if (from || to) where.createdAt = { ...(from ? { gte: new Date(from) } : {}), ...(to ? { lte: new Date(to) } : {}) }
      if (userId) {
        // Join via Trip to filter by rider/driver involvement
        where.trip = { OR: [ { riderId: userId }, { driverId: userId } ] }
      }
      if (city) {
        // Filter by Trip.pricingSnapshot.city when available
        where.trip = {
          ...(where.trip || {}),
          pricingSnapshot: { path: ['city'], equals: city } as any,
        }
      }
      const items = await prisma.payment.findMany({
        where,
        take: limit,
        ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
        orderBy: { createdAt: 'desc' },
      })
      const mapped = items.map((payment) => {
        const isAuthorized = payment.status === 'AUTHORIZED'
        const isPaid = payment.status === 'PAID'
        const isFailed = payment.status === 'FAILED'
        const providerDisplay = payment.provider === 'Stripe' ? 'Stripe' : payment.method === 'CASH' ? 'Cash' : payment.method === 'TRANSFER' ? 'Bank' : (payment.provider || 'Unknown')
        const capturable = payment.provider === 'Stripe' && payment.status === 'AUTHORIZED' && Boolean(payment.externalId)
        return { ...payment, isAuthorized, isPaid, isFailed, providerDisplay, capturable }
      })
      if (format === 'csv') {
        const header = ['id','tripId','amountUsd','status','method','provider','externalId','createdAt','updatedAt','isAuthorized','isPaid','isFailed','providerDisplay','capturable']
        const rows = mapped.map(p => [
          p.id,
          p.tripId,
          String(p.amountUsd ?? ''),
          p.status,
          p.method,
          p.provider ?? '',
          p.externalId ?? '',
          (p.createdAt as any)?.toISOString?.() || String(p.createdAt),
          (p.updatedAt as any)?.toISOString?.() || String(p.updatedAt),
          String(p.isAuthorized),
          String(p.isPaid),
          String(p.isFailed),
          p.providerDisplay,
          String(p.capturable),
        ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))
        const csv = [header.join(','), ...rows].join('\n') + '\n'
        reply.header('Content-Type','text/csv; charset=utf-8')
        return reply.send(csv)
      }
      const nextCursor = items.length === limit ? items[items.length - 1].id : null
      return reply.send({ items: mapped, nextCursor })
    }
  )

  // Admin capture of authorized Stripe payments
  app.post(
    '/payments/:tripId/capture',
    { schema: { operationId: 'paymentsCaptureByTrip', tags: ['payments'], summary: 'Capturar pago autorizado (ADMIN)', description: 'Captura un PaymentIntent autorizado de Stripe para el trip.', params: idParamSchema, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } }, 400: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'No hay autorizacion Stripe capturable' } }, 404: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Payment no encontrado' } } } }, preHandler: app.auth.requireRole('ADMIN') },
    async (req: any, reply) => {
      const { tripId } = req.params as { tripId: string }
      const payment = await prisma.payment.findUnique({ where: { tripId } })
      if (!payment) return reply.code(404).send({ error: 'Payment no encontrado' })
      if (payment.provider !== 'Stripe' || payment.status !== 'AUTHORIZED' || !payment.externalId) {
        return reply.code(400).send({ error: 'No hay autorizacion Stripe capturable' })
      }
      const { getStripe } = require('../../services/stripe.service')
      const stripe = getStripe()
      const { makeKey, withRetry, reqOpts } = require('../../services/stripe.idempotency')
      if (!stripe) return reply.code(400).send({ error: 'Stripe no configurado' })
      const amountCents = Math.max(1, Math.round(Number(payment.amountUsd as any) * 100))
      try {
        const captured = await withRetry(() => stripe.paymentIntents.capture(
          payment.externalId,
          { amount_to_capture: amountCents },
          reqOpts(makeKey(['admin_capture', tripId, amountCents]))
        ))
        await prisma.payment.update({ where: { tripId }, data: { status: captured.status === 'succeeded' ? 'PAID' : 'AUTHORIZED', externalId: captured.id } })
        return reply.send({ ok: true })
      } catch (e) {
        return reply.code(400).send({ error: 'Captura fallÃ³' })
      }
    }
  )

  // Admin refund endpoint
  app.post(
    '/payments/:tripId/refund',
    { schema: { operationId: 'paymentsRefundByTrip', tags: ['payments'], summary: 'Refund/cancel (ADMIN)', description: 'Reembolsa un Payment capturado (Stripe) o cancela autorizacion. Para otros metodos, marca REFUNDED y registra auditoria.', params: idParamSchema, body: { type: 'object', properties: { amountUsd: { type: 'number' }, reason: { type: 'string' } }, additionalProperties: false, example: { amountUsd: 2.5, reason: 'customer_request' } }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } }, 400: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'No hay autorizacion Stripe capturable' } }, 404: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Payment no encontrado' } } } }, preHandler: app.auth.requireRole('ADMIN') },
    async (req: any, reply) => {
      const { tripId } = req.params as { tripId: string }
      const { amountUsd, reason } = (req.body || {}) as { amountUsd?: number; reason?: string }
      const payment = await prisma.payment.findUnique({ where: { tripId } })
      if (!payment) return reply.code(404).send({ error: 'Payment no encontrado' })
      if (payment.status === 'REFUNDED') return reply.code(400).send({ error: 'Ya estÃ¡ REFUNDED' })

      const amount = typeof amountUsd === 'number' && isFinite(amountUsd) && amountUsd > 0 ? Number(amountUsd.toFixed(2)) : Number(payment.amountUsd as any)

      if (payment.provider === 'Stripe' && payment.externalId) {
        const { getStripe } = require('../../services/stripe.service')
      const stripe = getStripe()
      const { makeKey, withRetry, reqOpts } = require('../../services/stripe.idempotency')
        if (!stripe) return reply.code(400).send({ error: 'Stripe no configurado' })
        try {
          if (payment.status === 'PAID') {
            const refund = await withRetry(() => stripe.refunds.create(
              { payment_intent: payment.externalId, amount: Math.max(1, Math.round(amount * 100)) },
              reqOpts(makeKey(['admin_refund', tripId, amount]))
            ))
            await prisma.payment.update({ where: { tripId }, data: { status: 'REFUNDED' } })
            await prisma.paymentRefund.create({ data: { paymentId: payment.id, tripId, amountUsd: amount as any, reason: reason || 'admin_refund', provider: 'Stripe', externalId: refund.id } })
          } else if (payment.status === 'AUTHORIZED') {
            await withRetry(() => stripe.paymentIntents.cancel(
              payment.externalId,
              reqOpts(makeKey(['admin_cancel_auth', tripId]))
            ))
            await prisma.payment.update({ where: { tripId }, data: { status: 'REFUNDED' } })
            await prisma.paymentRefund.create({ data: { paymentId: payment.id, tripId, amountUsd: 0 as any, reason: reason || 'cancel_authorization', provider: 'Stripe', externalId: payment.externalId } })
          } else {
            return reply.code(400).send({ error: 'Estado no reembolsable' })
          }
        } catch (e) {
          return reply.code(400).send({ error: 'Stripe refund/cancel fallÃ³' })
        }
      } else {
        // Non-Stripe: mark as REFUNDED and record audit
        await prisma.payment.update({ where: { tripId }, data: { status: 'REFUNDED' } })
        await prisma.paymentRefund.create({ data: { paymentId: payment.id, tripId, amountUsd: amount as any, reason: reason || 'manual_refund', provider: payment.provider || null, externalId: null } })
      }
      return reply.send({ ok: true })
    }
  )

  app.get(
    '/payments/:tripId',
    { schema: { operationId: 'paymentsGetByTrip', tags: ['payments'], summary: 'Obtener pago por tripId', description: 'Devuelve el registro de Payment asociado a un Trip. Requiere JWT y ser dueÃ±o del viaje o ADMIN.', params: idParamSchema, response: { 200: paymentSchema, 403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } }, 404: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Payment no encontrado' } } } }, preHandler: app.auth.verifyJWT },
    async (req: any, reply) => {
      const user = req.user as { id: string; role: 'ADMIN' | 'DRIVER' | 'RIDER' }
      const tripId = (req.params as any).tripId as string

      const trip = await prisma.trip.findUnique({ where: { id: tripId }, select: { id: true, riderId: true, driverId: true } })
      if (!trip) return reply.code(404).send({ error: 'Trip no encontrado' })
      const isOwner = user.id === trip.riderId || user.id === trip.driverId
      const isAdmin = user.role === 'ADMIN'
      if (!isOwner && !isAdmin) return reply.code(403).send({ error: 'Forbidden' })

      const payment = await prisma.payment.findUnique({ where: { tripId } })
      if (!payment) return reply.code(404).send({ error: 'Payment no encontrado' })
      const isAuthorized = payment.status === 'AUTHORIZED'
      const isPaid = payment.status === 'PAID'
      const isFailed = payment.status === 'FAILED'
      const providerDisplay = payment.provider === 'Stripe' ? 'Stripe' : payment.method === 'CASH' ? 'Cash' : payment.method === 'TRANSFER' ? 'Bank' : (payment.provider || 'Unknown')
      const capturable = payment.provider === 'Stripe' && payment.status === 'AUTHORIZED' && Boolean(payment.externalId)
      return reply.send({
        ...payment,
        isAuthorized,
        isPaid,
        isFailed,
        providerDisplay,
        capturable,
      })
    }
  )

  // Refund audit list by tripId (owner or ADMIN)
  const refundsResponse = {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            paymentId: { type: 'string' },
            tripId: { type: 'string' },
            amountUsd: { type: 'number' },
            reason: { type: 'string', nullable: true },
            provider: { type: 'string', nullable: true },
            externalId: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    example: {
      items: [
        { id: 're_1', paymentId: 'pay_1', tripId: 'trp_1', amountUsd: 1.5, reason: 'admin_refund', provider: 'Stripe', externalId: 're_123', createdAt: '2025-01-01T12:00:00.000Z' }
      ]
    }
  } as const

  // GET /payments/:tripId/receipt (RIDER/DRIVER/ADMIN)
  app.get(
    '/payments/:tripId/receipt',
    { schema: { operationId: 'paymentsReceiptByTrip', tags: ['payments'], summary: 'Obtener recibo', description: 'Recibo simple del pago asociado al viaje. type=TRIP o CANCELLATION_FEE.', params: idParamSchema, response: { 200: { type: 'object', properties: { tripId: { type: 'string' }, amountUsd: { type: 'number' }, currency: { type: 'string' }, method: { type: 'string' }, status: { type: 'string' }, provider: { type: 'string', nullable: true }, type: { type: 'string', enum: ['TRIP','CANCELLATION_FEE'] }, paidAt: { type: 'string', format: 'date-time', nullable: true } }, example: { tripId: 'trp_123', amountUsd: 2.0, currency: 'USD', method: 'CARD', status: 'PAID', provider: 'Stripe', type: 'CANCELLATION_FEE', paidAt: '2025-01-01T12:00:00.000Z' } }, 404: errorSchema } }, preHandler: app.auth.verifyJWT },
    async (req: any, reply) => {
      const tripId = (req.params as any).tripId as string
      const payment = await prisma.payment.findUnique({ where: { tripId } })
      if (!payment) return reply.code(404).send({ error: 'Payment no encontrado' })
      // Infer type from trip status
      const trip = await prisma.trip.findUnique({ where: { id: tripId }, select: { status: true } })
      const type = trip?.status === 'COMPLETED' ? 'TRIP' : 'CANCELLATION_FEE'
      return reply.send({
        tripId,
        amountUsd: Number(payment.amountUsd as any),
        currency: payment.provider === 'Stripe' ? 'USD' : (payment as any).currency || 'USD',
        method: payment.method,
        status: payment.status,
        provider: payment.provider || null,
        type,
        paidAt: payment.status === 'PAID' ? (payment.updatedAt as any) : null,
      })
    }
  )

  app.get(
    '/payments/:tripId/refunds',
    { schema: { operationId: 'paymentsRefundsByTrip', tags: ['payments'], summary: 'Refunds por tripId', description: 'Lista auditorias de reembolso/cancelaciÃ³n del pago de un trip. Requiere JWT y ser dueÃ±o del viaje o ADMIN.', params: idParamSchema, response: { 200: refundsResponse, 403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } }, 404: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Trip no encontrado' } } } }, preHandler: app.auth.verifyJWT },
    async (req: any, reply) => {
      const user = req.user as { id: string; role: 'ADMIN' | 'DRIVER' | 'RIDER' }
      const { tripId } = req.params as { tripId: string }
      const trip = await prisma.trip.findUnique({ where: { id: tripId }, select: { riderId: true, driverId: true } })
      if (!trip) return reply.code(404).send({ error: 'Trip no encontrado' })
      const isOwner = user.id === trip.riderId || user.id === trip.driverId
      const isAdmin = user.role === 'ADMIN'
      if (!isOwner && !isAdmin) return reply.code(403).send({ error: 'Forbidden' })
      const items = await (prisma as any).paymentRefund.findMany({ where: { tripId }, orderBy: { createdAt: 'desc' } })
      return reply.send({ items })
    }
  )

  // Admin refunds list (global)
  const refundListQuery = {
    type: 'object',
    properties: {
      userId: { type: 'string' },
      city: { type: 'string' },
      from: { type: 'string', format: 'date-time' },
      to: { type: 'string', format: 'date-time' },
      limit: { type: 'integer', minimum: 1, maximum: 200, default: 50 },
      cursor: { type: 'string' },
      format: { type: 'string', enum: ['json','csv'], default: 'json' },
    },
    additionalProperties: false,
  } as const

  const refundItemSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      paymentId: { type: 'string' },
      tripId: { type: 'string' },
      amountUsd: { type: 'number' },
      reason: { type: 'string', nullable: true },
      provider: { type: 'string', nullable: true },
      externalId: { type: 'string', nullable: true },
      createdAt: { type: 'string', format: 'date-time' },
    },
  } as const

  app.get(
    '/admin/refunds',
    { schema: { operationId: 'adminRefundsList', tags: ['payments'], summary: 'Listar refunds (ADMIN)', description: 'Lista auditorias de reembolso/cancelaciÃ³n con filtros y CSV. Si format=csv, devuelve text/csv.', querystring: refundListQuery, response: { 200: { content: { 'application/json': { schema: { type: 'object', properties: { items: { type: 'array', items: refundItemSchema }, nextCursor: { type: 'string', nullable: true } } } }, 'text/csv': { schema: { type: 'string', example: 'id,paymentId,tripId,amountUsd,reason,provider,externalId,createdAt\n"re_1","pay_1","trp_1",1.5,"admin_refund","Stripe","re_123","2025-01-01T12:00:00.000Z"\n' } } } } } }, preHandler: app.auth.requireRole('ADMIN') },
    async (req: any, reply) => {
      const { userId, city, from, to, limit = 50, cursor, format = 'json' } = req.query as { userId?: string; city?: string; from?: string; to?: string; limit?: number; cursor?: string; format?: 'json'|'csv' }
      const where: any = {}
      if (from || to) where.createdAt = { ...(from ? { gte: new Date(from) } : {}), ...(to ? { lte: new Date(to) } : {}) }
      if (userId) {
        // Filter by rider/driver on Trip
        where.trip = { OR: [ { riderId: userId }, { driverId: userId } ] }
      }
      if (city) {
        where.trip = {
          ...(where.trip || {}),
          pricingSnapshot: { path: ['city'], equals: city } as any,
        }
      }

      const items = await prisma.paymentRefund.findMany({
        where,
        take: limit,
        ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
        orderBy: { createdAt: 'desc' },
      })

      if (format === 'csv') {
        const header = ['id','paymentId','tripId','amountUsd','reason','provider','externalId','createdAt']
        const rows = items.map((r: any) => [
          r.id,
          r.paymentId,
          r.tripId,
          String(r.amountUsd ?? ''),
          r.reason ?? '',
          r.provider ?? '',
          r.externalId ?? '',
          (r.createdAt as any)?.toISOString?.() || String(r.createdAt),
        ].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))
        const csv = [header.join(','), ...rows].join('\n') + '\n'
        reply.header('Content-Type','text/csv; charset=utf-8')
        return reply.send(csv)
      }

      const nextCursor = items.length === limit ? items[items.length - 1].id : null
      return reply.send({ items, nextCursor })
    }
  )
}







