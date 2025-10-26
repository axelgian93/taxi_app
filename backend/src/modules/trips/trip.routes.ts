// src/modules/trips/trip.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import { computeFare } from '../../services/pricing.service'
import { haversineKm } from '../../utils/geo'
import { subscribeToTrip, publishTripEvent } from '../../services/events.service'
import { sendPushToUser } from '../../services/push.service'
import { incCounter, incCurrentSse, decCurrentSse } from '../../services/metrics.service'

function fail(reply: any, code: number, msg: string) {
  return reply.code(code).send({ error: msg })
}

export default async function tripRoutes(app: FastifyInstance) {
  const MATCH_RADIUS_M = Number(process.env.MATCH_RADIUS_M || 5000)
  const LOCATION_MAX_AGE_MIN = Number(process.env.LOCATION_MAX_AGE_MIN || 10)
  // Swagger schemas
  const coordSchema = {
    type: 'object',
    required: ['lat', 'lng'],
    properties: { lat: { type: 'number' }, lng: { type: 'number' } },
    additionalProperties: false,
  } as const
  const pricingBreakdownSchema = {
    type: 'object',
    properties: {
      base: { type: 'number', example: 1.5 },
      distance: { type: 'number', example: 3.25 },
      duration: { type: 'number', example: 2.7 },
      surge: { type: 'number', example: 0.45 },
    },
  } as const
  const pricingSchema = {
    type: 'object',
    properties: {
      baseFareUsd: { type: 'number', example: 1.5 },
      perKmUsd: { type: 'number', example: 0.5 },
      perMinUsd: { type: 'number', example: 0.15 },
      minFareUsd: { type: 'number', example: 2.0 },
      surgeMultiplier: { type: 'number', example: 1.1, nullable: true },
      totalUsd: { type: 'number', example: 7.8 },
      breakdown: pricingBreakdownSchema,
    },
    example: {
      baseFareUsd: 1.5,
      perKmUsd: 0.5,
      perMinUsd: 0.15,
      minFareUsd: 2.0,
      surgeMultiplier: 1.1,
      totalUsd: 7.8,
      breakdown: { base: 1.5, distance: 3.25, duration: 2.7, surge: 0.35 }
    }
  } as const
  const tripSummarySchema = {
    type: 'object',
    properties: {
      id: { type: 'string' },
      status: { type: 'string', enum: ['REQUESTED','ASSIGNED','ACCEPTED','ARRIVED','STARTED','COMPLETED','CANCELED'] },
    },
  } as const
  const errorSchema = { type: 'object', properties: { error: { type: 'string' } } } as const
  const okSchema = { type: 'object', properties: { ok: { type: 'boolean' } } } as const
  const idParamSchema = {
    type: 'object',
    required: ['id'],
    properties: { id: { type: 'string', example: 'trp_123' } },
    additionalProperties: false,
  } as const

  const cancelBodySchema = {
    type: 'object',
    properties: { reason: { type: 'string', example: 'CHANGED_MIND' } },
    additionalProperties: false,
    example: { reason: 'CHANGED_MIND' }
  } as const

  const tripRequestBodySchema = {
    oneOf: [
      {
        type: 'object',
        required: ['pickupLat','pickupLng','dropoffLat','dropoffLng'],
        properties: {
          city: { type: 'string', example: 'Guayaquil' },
          pickupLat: { type: 'number', example: -2.170 },
          pickupLng: { type: 'number', example: -79.922 },
          dropoffLat: { type: 'number', example: -2.190 },
          dropoffLng: { type: 'number', example: -79.890 },
          distanceKm: { type: 'number', example: 6.5 },
          durationMin: { type: 'integer', example: 18 },
          // Admin-only overrides (opcional)
          searchRadiusM: { type: 'integer', example: 3000, description: 'Solo ADMIN. Radio de bÃºsqueda en metros (500-20000).' },
          locationMaxAgeMin: { type: 'integer', example: 5, description: 'Solo ADMIN. AntigÃ¼edad mÃ¡xima de ubicaciÃ³n en minutos (1-60).' },
        },
        additionalProperties: false,
      },
      {
        type: 'object',
        required: ['origin','destination'],
        properties: {
          city: { type: 'string', example: 'Guayaquil' },
          origin: coordSchema,
          destination: coordSchema,
          distanceKm: { type: 'number', example: 6.5 },
          durationMin: { type: 'integer', example: 18 },
          searchRadiusM: { type: 'integer', example: 3000, description: 'Solo ADMIN. Radio de bÃºsqueda en metros (500-20000).' },
          locationMaxAgeMin: { type: 'integer', example: 5, description: 'Solo ADMIN. AntigÃ¼edad mÃ¡xima de ubicaciÃ³n en minutos (1-60).' },
        },
        additionalProperties: false,
      },
    ],
    examples: [
      {
        city: 'Guayaquil',
        pickupLat: -2.17,
        pickupLng: -79.922,
        dropoffLat: -2.19,
        dropoffLng: -79.89,
        distanceKm: 6.5,
        durationMin: 18
      },
      {
        city: 'Guayaquil',
        origin: { lat: -2.17, lng: -79.922 },
        destination: { lat: -2.19, lng: -79.89 }
      }
    ]
  } as const
  const tripRequestResponseSchema = {
    type: 'object',
    properties: {
      ok: { type: 'boolean' },
      trip: tripSummarySchema,
      pricing: pricingSchema,
    },
    example: {
      ok: true,
      trip: { id: 'trp_123', status: 'ASSIGNED' },
      pricing: {
        baseFareUsd: 1.5,
        perKmUsd: 0.5,
        perMinUsd: 0.15,
        minFareUsd: 2.0,
        surgeMultiplier: 1.1,
        totalUsd: 7.8,
        breakdown: { base: 1.5, distance: 3.25, duration: 2.7, surge: 0.35 }
      }
    }
  } as const
  const getTripResponseSchema = {
    type: 'object',
    properties: {
      ok: { type: 'boolean' },
      trip: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          status: { type: 'string' },
          riderId: { type: 'string' },
          driverId: { type: 'string' },
          requestedAt: { type: 'string', format: 'date-time' },
          acceptedAt: { type: 'string', format: 'date-time', nullable: true },
          arrivedAt: { type: 'string', format: 'date-time', nullable: true },
          startedAt: { type: 'string', format: 'date-time', nullable: true },
          completedAt: { type: 'string', format: 'date-time', nullable: true },
          pickupLat: { type: 'number' },
          pickupLng: { type: 'number' },
          dropoffLat: { type: 'number' },
          dropoffLng: { type: 'number' },
          distanceKm: { type: 'number', nullable: true },
          durationMin: { type: 'integer', nullable: true },
          costUsd: { type: 'number', nullable: true },
          currency: { type: 'string', nullable: true },
        },
      },
    },
    example: {
      ok: true,
      trip: {
        id: 'trp_123',
        status: 'ASSIGNED',
        riderId: 'u_rider',
        driverId: 'u_driver',
        requestedAt: '2025-01-01T12:00:00.000Z',
        acceptedAt: null,
        arrivedAt: null,
        startedAt: null,
        completedAt: null,
        pickupLat: -2.17,
        pickupLng: -79.922,
        dropoffLat: -2.19,
        dropoffLng: -79.89,
        distanceKm: 6.5,
        durationMin: 18,
        costUsd: null,
        currency: 'USD'
      }
    }
  } as const

  // GET /trips/:id/sse (RIDER/DRIVER/ADMIN)
  app.get(
    '/trips/:id/sse',
    { schema: { tags: ['trips'], summary: 'SSE Trip stream', description: 'Stream de eventos en tiempo real del viaje (text/event-stream). Requiere JWT y ser dueÃ±o o ADMIN.', params: idParamSchema, response: { 200: { type: 'string', example: "data: {\"type\":\"INIT\",\"status\":\"ASSIGNED\",\"at\":\"2025-01-01T12:00:00.000Z\"}\n\n:data keep-alive\n\ndata: {\"type\":\"ACCEPTED\",\"status\":\"ACCEPTED\",\"at\":\"2025-01-01T12:00:10.000Z\"}\n\n" } } }, preHandler: app.auth.verifyJWT },
    async (req, reply) => {
      const user = (req as any).user as { id: string; role: 'ADMIN' | 'DRIVER' | 'RIDER' }
      const id = (req.params as any).id as string
      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      const isOwner = user.id === trip.riderId || user.id === trip.driverId
      const isAdmin = user.role === 'ADMIN'
      if (!isOwner && !isAdmin) return fail(reply, 403, 'Forbidden')

      reply.raw.setHeader('Content-Type', 'text/event-stream')
      reply.raw.setHeader('Cache-Control', 'no-cache, no-transform')
      reply.raw.setHeader('Connection', 'keep-alive')
      reply.raw.flushHeaders?.()

      const send = (ev: any) => {
        reply.raw.write(`data: ${JSON.stringify(ev)}\n\n`)
      }

      send({ type: 'INIT', status: trip.status, at: new Date().toISOString() })

      const unsubscribe = subscribeToTrip(id, (ev) => send(ev))
      incCounter('sse_connections')
      incCurrentSse()
      const ka = setInterval(() => reply.raw.write(`:ka\n\n`), 15000)

      req.raw.on('close', () => {
        clearInterval(ka)
        unsubscribe()
        decCurrentSse()
      })
    }
  )

  // POST /trips/request (RIDER)
  app.post(
    '/trips/request',
    { schema: { tags: ['trips'], summary: 'Solicitar viaje', description: 'Rider solicita un viaje. Acepta body nuevo (pickup*/dropoff*) o legacy (origin/destination). Devuelve el estimado preliminar y el trip ASSIGNED.', body: tripRequestBodySchema, response: { 200: tripRequestResponseSchema, 400: errorSchema } }, preHandler: app.auth.verifyJWT },
    async (req, reply) => {
      const riderId = (req as any).user?.id as string | undefined
      if (!riderId) return fail(reply, 401, 'Unauthorized')

      const b = (req.body || {}) as any
      const userRole = ((req as any).user?.role as 'ADMIN' | 'DRIVER' | 'RIDER' | undefined) || 'RIDER'
      const hasLegacy = b.origin && b.destination
      const pickupLat = hasLegacy ? Number(b.origin?.lat) : Number(b.pickupLat)
      const pickupLng = hasLegacy ? Number(b.origin?.lng) : Number(b.pickupLng)
      const dropoffLat = hasLegacy ? Number(b.destination?.lat) : Number(b.dropoffLat)
      const dropoffLng = hasLegacy ? Number(b.destination?.lng) : Number(b.dropoffLng)

      if (!Number.isFinite(pickupLat) || !Number.isFinite(pickupLng) || !Number.isFinite(dropoffLat) || !Number.isFinite(dropoffLng)) {
        return fail(reply, 400, 'Body invÃ¡lido')
      }

      // Determinar parÃ¡metros de matching (env por defecto; override solo ADMIN)
      let radiusM = MATCH_RADIUS_M
      let maxAgeMin = LOCATION_MAX_AGE_MIN
      if (userRole === 'ADMIN') {
        if (typeof b.searchRadiusM === 'number' && isFinite(b.searchRadiusM)) {
          const v = Math.max(500, Math.min(20000, Math.floor(b.searchRadiusM)))
          radiusM = v
        }
        if (typeof b.locationMaxAgeMin === 'number' && isFinite(b.locationMaxAgeMin)) {
          const v = Math.max(1, Math.min(60, Math.floor(b.locationMaxAgeMin)))
          maxAgeMin = v
        }
        if (radiusM !== MATCH_RADIUS_M || maxAgeMin !== LOCATION_MAX_AGE_MIN) {
          app.log.info({ radiusM, maxAgeMin, riderId, city: b?.city }, 'Using ADMIN overrides for matching')
        }
      }

      // PostGIS nearest driver by ST_Distance (fallbacks: Haversine, luego cualquier IDLE)
      let chosen: { id: string; userId: string } | null = null

      // Detectar PostGIS una sola vez por proceso
      if ((globalThis as any).__POSTGIS_AVAILABLE__ === undefined) {
        try {
          const chk = await prisma.$queryRaw<{ extname: string }[]>`SELECT extname FROM pg_extension WHERE extname='postgis'`
          ;(globalThis as any).__POSTGIS_AVAILABLE__ = Array.isArray(chk) && chk.length > 0
          if (!(globalThis as any).__POSTGIS_AVAILABLE__) {
            app.log.warn('PostGIS extension not available; using Haversine fallback')
          }
        } catch {
          ;(globalThis as any).__POSTGIS_AVAILABLE__ = false
          app.log.warn('PostGIS check failed; using Haversine fallback')
        }
      }

      if ((globalThis as any).__POSTGIS_AVAILABLE__) {
        try {
          const nearest = await prisma.$queryRaw<{ id: string; userId: string; meters: number }[]>`
            SELECT dp.id, dp."userId",
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
            chosen = { id: nearest[0].id, userId: nearest[0].userId }
            incCounter('matching_postgis')
          }
        } catch (e) {
          app.log.warn({ err: String(e) }, 'PostGIS query failed; using Haversine fallback')
        }
      }

      // Haversine fallback si no hay elegido aÃºn
      if (!chosen) {
        const cutoff = new Date(Date.now() - maxAgeMin * 60 * 1000)
        const candidates = await prisma.driverProfile.findMany({
          where: {
            status: 'IDLE',
            currentLat: { not: null },
            currentLng: { not: null },
            locationUpdatedAt: { gte: cutoff },
          },
          select: { id: true, userId: true, currentLat: true, currentLng: true },
          take: 200,
        })
        let bestDist = Number.POSITIVE_INFINITY
        for (const c of candidates) {
          const clat = Number(c.currentLat as any)
          const clng = Number(c.currentLng as any)
          if (!Number.isFinite(clat) || !Number.isFinite(clng)) continue
          const dKm = haversineKm(pickupLat, pickupLng, clat, clng)
          const dMeters = dKm * 1000
          if (dMeters <= radiusM && dMeters < bestDist) {
            bestDist = dMeters
            chosen = { id: c.id, userId: c.userId }
          }
        }
        if (chosen) incCounter('matching_haversine')
      }

      // Fallback final: cualquier IDLE
      if (!chosen) {
        const anyIdle = await prisma.driverProfile.findFirst({ where: { status: 'IDLE' }, select: { id: true, userId: true } })
        if (anyIdle) chosen = anyIdle
        if (chosen) incCounter('matching_idle_fallback')
      }
      if (!chosen) return fail(reply, 400, 'No hay conductores disponibles cerca')

      const distKm = Number.isFinite(b?.distanceKm) ? Number(b.distanceKm) : Number(haversineKm(pickupLat, pickupLng, dropoffLat, dropoffLng).toFixed(3))
      const durMin = Number.isFinite(b?.durationMin) ? Number(b.durationMin) : Math.max(1, Math.round((distKm / 25) * 60))

      const trip = await prisma.trip.create({
        data: {
          riderId,
          driverId: chosen.userId,
          status: 'ASSIGNED',
          pickupLat,
          pickupLng,
          dropoffLat,
          dropoffLng,
          distanceKm: distKm as any,
          durationMin: durMin,
          pricingSnapshot: { city: (b?.city as string) || 'Guayaquil' } as any,
        },
        select: { id: true, status: true },
      })

      const city = (b?.city as string) || 'Guayaquil'
      const pricing = await computeFare({ city, distanceKm: distKm, durationMin: durMin, requestedAt: new Date() })
      publishTripEvent(trip.id, { type: 'ASSIGNED', status: 'ASSIGNED', at: new Date().toISOString() })
      // Notificar al driver asignado
      await sendPushToUser(chosen.userId, {
        title: 'Nueva solicitud de viaje',
        body: 'Tienes un viaje asignado',
        data: { tripId: trip.id, type: 'ASSIGNED' },
      })
      return reply.send({ ok: true, trip, pricing })
    }
  )

  // GET /trips/:id (RIDER/DRIVER/ADMIN)
  app.get(
    '/trips/:id',
    { schema: { tags: ['trips'], summary: 'Obtener viaje', description: 'Devuelve el estado actual del viaje. Accesible por rider/driver dueÃ±os o ADMIN.', params: idParamSchema, response: { 200: getTripResponseSchema, 403: errorSchema, 404: errorSchema } }, preHandler: app.auth.verifyJWT },
    async (req, reply) => {
      const user = (req as any).user as { id: string; role: 'ADMIN' | 'DRIVER' | 'RIDER' }
      const id = (req.params as any).id as string
      const trip = await prisma.trip.findUnique({
        where: { id },
        select: {
          id: true,
          status: true,
          riderId: true,
          driverId: true,
          requestedAt: true,
          acceptedAt: true,
          arrivedAt: true,
          startedAt: true,
          completedAt: true,
          pickupLat: true,
          pickupLng: true,
          dropoffLat: true,
          dropoffLng: true,
          distanceKm: true,
          durationMin: true,
          costUsd: true,
          currency: true,
        },
      })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      const isOwner = user.id === trip.riderId || user.id === trip.driverId
      const isAdmin = user.role === 'ADMIN'
      if (!isOwner && !isAdmin) return fail(reply, 403, 'Forbidden')
      return reply.send({ ok: true, trip })
    }
  )

  // POST /trips/:id/accept (DRIVER)
  app.post(
    '/trips/:id/accept',
    { schema: { tags: ['trips'], summary: 'Aceptar viaje', description: 'Driver acepta un viaje ASSIGNED que le fue asignado.', params: idParamSchema, response: { 200: okSchema, 400: errorSchema, 402: errorSchema, 403: errorSchema, 404: errorSchema } }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
      const id = (req.params as any).id as string
      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
      if (trip.status !== 'ASSIGNED') return fail(reply, 400, 'Estado invÃ¡lido para aceptar')
      await prisma.trip.update({ where: { id }, data: { status: 'ACCEPTED', acceptedAt: new Date() } })
      publishTripEvent(id, { type: 'ACCEPTED', status: 'ACCEPTED', at: new Date().toISOString() })
      // Notificar al rider que el driver aceptÃ³
      await sendPushToUser(trip.riderId, {
        title: 'Conductor aceptÃ³ tu viaje',
        body: 'Tu viaje fue aceptado',
        data: { tripId: trip.id, type: 'ACCEPTED' },
      })
      return reply.send({ ok: true })
    }
  )

  // POST /trips/:id/arrive (DRIVER)
  app.post(
    '/trips/:id/arrive',
    { schema: { tags: ['trips'], summary: 'Driver llegÃ³ al pickup', description: 'Marca el viaje como ARRIVED cuando el driver llega al punto de recogida.', params: idParamSchema, response: { 200: okSchema, 400: errorSchema, 402: errorSchema, 403: errorSchema, 404: errorSchema } }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
      const id = (req.params as any).id as string
      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
      if (trip.status !== 'ACCEPTED') return fail(reply, 400, 'Estado invÃ¡lido para llegar')
      await prisma.trip.update({ where: { id }, data: { status: 'ARRIVED', arrivedAt: new Date() } })
      publishTripEvent(id, { type: 'ARRIVED', status: 'ARRIVED', at: new Date().toISOString() })
      await sendPushToUser(trip.riderId, {
        title: 'Conductor ha llegado',
        body: 'Tu conductor estÃ¡ en el punto de recogida',
        data: { tripId: trip.id, type: 'ARRIVED' },
      })
      return reply.send({ ok: true })
    }
  )

  // POST /trips/:id/start (DRIVER)
  app.post(
    '/trips/:id/start',
    { schema: { tags: ['trips'], summary: 'Iniciar viaje', description: 'Driver inicia el viaje (estado STARTED). Si method=CARD intenta preautorizar con Stripe.', params: idParamSchema, body: { oneOf: [ { type: 'object', properties: { method: { type: 'string', enum: ['CASH','CARD','TRANSFER'], example: 'CARD' } }, additionalProperties: false }, { type: 'null' } ] }, response: { 200: okSchema, 400: errorSchema, 402: errorSchema, 403: errorSchema, 404: errorSchema } }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
      const id = (req.params as any).id as string
      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
      if (trip.status !== 'ARRIVED') return fail(reply, 400, 'Estado invÃ¡lido para iniciar')
      await prisma.trip.update({ where: { id }, data: { status: 'STARTED', startedAt: new Date() } })
      publishTripEvent(id, { type: 'STARTED', status: 'STARTED', at: new Date().toISOString() })
      await sendPushToUser(trip.riderId, {
        title: 'Viaje iniciado',
        body: 'Tu viaje ha comenzado',
        data: { tripId: trip.id, type: 'STARTED' },
      })
      return reply.send({ ok: true })
    }
  )

  // POST /trips/:id/complete (DRIVER)
  app.post(
    '/trips/:id/complete',
    { schema: { tags: ['trips'], summary: 'Completar viaje', description: 'Driver completa el viaje. Calcula y persiste costo final, crea Payment, y responde pricing aplicado. Si method=CARD puede confirmar con paymentMethodId o devolver clientSecret.', params: idParamSchema, body: { oneOf: [ { type: 'object', properties: { method: { type: 'string', enum: ['CASH','CARD','TRANSFER'], example: 'CASH' }, paymentMethodId: { type: 'string', example: 'pm_card_visa' } }, additionalProperties: false }, { type: 'null' } ] }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: tripSummarySchema, pricing: pricingSchema, clientSecret: { type: 'string', nullable: true } } }, 400: errorSchema, 403: errorSchema, 404: errorSchema } }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
      const id = (req.params as any).id as string
      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
      if (trip.status !== 'STARTED') return fail(reply, 400, 'Estado invÃ¡lido para completar')

      const distanceKm = Number(trip.distanceKm ?? haversineKm(
        Number(trip.pickupLat) as any,
        Number(trip.pickupLng) as any,
        Number(trip.dropoffLat) as any,
        Number(trip.dropoffLng) as any,
      ))
      const durationMin = Number(trip.durationMin ?? Math.max(1, Math.round((distanceKm / 25) * 60)))
      const city = (trip as any).pricingSnapshot?.city || 'Guayaquil'
      const pricing = await computeFare({ city, distanceKm, durationMin, requestedAt: trip.startedAt ?? undefined })

      const updated = await prisma.trip.update({
        where: { id },
        data: {
          status: 'COMPLETED',
          completedAt: new Date(),
          costUsd: pricing.totalUsd as any,
          currency: 'USD',
          pricingSnapshot: { city, pricing } as any,
        },
        select: { id: true, status: true },
      })
      const method = ((req.body as any)?.method as string | undefined) || 'CASH'
      let clientSecret: string | null = null
      if (method === 'CARD') {
        const { getStripe } = require('../../services/stripe.service')
        const stripe = getStripe()
        const { makeKey, withRetry, reqOpts } = require('../../services/stripe.idempotency')
        if (!stripe) {
          await prisma.payment.create({ data: { tripId: id, amountUsd: pricing.totalUsd as any, status: 'AUTHORIZED', method, provider: 'Stripe' } })
        } else {
          const amountCents = Math.round(Number(pricing.totalUsd) * 100)
          try {
            const existing = await prisma.payment.findUnique({ where: { tripId: id } })
            if (existing?.provider === 'Stripe' && existing?.status === 'AUTHORIZED' && existing?.externalId) {
              const captured = await withRetry(() => stripe.paymentIntents.capture(
                existing.externalId,
                { amount_to_capture: amountCents },
                reqOpts(makeKey(['pi_capture', id, amountCents]))
              ))
              await prisma.payment.update({ where: { tripId: id }, data: { status: captured.status === 'succeeded' ? 'PAID' : 'AUTHORIZED', amountUsd: pricing.totalUsd as any, externalId: captured.id } })
            } else {
              const pmId = (req.body as any)?.paymentMethodId as string | undefined
              if (pmId) {
                const intent = await withRetry(() => stripe.paymentIntents.create(
                  { amount: amountCents, currency: 'usd', payment_method: pmId, confirm: true, metadata: { tripId: id } },
                  reqOpts(makeKey(['pi_create_confirm', id, amountCents, pmId]))
                ))
                await prisma.payment.upsert({ where: { tripId: id }, update: { amountUsd: pricing.totalUsd as any, status: intent.status === 'succeeded' ? 'PAID' : 'AUTHORIZED', method, provider: 'Stripe', externalId: intent.id }, create: { tripId: id, amountUsd: pricing.totalUsd as any, status: intent.status === 'succeeded' ? 'PAID' : 'AUTHORIZED', method, provider: 'Stripe', externalId: intent.id } })
              } else {
                const intent = await withRetry(() => stripe.paymentIntents.create(
                  { amount: amountCents, currency: 'usd', metadata: { tripId: id } },
                  reqOpts(makeKey(['pi_create', id, amountCents]))
                ))
                clientSecret = intent.client_secret || null
                await prisma.payment.upsert({ where: { tripId: id }, update: { amountUsd: pricing.totalUsd as any, status: 'AUTHORIZED', method, provider: 'Stripe', externalId: intent.id }, create: { tripId: id, amountUsd: pricing.totalUsd as any, status: 'AUTHORIZED', method, provider: 'Stripe', externalId: intent.id } })
              }
            }
          } catch {
            await prisma.payment.upsert({ where: { tripId: id }, update: { status: 'FAILED' }, create: { tripId: id, amountUsd: pricing.totalUsd as any, status: 'FAILED', method, provider: 'Stripe' } })
          }
        }
      } else {
        await prisma.payment.create({ data: { tripId: id, amountUsd: pricing.totalUsd as any, status: method === 'CASH' ? 'PAID' : 'AUTHORIZED', method, provider: method === 'TRANSFER' ? 'Bank' : null } })
      }
      await sendPushToUser(trip.riderId, {
        title: 'Viaje completado',
        body: `Total: $${pricing.totalUsd.toFixed(2)}`,
        data: { tripId: trip.id, type: 'COMPLETED' },
      })
      publishTripEvent(id, { type: 'COMPLETED', status: 'COMPLETED', at: new Date().toISOString(), data: { totalUsd: pricing.totalUsd } })
      return reply.send({ ok: true, trip: updated, pricing, clientSecret })
    }
  )

  // Alias for arrived
  app.post(
    '/trips/:id/arrived',
    { schema: { tags: ['trips'], summary: 'Alias de arrive', description: 'Alias de /trips/:id/arrive para compatibilidad.', params: idParamSchema, response: { 200: okSchema, 400: errorSchema, 402: errorSchema, 403: errorSchema, 404: errorSchema } }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
      const id = (req.params as any).id as string
      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
      if (trip.status !== 'ACCEPTED') return fail(reply, 400, 'Estado invÃ¡lido para llegar')
      await prisma.trip.update({ where: { id }, data: { status: 'ARRIVED', arrivedAt: new Date() } })
      return reply.send({ ok: true })
    }
  )

  // POST /trips/:id/cancel (RIDER/ADMIN)
  app.post(
    '/trips/:id/cancel',
    { schema: { tags: ['trips'], summary: 'Cancelar viaje (rider)', description: 'Rider cancela un viaje no iniciado. Puede aplicar tarifa de cancelación según ciudad/estado del viaje.', params: idParamSchema, body: cancelBodySchema, response: { 200: okSchema, 400: errorSchema, 403: errorSchema, 404: errorSchema } }, preHandler: app.auth.verifyJWT },
    async (req, reply) => {
      const user = (req as any).user as { id: string; role: 'ADMIN' | 'DRIVER' | 'RIDER' }
      const id = (req.params as any).id as string
      const reason = ((req.body as any)?.reason as string | undefined) || 'RIDER_CANCELED'
      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      const isOwner = user.id === trip.riderId || user.role === 'ADMIN'
      if (!isOwner) return fail(reply, 403, 'Forbidden')
      if (trip.status === 'STARTED' || trip.status === 'COMPLETED') return fail(reply, 400, 'No se puede cancelar en este estado')
      // Compute cancellation fee (override by city TariffRule if present)
      let feeUsd = 0
      try {
        const { env } = require('../../config/env')
        const now = Date.now()
        // Determine city from pricingSnapshot
        const city = ((trip as any).pricingSnapshot as any)?.city as string | undefined
        let graceSec = Number(env.cancellationFeeGraceSec || 0)
        let feeAccepted = Number(env.cancellationFeeAcceptedUsd || 0)
        let feeArrived = Number(env.cancellationFeeArrivedUsd || 0)
        if (city) {
          const rule = await prisma.tariffRule.findFirst({ where: { city, active: true }, orderBy: { updatedAt: 'desc' } })
          if (rule) {
            graceSec = Number((rule as any).cancellationGraceSec ?? graceSec)
            feeAccepted = Number((rule as any).cancellationFeeAcceptedUsd ?? feeAccepted)
            feeArrived = Number((rule as any).cancellationFeeArrivedUsd ?? feeArrived)
          }
        }
        if (trip.status === 'ARRIVED') {
          feeUsd = feeArrived
        } else if (trip.status === 'ACCEPTED' && (trip as any).acceptedAt) {
          const ageSec = Math.floor((now - new Date((trip as any).acceptedAt as any).getTime()) / 1000)
          if (ageSec > graceSec) {
            feeUsd = feeAccepted
          }
        }
      } catch {}

      await prisma.trip.update({ where: { id }, data: { status: 'CANCELED', canceledAt: new Date(), cancelReason: `RIDER:${reason}` } })
      publishTripEvent(id, { type: 'CANCELED', status: 'CANCELED', at: new Date().toISOString(), data: { reason: `RIDER:${reason}` } })
      if (trip.driverId) {
        await sendPushToUser(trip.driverId, { title: 'Viaje cancelado', body: 'El usuario canceló el viaje.' })
      }
      // Attempt to charge cancellation fee
      if (feeUsd > 0) {
        try {
          const { getStripe } = require('../../services/stripe.service')
          const { makeKey, withRetry, reqOpts } = require('../../services/stripe.idempotency')
          const stripe = getStripe()
          const rider = await prisma.user.findUnique({ where: { id: trip.riderId }, select: { stripeCustomerId: true, stripeDefaultPaymentMethodId: true } as any })
          if (stripe && (rider as any)?.stripeCustomerId && (rider as any)?.stripeDefaultPaymentMethodId) {
            const amountCents = Math.max(1, Math.round(Number(feeUsd) * 100))
            const intent = await withRetry(() => stripe.paymentIntents.create(
              {
                amount: amountCents,
                currency: 'usd',
                customer: (rider as any).stripeCustomerId,
                payment_method: (rider as any).stripeDefaultPaymentMethodId,
                confirm: true,
                metadata: { tripId: id, type: 'CANCELLATION_FEE' },
              },
              reqOpts(makeKey(['cancel_fee', id, amountCents]))
            ))
            await prisma.payment.upsert({
              where: { tripId: id },
              update: { amountUsd: feeUsd as any, status: intent.status === 'succeeded' ? 'PAID' : 'FAILED', method: 'CARD', provider: 'Stripe', externalId: intent.id },
              create: { tripId: id, amountUsd: feeUsd as any, status: intent.status === 'succeeded' ? 'PAID' : 'FAILED', method: 'CARD', provider: 'Stripe', externalId: intent.id },
            })
            await sendPushToUser(trip.riderId, { title: 'Tarifa de cancelación', body: `Se cobró $${feeUsd.toFixed(2)} por cancelación.` })
          } else {
            await prisma.payment.upsert({
              where: { tripId: id },
              update: { amountUsd: feeUsd as any, status: 'AUTHORIZED', method: 'CASH', provider: null },
              create: { tripId: id, amountUsd: feeUsd as any, status: 'AUTHORIZED', method: 'CASH', provider: null },
            })
          }
        } catch (e) {
          req.log?.warn?.({ err: String(e) }, 'cancel fee charge failed')
        }
      }
      return reply.send({ ok: true })
    }
  )

  // POST /trips/:id/driver-cancel (DRIVER)
  app.post(
    '/trips/:id/driver-cancel',
    { schema: { tags: ['trips'], summary: 'Cancelar viaje (driver)', description: 'Driver cancela un viaje aún no iniciado. No aplica tarifa al rider.', params: idParamSchema, body: cancelBodySchema, response: { 200: okSchema, 400: errorSchema, 403: errorSchema, 404: errorSchema } }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
      const id = (req.params as any).id as string
      const reason = ((req.body as any)?.reason as string | undefined) || 'DRIVER_CANCELED'
      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
      if (trip.status === 'STARTED' || trip.status === 'COMPLETED') return fail(reply, 400, 'No se puede cancelar en este estado')
      await prisma.trip.update({ where: { id }, data: { status: 'CANCELED', canceledAt: new Date(), cancelReason: `DRIVER:${reason}` } })
      publishTripEvent(id, { type: 'CANCELED', status: 'CANCELED', at: new Date().toISOString(), data: { reason: `DRIVER:${reason}` } })
      await sendPushToUser(trip.riderId, { title: 'Conductor canceló', body: 'Busca otro conductor disponible.' })
      return reply.send({ ok: true })
    }
  )
}
