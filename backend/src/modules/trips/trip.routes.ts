// backend/src/modules/trips/trip.routes.ts
import type { FastifyInstance } from 'fastify'

import prisma from '../../lib/prisma'
import { subscribeToTrip, publishTripEvent } from '../../services/events.service'
import { incCounter, incCurrentSse, decCurrentSse } from '../../services/metrics.service'
import { computeFare } from '../../services/pricing.service'
import { haversineKm } from '../../utils/haversine'
import { getStripe } from '../../services/stripe.service'
import { env } from '../../config/env'
import { sendPushToUser } from '../../services/push.service'

import { requestTripBody, errorResponse } from './trip.schemas'


export default async function tripRoutes(app: FastifyInstance) {
  const MATCH_RADIUS_M = Number(process.env.MATCH_RADIUS_M || 5000)
  const LOCATION_MAX_AGE_MIN = Number(process.env.LOCATION_MAX_AGE_MIN || 10)

  async function ensurePostgisFlag() {
    if ((globalThis as any).__POSTGIS_AVAILABLE__ === undefined) {
      try {
        const chk = await prisma.$queryRaw<{ extname: string }[]>`SELECT extname FROM pg_extension WHERE extname='postgis'`
        ;(globalThis as any).__POSTGIS_AVAILABLE__ = Array.isArray(chk) && chk.length > 0
      } catch {
        ;(globalThis as any).__POSTGIS_AVAILABLE__ = false
      }
    }
  }

  async function findNearestDriver(pickupLat: number, pickupLng: number, maxAgeMin: number, radiusM: number): Promise<string | null> {
    await ensurePostgisFlag()
    if ((globalThis as any).__POSTGIS_AVAILABLE__) {
      try {
        const nearest = await prisma.$queryRaw<{ userId: string; meters: number }[]>`
          SELECT dp."userId",
                 public.ST_Distance(
                   public.ST_SetSRID(public.ST_MakePoint(${pickupLng}, ${pickupLat}), 4326)::public.geography,
                   public.ST_SetSRID(public.ST_MakePoint(dp."currentLng", dp."currentLat"), 4326)::public.geography
                 ) AS meters
          FROM "DriverProfile" dp
          WHERE dp.status = 'IDLE'
            AND dp."currentLat" IS NOT NULL AND dp."currentLng" IS NOT NULL
            AND dp."locationUpdatedAt" IS NOT NULL
            AND dp."locationUpdatedAt" >= NOW() - (interval '1 minute' * ${maxAgeMin})
            AND public.ST_DWithin(
                public.ST_SetSRID(public.ST_MakePoint(${pickupLng}, ${pickupLat}), 4326)::public.geography,
                public.ST_SetSRID(public.ST_MakePoint(dp."currentLng", dp."currentLat"), 4326)::public.geography,
                ${radiusM}
            )
          ORDER BY meters ASC
          LIMIT 1
        `
        if (nearest && nearest.length > 0) {
          incCounter('matching_postgis')
          return nearest[0].userId
        }
      } catch {
        // fallthrough to haversine
      }
    }
    const cutoff = new Date(Date.now() - maxAgeMin * 60 * 1000)
    const candidates = await prisma.driverProfile.findMany({
      where: { status: 'IDLE' as any, currentLat: { not: null }, currentLng: { not: null }, locationUpdatedAt: { gte: cutoff } },
      select: { userId: true, currentLat: true, currentLng: true },
      take: 200,
      orderBy: { locationUpdatedAt: 'desc' }
    })
    let best: string | null = null
    let bestDist = Number.POSITIVE_INFINITY
    for (const c of candidates) {
      const dKm = haversineKm(pickupLat, pickupLng, Number(c.currentLat as any), Number(c.currentLng as any))
      if (dKm < bestDist) { bestDist = dKm; best = c.userId }
    }
    if (best) {
      incCounter('matching_haversine')
      return best
    }
    incCounter('matching_idle_fallback')
    return best
  }
  // POST /trips/request — Rider creates a trip and assigns nearest driver
  app.post('/trips/request', {
    preHandler: [app.auth.verifyJWT],
    config: {
      rateLimit: {
        max: Number(process.env.RL_TRIP_REQUEST_MAX || 10),
        timeWindow: process.env.RL_TRIP_REQUEST_WIN || '1 minute',
        keyGenerator: (req: any) => `tripreq:${req.user?.id || req.ip}`,
      }
    },
    schema: {
      operationId: 'tripsRequest',
      summary: 'Solicitar viaje',
      description: 'Crea un viaje y asigna el conductor disponible más cercano.',
      tags: ['Trips'],
      body: requestTripBody,
      response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } } }, example: { ok: true, trip: { id: 'trp_123', status: 'ACCEPTED' } } }, 400: ({ ...errorResponse, example: { error: 'Missing city' } } as any)
      }
    } as any
  }, async (req: any, reply) => {
    const user = req.user as { id: string; role: 'ADMIN'|'DRIVER'|'RIDER' }
    if (user.role !== 'RIDER' && user.role !== 'ADMIN') return reply.code(403).send({ error: 'Forbidden' })
    const b = (req.body || {}) as any
    const required = ['city','pickupLat','pickupLng','dropoffLat','dropoffLng','distanceKm','durationMin']
    for (const k of required) { if (b[k] === undefined || b[k] === null) return reply.code(400).send({ error: `Missing ${k}` }) }

    const fare = await computeFare({ city: String(b.city), distanceKm: Number(b.distanceKm), durationMin: Number(b.durationMin) })
    const bestUserId = await findNearestDriver(Number(b.pickupLat), Number(b.pickupLng), LOCATION_MAX_AGE_MIN, MATCH_RADIUS_M)

    const trip = await prisma.trip.create({
      data: {
        riderId: user.id,
        driverId: bestUserId ?? null,
        status: (bestUserId ? 'ACCEPTED' : 'REQUESTED') as any,
        pickupLat: Number(b.pickupLat) as any,
        pickupLng: Number(b.pickupLng) as any,
        pickupAddress: b.pickupAddress ?? null,
        dropoffLat: Number(b.dropoffLat) as any,
        dropoffLng: Number(b.dropoffLng) as any,
        dropoffAddress: b.dropoffAddress ?? null,
        distanceKm: Number(b.distanceKm) as any,
        durationMin: Number(b.durationMin) || null,
        city: String(b.city),
        pricingSnapshot: { city: String(b.city), fare, preferredMethod: b.preferredMethod ?? null } as any,
        costUsd: Number(fare.totalUsd) as any,
        currency: 'USD',
        acceptedAt: bestUserId ? new Date() : null
      }
    })

    if (bestUserId) {
      publishTripEvent(trip.id, { type: 'ASSIGNED', status: 'ACCEPTED', at: new Date().toISOString(), data: { driverId: bestUserId } })
      // Push notifications
      sendPushToUser(trip.riderId, { title: 'Conductor asignado', body: 'Se asign� un conductor a tu viaje.' })
      sendPushToUser(bestUserId, { title: 'Nuevo viaje asignado', body: 'Tienes un nuevo viaje por atender.' })
    } else {
      publishTripEvent(trip.id, { type: 'INIT', status: 'REQUESTED', at: new Date().toISOString() })
    }
    return reply.send({ ok: true, trip: { id: trip.id, status: trip.status } })
  })

  // POST /trips/:id/accept — Driver accepts assigned trip
  app.post('/trips/:id/accept', { preHandler: [app.auth.verifyJWT], schema: { operationId: 'tripsAccept', tags: ['Trips'], summary: 'Aceptar viaje', description: 'El conductor acepta el viaje asignado.', response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } } }, example: { ok: true, trip: { id: 'trp_123', status: 'ACCEPTED' } } }, 400: ({ ...errorResponse, example: { error: 'Invalid id' } } as any), 403: ({ ...errorResponse, example: { error: 'Email not verified' } } as any), 404: ({ ...errorResponse, example: { error: 'Trip not found' } } as any), 409: ({ ...errorResponse, example: { error: 'Invalid state for accept' } } as any) } } as any },
    async (req: any, reply) => {
      const p = req.params as { id?: string }; const id = p?.id || ''
      if (!id) return reply.code(400).send({ error: 'Invalid id' })
      const user = req.user as { id: string; role: string }
      if (user.role !== 'DRIVER' && user.role !== 'ADMIN') return reply.code(403).send({ error: 'Forbidden' })
      const t = await prisma.trip.findUnique({ where: { id }, select: { id: true, status: true, driverId: true } })
      if (!t) return reply.code(404).send({ error: 'Trip not found' })
      if (t.driverId && t.driverId !== user.id && user.role !== 'ADMIN') return reply.code(403).send({ error: 'Not your trip' })
      // accept: atomic guard below ensures only one driver accepts
      // Atomic guard to avoid double-accept by multiple drivers
      const __resAccept = await prisma.trip.updateMany({
        where: { id, status: 'REQUESTED', OR: [{ driverId: null }, { driverId: user.id }] },
        data: { status: 'ACCEPTED' as any, acceptedAt: new Date(), driverId: user.id }
      })
      if (__resAccept.count === 0) {
        const __cur = await prisma.trip.findUnique({ where: { id }, select: { id: true, status: true, driverId: true } })
        if (__cur && __cur.status === 'ACCEPTED' && __cur.driverId === user.id) {
          return reply.send({ ok: true, trip: { id: __cur.id, status: __cur.status } })
        }
        return reply.code(409).send({ error: 'Invalid state for accept' })
      }
      const up = { id, status: 'ACCEPTED' as any, driverId: user.id }
      publishTripEvent(id, { type: 'ACCEPTED', status: 'ACCEPTED', at: new Date().toISOString(), data: { driverId: user.id } })
      // Notify rider
      if (up.driverId) sendPushToUser((await prisma.trip.findUnique({ where: { id }, select: { riderId: true } }))!.riderId, { title: 'Conductor acept�', body: 'Tu conductor acept� el viaje.' })
      return reply.send({ ok: true, trip: { id, status: 'ARRIVED' } })
    }
  )

  // GET /trips/:id/cancel/quote — Estimate cancellation fee based on current state (authorized roles)
  app.get('/trips/:id/cancel/quote', {
    preHandler: [app.auth.verifyJWT],
    schema: { operationId: 'tripsCancelQuote', tags: ['Trips'], summary: 'Cotizar tarifa de cancelación', response: { 200: { type: 'object', properties: { cancellable: { type: 'boolean' }, feeUsd: { type: 'number' }, currency: { type: 'string' }, reason: { type: 'string' }, graceRemainingSec: { type: 'integer', nullable: true } } } } } as any,
  }, async (req: any, reply) => {
    const id = (req.params as any).id as string
    if (!id) return reply.code(400).send({ error: 'Invalid id' })
    const t = await prisma.trip.findUnique({ where: { id }, select: { id: true, status: true, requestedAt: true, acceptedAt: true, arrivedAt: true, riderId: true, driverId: true } as any })
    if (!t) return reply.code(404).send({ error: 'Trip not found' })
    const u = req.user as { id: string; role: 'ADMIN'|'DRIVER'|'RIDER' }
    if (u.role !== 'ADMIN' && u.id !== t.riderId && u.id !== t.driverId) return reply.code(403).send({ error: 'Forbidden' })
    const now = Date.now()
    const graceMs = Number(env.cancellationFeeGraceSec || 0) * 1000
    const remaining = (from?: Date | null) => {
      if (!from || !graceMs) return 0
      const diff = now - new Date(from as any).getTime()
      return Math.max(0, Math.floor((graceMs - diff) / 1000))
    }
    let fee = 0; let reason = 'NO_FEE'; let graceRemainingSec: number|null = null; let cancellable = true
    const st = String(t.status)
    if (st === 'REQUESTED' || st === 'ASSIGNED') { fee = 0; reason = 'BEFORE_ACCEPT'; }
    else if (st === 'ACCEPTED') { const rem = remaining((t as any).acceptedAt || (t as any).requestedAt); graceRemainingSec = rem; fee = rem>0?0:Number(env.cancellationFeeAcceptedUsd||0); reason = rem>0?'WITHIN_GRACE_ACCEPTED':'AFTER_GRACE_ACCEPTED' }
    else if (st === 'ARRIVED') { const rem = remaining((t as any).arrivedAt || (t as any).acceptedAt); graceRemainingSec = rem; fee = rem>0?0:Number(env.cancellationFeeArrivedUsd||0); reason = rem>0?'WITHIN_GRACE_ARRIVED':'AFTER_GRACE_ARRIVED' }
    else { cancellable = false; fee = 0; reason = 'NOT_CANCELLABLE'; graceRemainingSec = null }
    return reply.send({ cancellable, feeUsd: Number(fee||0), currency: 'USD', reason, graceRemainingSec })
  })

  // POST /trips/:id/reject — Driver rejects assigned/requested trip for reassign
  app.post('/trips/:id/reject', { preHandler: [app.auth.verifyJWT], schema: { operationId: 'tripsReject', tags: ['Trips'], summary: 'Rechazar viaje (driver)', description: 'El conductor rechaza el viaje asignado. Vuelve a estado REQUESTED para re-asignación.', response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } } }, example: { ok: true, trip: { id: 'trp_123', status: 'REQUESTED' } } }, 400: ({ ...errorResponse, example: { error: 'Invalid id' } } as any), 403: ({ ...errorResponse, example: { error: 'Forbidden' } } as any), 404: ({ ...errorResponse, example: { error: 'Trip not found' } } as any), 409: ({ ...errorResponse, example: { error: 'Invalid state for reject' } } as any) } } as any },
    async (req: any, reply) => {
      const id = (req.params as any).id as string
      const user = req.user as { id: string; role: string }
      if (!id) return reply.code(400).send({ error: 'Invalid id' })
      if (user.role !== 'DRIVER' && user.role !== 'ADMIN') return reply.code(403).send({ error: 'Forbidden' })
      const t = await prisma.trip.findUnique({ where: { id }, select: { id: true, status: true, driverId: true, riderId: true } })
      if (!t) return reply.code(404).send({ error: 'Trip not found' })
      if (t.driverId && t.driverId !== user.id && user.role !== 'ADMIN') return reply.code(403).send({ error: 'Not your trip' })
      if (t.status !== 'REQUESTED' && t.status !== 'ASSIGNED') return reply.code(409).send({ error: 'Invalid state for reject' })
      await prisma.trip.update({ where: { id }, data: { status: 'REQUESTED' as any, driverId: null } })
      publishTripEvent(id, { type: 'REASSIGNED', status: 'REQUESTED', at: new Date().toISOString(), data: { reason: 'DRIVER_REJECTED', driverId: user.id } })
      if (t.riderId) sendPushToUser(t.riderId, { title: 'Buscando otro conductor', body: 'El conductor rechazó el viaje, buscando otro.' })
      return reply.send({ ok: true, trip: { id, status: 'REQUESTED' } })
    }
  )

  // POST /trips/:id/arrived — Driver arrived at pickup
  app.post('/trips/:id/arrived', { preHandler: [app.auth.verifyJWT], schema: { operationId: 'tripsArrived', tags: ['Trips'], summary: 'Arribo del conductor', description: 'El conductor lleg� al punto de recogida.', response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } } }, example: { ok: true, trip: { id: 'trp_123', status: 'ARRIVED' } } }, 400: ({ ...errorResponse, example: { error: 'Invalid id' } } as any), 403: ({ ...errorResponse, example: { error: 'Email not verified' } } as any), 404: ({ ...errorResponse, example: { error: 'Trip not found' } } as any), 409: ({ ...errorResponse, example: { error: 'Invalid state for arrived' } } as any) } } as any },
    async (req: any, reply) => {
      const id = (req.params as any).id as string
      const user = req.user as { id: string; role: string }
      if (!id) return reply.code(400).send({ error: 'Invalid id' })
      if (user.role !== 'DRIVER' && user.role !== 'ADMIN') return reply.code(403).send({ error: 'Forbidden' })
      const t = await prisma.trip.findUnique({ where: { id }, select: { id: true, driverId: true } })
      if (!t) return reply.code(404).send({ error: 'Trip not found' })
      if (t.driverId && t.driverId !== user.id && user.role !== 'ADMIN') return reply.code(403).send({ error: 'Not your trip' })
      const __resArrived = await prisma.trip.updateMany({ where: { id, status: 'ACCEPTED', OR: [{ driverId: user.id }, { driverId: null }] }, data: { status: 'ARRIVED' as any, arrivedAt: new Date(), driverId: user.id } })
      if (__resArrived.count === 0) return reply.code(409).send({ error: 'Invalid state for arrived' })
      publishTripEvent(id, { type: 'ARRIVED', status: 'ARRIVED', at: new Date().toISOString() })
      const tr = await prisma.trip.findUnique({ where: { id }, select: { riderId: true } })
      if (tr) sendPushToUser(tr.riderId, { title: 'Conductor lleg�', body: 'Tu conductor ha lleg�o al punto de recogida.' })
      return reply.send({ ok: true, trip: { id, status: 'ARRIVED' } })
    }
  )

  // POST /trips/:id/start — Start trip, optionally preauthorize CARD
  app.post('/trips/:id/start', { preHandler: [app.auth.verifyJWT], schema: { operationId: 'tripsStart', tags: ['Trips'], summary: 'Iniciar viaje', description: 'Inicia el viaje; si method=CARD y Stripe est� configurado, preautoriza.', body: { type: 'object', properties: { method: { type: 'string', enum: ['CASH','CARD'], default: 'CASH' } }, additionalProperties: false, example: { method: 'CASH' } }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } } }, example: { ok: true, trip: { id: 'trp_123', status: 'STARTED' } } }, 400: ({ ...errorResponse, example: { error: 'Invalid id' } } as any), 403: ({ ...errorResponse, example: { error: 'Email not verified' } } as any), 404: ({ ...errorResponse, example: { error: 'Trip not found' } } as any), 409: ({ ...errorResponse, example: { error: 'Invalid state for start' } } as any) } } as any },
    async (req: any, reply) => {
      const id = (req.params as any).id as string
      const { method } = (req.body || {}) as { method?: 'CASH'|'CARD' }
      const payMethod = method || 'CASH'
      const user = req.user as { id: string; role: string }
      if (!id) return reply.code(400).send({ error: 'Invalid id' })
      if (user.role !== 'DRIVER' && user.role !== 'ADMIN') return reply.code(403).send({ error: 'Forbidden' })
      const t = await prisma.trip.findUnique({ where: { id }, include: { payment: true, rider: true } })
      if (!t) return reply.code(404).send({ error: 'Trip not found' })
      if (t.status !== 'ACCEPTED' && t.status !== 'ARRIVED') return reply.code(409).send({ error: 'Invalid state for start' })
      // Preauth if CARD and Stripe configured; block CARD if disabled/absent
      if (payMethod === 'CARD') {
        const stripe = getStripe()
        const allowCard = env.paymentsEnableCard && Boolean(stripe)
        if (!allowCard) return reply.code(400).send({ error: 'CARD disabled' })
        if (!t.payment) {
          const rider = await prisma.user.findUnique({ where: { id: t.riderId }, select: { stripeCustomerId: true, stripeDefaultPaymentMethodId: true } as any })
          if (!(rider as any)?.stripeCustomerId) {
            return reply.code(400).send({ error: 'Rider has no card on file' })
          }
          const amountCents = Math.max(1, Math.round(Number(t.costUsd as any || 0) * 100)) || 100
          const intent = await (stripe as any).paymentIntents.create({
            amount: amountCents, currency: 'usd', capture_method: 'manual',
            customer: (rider as any).stripeCustomerId,
            payment_method: (rider as any).stripeDefaultPaymentMethodId || undefined,
            confirm: Boolean((rider as any).stripeDefaultPaymentMethodId),
            metadata: { tripId: id }
          })
          await prisma.payment.create({ data: { tripId: id, amountUsd: Number((t.costUsd as any) || 0) as any, status: 'AUTHORIZED' as any, method: 'CARD', provider: 'Stripe', externalId: intent.id } })
        }
      } else if (!t.payment && payMethod === 'CASH') {
        await prisma.payment.create({ data: { tripId: id, amountUsd: Number((t.costUsd as any) || 0) as any, status: 'PENDING' as any, method: 'CASH', provider: null, externalId: null } })
      }
      const __resStart = await prisma.trip.updateMany({ where: { id, status: { in: ['ACCEPTED','ARRIVED'] }, OR: [{ driverId: user.id }, { driverId: null }] }, data: { status: 'STARTED' as any, startedAt: new Date(), driverId: user.id } })
      if (__resStart.count === 0) return reply.code(409).send({ error: 'Invalid state for start' })
      publishTripEvent(id, { type: 'STARTED', status: 'STARTED', at: new Date().toISOString() })
      const trS = await prisma.trip.findUnique({ where: { id }, select: { riderId: true } })
      if (trS) sendPushToUser(trS.riderId, { title: 'Viaje iniciado', body: 'Tu viaje ha comenzado.' })
      return reply.send({ ok: true, trip: { id, status: 'STARTED' } })
    }
  )

  // POST /trips/:id/complete — Complete trip and settle payment
  app.post('/trips/:id/complete', { preHandler: [app.auth.verifyJWT], schema: { operationId: 'tripsComplete', tags: ['Trips'], summary: 'Completar viaje', description: 'Completa el viaje y liquida el pago (captura Stripe o marca CASH pagado).', response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } } }, example: { ok: true, trip: { id: 'trp_123', status: 'COMPLETED' } } }, 400: ({ ...errorResponse, example: { error: 'Invalid id' } } as any), 403: ({ ...errorResponse, example: { error: 'Email not verified' } } as any), 404: ({ ...errorResponse, example: { error: 'Trip not found' } } as any), 409: ({ ...errorResponse, example: { error: 'Invalid state for complete' } } as any) } } as any },
    async (req: any, reply) => {
      const id = (req.params as any).id as string
      const user = req.user as { id: string; role: string }
      if (!id) return reply.code(400).send({ error: 'Invalid id' })
      if (user.role !== 'DRIVER' && user.role !== 'ADMIN') return reply.code(403).send({ error: 'Forbidden' })
      const t = await prisma.trip.findUnique({ where: { id }, include: { payment: true } })
      if (!t) return reply.code(404).send({ error: 'Trip not found' })
      if (t.status !== 'STARTED') return reply.code(409).send({ error: 'Invalid state for complete' })
      // Capture if needed
      if (t.payment && t.payment.provider === 'Stripe' && t.payment.status === 'AUTHORIZED' && t.payment.externalId) {
        const stripe = getStripe()
        if (stripe) {
          const amountCents = Math.max(1, Math.round(Number(t.payment.amountUsd as any) * 100))
          try {
            const cap = await stripe.paymentIntents.capture(t.payment.externalId, { amount_to_capture: amountCents })
            await prisma.payment.update({ where: { tripId: id }, data: { status: cap.status === 'succeeded' ? ('PAID' as any) : ('AUTHORIZED' as any) } })
          } catch {
            // leave as AUTHORIZED if capture fails; admin can retry
          }
        }
      } else if (t.payment && t.payment.method === 'CASH') {
        await prisma.payment.update({ where: { tripId: id }, data: { status: 'PAID' as any } })
      }
      const __resComplete = await prisma.trip.updateMany({ where: { id, status: 'STARTED', OR: [{ driverId: user.id }, { driverId: null }] }, data: { status: 'COMPLETED' as any, completedAt: new Date(), driverId: user.id } })
      if (__resComplete.count === 0) return reply.code(409).send({ error: 'Invalid state for complete' })
      publishTripEvent(id, { type: 'COMPLETED', status: 'COMPLETED', at: new Date().toISOString() })
      const trC = await prisma.trip.findUnique({ where: { id }, select: { riderId: true, driverId: true } })
      if (trC) {
        sendPushToUser(trC.riderId, { title: 'Viaje completado', body: 'Gracias por viajar con nosotros.' })
        if (trC.driverId) sendPushToUser(trC.driverId, { title: 'Viaje completado', body: 'Has completado un viaje.' })
      }
      return reply.send({ ok: true, trip: { id, status: 'COMPLETED' } })
    }
  )

  // POST /trips/:id/cancel — Rider cancels; may apply fee if ARRIVED or beyond grace
  app.post('/trips/:id/cancel', { preHandler: [app.auth.verifyJWT], schema: { operationId: 'tripsCancel', tags: ['Trips'], summary: 'Cancelar viaje (rider)', description: 'El rider cancela el viaje; puede aplicar fee seg�n estado y reglas.', body: { type: 'object', properties: { reason: { type: 'string' } }, additionalProperties: false, example: { reason: 'CHANGED_MIND' } }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: { type: 'object', properties: { id: { type: 'string' }, status: { type: 'string' } } } }, example: { ok: true, trip: { id: 'trp_123', status: 'CANCELED' } } }, 400: ({ ...errorResponse, example: { error: 'Invalid id' } } as any), 403: ({ ...errorResponse, example: { error: 'Email not verified' } } as any), 404: ({ ...errorResponse, example: { error: 'Trip not found' } } as any), 409: ({ ...errorResponse, example: { error: 'Invalid state for cancel' } } as any) } } as any },
    async (req: any, reply) => {
      const id = (req.params as any).id as string
      const user = req.user as { id: string; role: string }
      const { reason } = (req.body || {}) as { reason?: string }
      if (!id) return reply.code(400).send({ error: 'Invalid id' })
      if (user.role !== 'RIDER' && user.role !== 'ADMIN') return reply.code(403).send({ error: 'Forbidden' })
      const t = await prisma.trip.findUnique({ where: { id }, select: { id: true, riderId: true, status: true, acceptedAt: true, arrivedAt: true, pricingSnapshot: true, city: true } })
      if (!t) return reply.code(404).send({ error: 'Trip not found' })
      if (user.role !== 'ADMIN' && t.riderId !== user.id) return reply.code(403).send({ error: 'Not your trip' })
      if (t.status === 'COMPLETED' || t.status === 'CANCELED') return reply.code(409).send({ error: 'Invalid state for cancel' })
      let fee = 0
      // Determine fee by status
      const city = (t as any).city || (t.pricingSnapshot as any)?.city || 'default'
      const rule = await prisma.tariffRule.findFirst({ where: { city, active: true }, orderBy: { updatedAt: 'desc' } })
      const graceSec = Number((rule as any)?.cancellationGraceSec ?? process.env.CANCELLATION_FEE_GRACE_SEC ?? 120)
      if (t.status === 'ARRIVED') {
        fee = Number((rule as any)?.cancellationFeeArrivedUsd ?? process.env.CANCELLATION_FEE_USD_ARRIVED ?? 2)
      } else if (t.status === 'ACCEPTED') {
        const ageSec = t.acceptedAt ? Math.floor((Date.now() - new Date(t.acceptedAt as any).getTime()) / 1000) : 0
        if (ageSec > graceSec) {
          fee = Number((rule as any)?.cancellationFeeAcceptedUsd ?? process.env.CANCELLATION_FEE_USD_ACCEPTED ?? 1)
        }
      }
      const __resCancel = await prisma.trip.updateMany({ where: { id, status: { notIn: ['COMPLETED','CANCELED'] } }, data: { status: 'CANCELED' as any, canceledAt: new Date(), cancelReason: reason || null } })
      if (__resCancel.count === 0) return reply.code(409).send({ error: 'Invalid state for cancel' })
      if (fee > 0) {
        const existing = await prisma.payment.findUnique({ where: { tripId: id } })
        if (existing) {
          await prisma.payment.update({ where: { tripId: id }, data: { amountUsd: fee as any, status: 'PAID' as any, method: 'CASH', provider: null, externalId: null } })
        } else {
          await prisma.payment.create({ data: { tripId: id, amountUsd: fee as any, status: 'PAID' as any, method: 'CASH', provider: null, externalId: null } })
        }
      }
      publishTripEvent(id, { type: 'CANCELED', status: 'CANCELED', at: new Date().toISOString(), data: { reason: reason || 'RIDER_CANCEL' } })
      const trX = await prisma.trip.findUnique({ where: { id }, select: { driverId: true } })
      if (trX?.driverId) sendPushToUser(trX.driverId, { title: 'Viaje cancelado', body: 'El pasajero canceló el viaje.' })
      return reply.send({ ok: true, trip: { id, status: 'CANCELED' } })
    }
  )
  // GET /trips/:id/sse — Server-Sent Events stream for live trip updates
  app.get('/trips/:id/sse', {
    preHandler: [app.auth.verifyJWT],
    schema: {
      summary: 'Trip live updates (SSE)',
      description: 'Stream de eventos del viaje en tiempo real para Rider/Driver via Server-Sent Events. Envía eventos como INIT/ASSIGNED/ACCEPTED/ARRIVED/STARTED/COMPLETED/CANCELED y LOCATION (lat/lng del driver).',
      tags: ['Trips'],
      produces: ['text/event-stream'],
      response: {
        200: {
          description: 'text/event-stream',
          content: {
            'text/event-stream': {
              schema: { type: 'string', example: 'event: INIT\ndata: {"status":"ASSIGNED"}\n\n' }
            }
          }
        }
      }
    },
    handler: async (req, reply) => {
      const p = (req as any).params as { id?: string }
      const id = (p && typeof p.id === 'string' ? p.id : '')
      if (!id) return (reply as any).code(400).send({ error: 'Invalid id' })

      const trip = await prisma.trip.findUnique({ where: { id }, select: { id: true, status: true, riderId: true, driverId: true } })
      if (!trip) return (reply as any).code(404).send({ error: 'Trip not found' })

      const u = (req as any).user as { id: string; role: 'ADMIN' | 'DRIVER' | 'RIDER' }
      if (u.role !== 'ADMIN' && u.id !== trip.riderId && u.id !== trip.driverId) {
        return (reply as any).code(403).send({ error: 'Forbidden' })
      }

      reply.raw.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
      reply.raw.setHeader('Cache-Control', 'no-cache, no-transform')
      reply.raw.setHeader('Connection', 'keep-alive')
      // Disable proxy buffering (e.g., Nginx) if present
      reply.raw.setHeader('X-Accel-Buffering', 'no')
      // Flush headers early
      // @ts-ignore
      if (typeof reply.raw.flushHeaders === 'function') reply.raw.flushHeaders()

      const write = (chunk: string) => {
        try { reply.raw.write(chunk) } catch { /* ignore broken pipe */ }
      }

      // Metrics
      incCounter('sse_connections')
      incCurrentSse()

      // Initial event (current status)
      write('event: INIT\n')
      write('data: ' + JSON.stringify({ status: trip.status, at: new Date().toISOString() }) + '\n\n')

      // Subscribe to further trip events
      const unsubscribe = subscribeToTrip(id, (ev) => {
        write('event: ' + ev.type + '\n')
        write('data: ' + JSON.stringify(ev) + '\n\n')
      })

      // Keepalive comments to prevent timeouts in some proxies
      const keepAliveMs = Math.max(10, Number(process.env.SSE_KEEPALIVE_SEC || 15)) * 1000
      const timer = setInterval(() => write(': ping ' + Date.now() + '\n\n'), keepAliveMs)

      // Handle client disconnect
      req.raw.on('close', () => {
        clearInterval(timer)
        unsubscribe()
        decCurrentSse()
        try { reply.raw.end() } catch { /* ignore */ }
      })

      // Optional: inform stream is ready
      publishTripEvent(id, { type: 'INFO', at: new Date().toISOString(), data: { message: 'SSE connected' } })

      return reply.hijack()
    }
  })
  
  // GET /trips/:id/driver-location � Current driver lat/lng for this trip
  app.get(
    '/trips/:id/driver-location',
    {
      preHandler: [app.auth.verifyJWT],
      schema: {
        operationId: 'tripsDriverLocation',
        tags: ['Trips'],
        summary: 'Ubicación actual del driver para el viaje',
        description: 'Devuelve lat/lng y timestamp de la última ubicaci�n reportada por el driver asignado al trip.',
        params: { type: 'object', required: ['id'], properties: { id: { type: 'string' } }, additionalProperties: false },
        response: {
          200: {
            type: 'object',
            properties: {
              tripId: { type: 'string' },
              driverId: { type: 'string', nullable: true },
              lat: { type: 'number', nullable: true },
              lng: { type: 'number', nullable: true },
              locationUpdatedAt: { type: 'string', format: 'date-time', nullable: true },
            },
            example: { tripId: 'trp_123', driverId: 'u_driver', lat: -2.17, lng: -79.92, locationUpdatedAt: '2025-01-01T12:00:00.000Z' }
          },
          400: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Invalid id' } },
          403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Email not verified' } },
          404: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Trip not found' } },
        }
      } as any,
    },
    async (req: any, reply) => {
      const id = (req.params as any).id as string
      if (!id) return reply.code(400).send({ error: 'Invalid id' })
      const user = req.user as { id: string; role: 'ADMIN'|'DRIVER'|'RIDER' }
      const t = await prisma.trip.findUnique({ where: { id }, select: { riderId: true, driverId: true } })
      if (!t) return reply.code(404).send({ error: 'Trip not found' })
      const isOwner = user.id === t.riderId || user.id === t.driverId
      const isAdmin = user.role === 'ADMIN'
      if (!isOwner && !isAdmin) return reply.code(403).send({ error: 'Forbidden' })
      if (!t.driverId) return reply.send({ tripId: id, driverId: null, lat: null, lng: null, locationUpdatedAt: null })
      const dp = await prisma.driverProfile.findUnique({ where: { userId: t.driverId }, select: { currentLat: true, currentLng: true, locationUpdatedAt: true } })
      return reply.send({
        tripId: id,
        driverId: t.driverId,
        lat: dp?.currentLat != null ? Number(dp.currentLat as any) : null,
        lng: dp?.currentLng != null ? Number(dp.currentLng as any) : null,
        locationUpdatedAt: dp?.locationUpdatedAt ?? null,
      })
    }
  )
}












