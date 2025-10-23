import { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import { computeFare } from '../../services/pricing.service'

/** Enums documentados */
const TripStatusEnum = [
  'ASSIGNED',
  'ACCEPTED',
  'ARRIVED',
  'ONGOING',
  'COMPLETED',
  'CANCELED'
] as const

/** Schemas */
const requestBody = {
  type: 'object',
  required: [
    'city',
    'pickupLat',
    'pickupLng',
    'dropoffLat',
    'dropoffLng',
    'distanceKm',
    'durationMin'
  ],
  properties: {
    city: { type: 'string', examples: ['Guayaquil'] },
    pickupLat: { type: 'number', examples: [-2.170] },
    pickupLng: { type: 'number', examples: [-79.922] },
    pickupAddress: { type: 'string', examples: ['Centro'] },
    dropoffLat: { type: 'number', examples: [-2.190] },
    dropoffLng: { type: 'number', examples: [-79.890] },
    dropoffAddress: { type: 'string', examples: ['Norte'] },
    distanceKm: { type: 'number', examples: [5.5] },
    durationMin: { type: 'number', examples: [16] }
  },
  additionalProperties: false
} as const

const tripSummary = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    status: { type: 'string', enum: TripStatusEnum }
  }
} as const

const tripCreateResponse = {
  200: {
    type: 'object',
    properties: {
      ok: { type: 'boolean' },
      trip: tripSummary,
      pricing: { type: 'object', additionalProperties: true }
    },
    examples: [
      {
        ok: true,
        trip: { id: 'trip_123', status: 'ASSIGNED' },
        pricing: { baseFareUsd: 1.5, perKmUsd: 0.5, totalUsd: 5.2 }
      }
    ]
  },
  400: { type: 'object', properties: { error: { type: 'string' } } },
  401: { type: 'object', properties: { error: { type: 'string' } } },
  409: { type: 'object', properties: { error: { type: 'string' } } },
  422: { type: 'object', properties: { error: { type: 'string' } } }
} as const

const idParams = {
  type: 'object',
  required: ['id'],
  properties: { id: { type: 'string' } }
} as const

const simpleActionResponse = {
  200: {
    type: 'object',
    properties: {
      ok: { type: 'boolean' },
      status: { type: 'string', enum: TripStatusEnum }
    }
  },
  401: { type: 'object', properties: { error: { type: 'string' } } },
  404: { type: 'object', properties: { error: { type: 'string' } } }
} as const

export default async function tripRoutes(app: FastifyInstance) {
  // Crear solicitud de viaje
  app.post(
    '/trips/request',
    {
      schema: {
        tags: ['trips'],
        summary: 'Solicita un viaje y asigna el driver disponible más cercano',
        security: [{ bearerAuth: [] }],
        body: requestBody,
        response: tripCreateResponse
      }
    },
    async (req, reply) => {
      const user = (req as any).user || { id: (req.headers['x-user-id'] as string) || 'u_rider' }

      const body = req.body as {
        city: string
        pickupLat: number
        pickupLng: number
        pickupAddress?: string
        dropoffLat: number
        dropoffLng: number
        dropoffAddress?: string
        distanceKm: number
        durationMin: number
      }

      // Driver cercano (simple): último IDLE
      const near = await prisma.driverProfile.findFirst({
        where: { status: 'IDLE' as any },
        orderBy: { updatedAt: 'desc' }
      })
      if (!near) return reply.code(409).send({ error: 'No hay conductores disponibles cerca' })

      // Calcular tarifa
      const pricing = await computeFare({
        city: body.city,
        distanceKm: body.distanceKm,
        durationMin: body.durationMin,
        requestedAt: new Date()
      })

      // Vehículo del driver (si existiera)
      const veh = await prisma.vehicle.findFirst({ where: { driverId: near.id } })

      // Crear trip
      const trip = await prisma.trip.create({
        data: {
          riderId: user.id,
          driverId: near.userId,
          vehicleId: veh?.id ?? null,
          status: 'ASSIGNED' as any,
          requestedAt: new Date(),
          distanceKm: body.distanceKm,
          durationMin: body.durationMin,
          costUsd: Number(
            ((pricing as any).totalUsd ?? (pricing as any).total ?? 0).toFixed
              ? ((pricing as any).totalUsd ?? (pricing as any).total ?? 0).toFixed(2)
              : (pricing as any).totalUsd ?? (pricing as any).total ?? 0
          ),
          currency: 'USD',
          pickupLat: body.pickupLat,
          pickupLng: body.pickupLng,
          pickupAddress: body.pickupAddress ?? 'Pickup',
          dropoffLat: body.dropoffLat,
          dropoffLng: body.dropoffLng,
          dropoffAddress: body.dropoffAddress ?? 'Dropoff',
          pricingSnapshot: pricing as any
        }
      })

      // Poner driver en ON_TRIP
      await prisma.driverProfile.update({
        where: { id: near.id },
        data: { status: 'ON_TRIP' as any }
      })

      return reply.send({ ok: true, trip: { id: trip.id, status: trip.status }, pricing })
    }
  )

  // Acciones del driver (sin body)
  app.post(
    '/trips/:id/accept',
    {
      schema: {
        tags: ['trips'],
        summary: 'Driver acepta el viaje',
        security: [{ bearerAuth: [] }],
        params: idParams,
        response: simpleActionResponse
      }
    },
    async (req, reply) => {
      const { id } = req.params as { id: string }
      const t = await prisma.trip.update({ where: { id }, data: { status: 'ACCEPTED' as any } })
      return reply.send({ ok: true, status: t.status })
    }
  )

  app.post(
    '/trips/:id/arrived',
    {
      schema: {
        tags: ['trips'],
        summary: 'Driver llegó al punto de recogida',
        security: [{ bearerAuth: [] }],
        params: idParams,
        response: simpleActionResponse
      }
    },
    async (req, reply) => {
      const { id } = req.params as { id: string }
      const t = await prisma.trip.update({ where: { id }, data: { status: 'ARRIVED' as any } })
      return reply.send({ ok: true, status: t.status })
    }
  )

  app.post(
    '/trips/:id/start',
    {
      schema: {
        tags: ['trips'],
        summary: 'Driver inicia el viaje',
        security: [{ bearerAuth: [] }],
        params: idParams,
        response: simpleActionResponse
      }
    },
    async (req, reply) => {
      const { id } = req.params as { id: string }
      const t = await prisma.trip.update({
        where: { id },
        data: { status: 'ONGOING' as any, startedAt: new Date() }
      })
      return reply.send({ ok: true, status: t.status })
    }
  )

  app.post(
    '/trips/:id/complete',
    {
      schema: {
        tags: ['trips'],
        summary: 'Driver completa el viaje',
        security: [{ bearerAuth: [] }],
        params: idParams,
        response: simpleActionResponse
      }
    },
    async (req, reply) => {
      const { id } = req.params as { id: string }
      const t = await prisma.trip.update({
        where: { id },
        data: { status: 'COMPLETED' as any, completedAt: new Date() }
      })
      return reply.send({ ok: true, status: t.status })
    }
  )
}
