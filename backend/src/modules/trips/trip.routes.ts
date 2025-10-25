// src/modules/trips/trip.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import { computeFare } from '../../services/pricing.service'
import { haversineKm } from '../../utils/geo'
import { sendPushToUser } from '../../services/push.service'

function fail(reply: any, code: number, msg: string) {
  return reply.code(code).send({ error: msg })
}

export default async function tripRoutes(app: FastifyInstance) {
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

  // POST /trips/request (RIDER)
  app.post(
    '/trips/request',
    { schema: { tags: ['trips'], summary: 'Solicitar viaje', description: 'Rider solicita un viaje. Acepta body nuevo (pickup*/dropoff*) o legacy (origin/destination). Devuelve el estimado preliminar y el trip ASSIGNED.', body: tripRequestBodySchema, response: { 200: tripRequestResponseSchema, 400: errorSchema } }, preHandler: app.auth.verifyJWT },
    async (req, reply) => {
      const riderId = (req as any).user?.id as string | undefined
      if (!riderId) return fail(reply, 401, 'Unauthorized')

      const b = (req.body || {}) as any
      const hasLegacy = b.origin && b.destination
      const pickupLat = hasLegacy ? Number(b.origin?.lat) : Number(b.pickupLat)
      const pickupLng = hasLegacy ? Number(b.origin?.lng) : Number(b.pickupLng)
      const dropoffLat = hasLegacy ? Number(b.destination?.lat) : Number(b.dropoffLat)
      const dropoffLng = hasLegacy ? Number(b.destination?.lng) : Number(b.dropoffLng)

      if (!Number.isFinite(pickupLat) || !Number.isFinite(pickupLng) || !Number.isFinite(dropoffLat) || !Number.isFinite(dropoffLng)) {
        return fail(reply, 400, 'Body inválido')
      }

      // Find nearest IDLE driver (by last reported location)
      const candidates = await prisma.driverProfile.findMany({
        where: { status: 'IDLE', currentLat: { not: null }, currentLng: { not: null } },
        select: { id: true, userId: true, currentLat: true, currentLng: true, locationUpdatedAt: true },
        orderBy: { locationUpdatedAt: 'desc' },
        take: 100,
      })

      let chosen: { id: string; userId: string } | null = null
      if (candidates.length > 0) {
        let best = { d: Number.POSITIVE_INFINITY, idx: -1 }
        for (let i = 0; i < candidates.length; i++) {
          const c = candidates[i]
          const clat = Number(c.currentLat as any)
          const clng = Number(c.currentLng as any)
          if (!Number.isFinite(clat) || !Number.isFinite(clng)) continue
          const d = haversineKm(pickupLat, pickupLng, clat, clng)
          if (d < best.d) best = { d, idx: i }
        }
        if (best.idx >= 0) {
          const c = candidates[best.idx]
          chosen = { id: c.id, userId: c.userId }
        }
      }
      if (!chosen) {
        const anyIdle = await prisma.driverProfile.findFirst({ where: { status: 'IDLE' }, select: { id: true, userId: true } })
        if (anyIdle) chosen = anyIdle
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
    { schema: { tags: ['trips'], summary: 'Obtener viaje', description: 'Devuelve el estado actual del viaje. Accesible por rider/driver dueños o ADMIN.', params: idParamSchema, response: { 200: getTripResponseSchema, 403: errorSchema, 404: errorSchema } }, preHandler: app.auth.verifyJWT },
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
    { schema: { tags: ['trips'], summary: 'Aceptar viaje', description: 'Driver acepta un viaje ASSIGNED que le fue asignado.', params: idParamSchema, response: { 200: okSchema, 400: errorSchema, 403: errorSchema, 404: errorSchema } }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
      const id = (req.params as any).id as string
      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
      if (trip.status !== 'ASSIGNED') return fail(reply, 400, 'Estado inválido para aceptar')
      await prisma.trip.update({ where: { id }, data: { status: 'ACCEPTED', acceptedAt: new Date() } })
      // Notificar al rider que el driver aceptó
      await sendPushToUser(trip.riderId, {
        title: 'Conductor aceptó tu viaje',
        body: 'Tu viaje fue aceptado',
        data: { tripId: trip.id, type: 'ACCEPTED' },
      })
      return reply.send({ ok: true })
    }
  )

  // POST /trips/:id/arrive (DRIVER)
  app.post(
    '/trips/:id/arrive',
    { schema: { tags: ['trips'], summary: 'Driver llegó al pickup', description: 'Marca el viaje como ARRIVED cuando el driver llega al punto de recogida.', params: idParamSchema, response: { 200: okSchema, 400: errorSchema, 403: errorSchema, 404: errorSchema } }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
      const id = (req.params as any).id as string
      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
      if (trip.status !== 'ACCEPTED') return fail(reply, 400, 'Estado inválido para llegar')
      await prisma.trip.update({ where: { id }, data: { status: 'ARRIVED', arrivedAt: new Date() } })
      await sendPushToUser(trip.riderId, {
        title: 'Conductor ha llegado',
        body: 'Tu conductor está en el punto de recogida',
        data: { tripId: trip.id, type: 'ARRIVED' },
      })
      return reply.send({ ok: true })
    }
  )

  // POST /trips/:id/start (DRIVER)
  app.post(
    '/trips/:id/start',
    { schema: { tags: ['trips'], summary: 'Iniciar viaje', description: 'Driver inicia el viaje (estado STARTED).', params: idParamSchema, response: { 200: okSchema, 400: errorSchema, 403: errorSchema, 404: errorSchema } }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
      const id = (req.params as any).id as string
      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
      if (trip.status !== 'ARRIVED') return fail(reply, 400, 'Estado inválido para iniciar')
      await prisma.trip.update({ where: { id }, data: { status: 'STARTED', startedAt: new Date() } })
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
    { schema: { tags: ['trips'], summary: 'Completar viaje', description: 'Driver completa el viaje. Calcula y persiste costo final y responde con pricing aplicado.', params: idParamSchema, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, trip: tripSummarySchema, pricing: pricingSchema } }, 400: errorSchema, 403: errorSchema, 404: errorSchema } }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
      const id = (req.params as any).id as string
      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
      if (trip.status !== 'STARTED') return fail(reply, 400, 'Estado inválido para completar')

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
      await sendPushToUser(trip.riderId, {
        title: 'Viaje completado',
        body: `Total: $${pricing.totalUsd.toFixed(2)}`,
        data: { tripId: trip.id, type: 'COMPLETED' },
      })
      return reply.send({ ok: true, trip: updated, pricing })
    }
  )

  // Alias for arrived
  app.post(
    '/trips/:id/arrived',
    { schema: { tags: ['trips'], summary: 'Alias de arrive', description: 'Alias de /trips/:id/arrive para compatibilidad.', params: idParamSchema, response: { 200: okSchema, 400: errorSchema, 403: errorSchema, 404: errorSchema } }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
      const id = (req.params as any).id as string
      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
      if (trip.status !== 'ACCEPTED') return fail(reply, 400, 'Estado inválido para llegar')
      await prisma.trip.update({ where: { id }, data: { status: 'ARRIVED', arrivedAt: new Date() } })
      return reply.send({ ok: true })
    }
  )
}
