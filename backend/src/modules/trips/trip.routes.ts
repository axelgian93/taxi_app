import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import prisma from '../../lib/prisma'
import { computeFare } from '../../services/pricing.service'

const requestBody = {
  type: 'object',
  required: ['city', 'pickupLat', 'pickupLng', 'dropoffLat', 'dropoffLng', 'distanceKm', 'durationMin'],
  properties: {
    city: { type: 'string' },
    pickupLat: { type: 'number' },
    pickupLng: { type: 'number' },
    pickupAddress: { type: 'string' },
    dropoffLat: { type: 'number' },
    dropoffLng: { type: 'number' },
    dropoffAddress: { type: 'string' },
    distanceKm: { type: 'number' },
    durationMin: { type: 'number' }
  }
} as const

const tripResponse = {
  type: 'object',
  properties: {
    ok: { type: 'boolean' },
    trip: {
      type: 'object',
      properties: { id: { type: 'string' }, status: { type: 'string' } }
    },
    pricing: { type: 'object', additionalProperties: true }
  }
} as const

const idParams = {
  type: 'object',
  required: ['id'],
  properties: { id: { type: 'string' } }
} as const

export default async function tripRoutes(app: FastifyInstance) {
  app.post(
    '/trips/request',
    {
      schema: {
        tags: ['trips'],
        security: [{ bearerAuth: [] }],
        body: requestBody,
        response: { 200: tripResponse, 400: { type: 'object', properties: { error: { type: 'string' } } } }
      }
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const user = (req as any).user || { id: (req.headers['x-user-id'] as string) || 'u_rider' }
      const body = req.body as {
        city: string
        pickupLat: number; pickupLng: number; pickupAddress?: string
        dropoffLat: number; dropoffLng: number; dropoffAddress?: string
        distanceKm: number; durationMin: number
      }

      const near = await prisma.driverProfile.findFirst({
        where: { status: 'IDLE' as any },
        orderBy: { updatedAt: 'desc' }
      })
      if (!near) return reply.code(409).send({ error: 'No hay conductores disponibles cerca' })

      const pricing = await computeFare({
        city: body.city,
        distanceKm: body.distanceKm,
        durationMin: body.durationMin,
        requestedAt: new Date()
      })

      const vehicle = await prisma.vehicle.findFirst({ where: { driverId: near.id } })

      const trip = await prisma.trip.create({
        data: {
          riderId: user.id,
          driverId: near.userId,
          vehicleId: vehicle?.id ?? null,
          status: 'ASSIGNED' as any,
          requestedAt: new Date(),
          distanceKm: body.distanceKm,
          durationMin: body.durationMin,
          costUsd: Number((pricing as any).totalUsd ?? (pricing as any).total ?? 0),
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

      await prisma.driverProfile.update({ where: { id: near.id }, data: { status: 'ON_TRIP' as any } })
      return reply.send({ ok: true, trip: { id: trip.id, status: trip.status }, pricing })
    }
  )

  const simpleActionResponse = {
    200: { type: 'object', properties: { ok: { type: 'boolean' }, status: { type: 'string' } } },
    404: { type: 'object', properties: { error: { type: 'string' } } }
  } as const

  app.post(
    '/trips/:id/accept',
    { schema: { tags: ['trips'], security: [{ bearerAuth: [] }], params: idParams, response: simpleActionResponse } },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { id } = req.params as { id: string }
      const t = await prisma.trip.update({ where: { id }, data: { status: 'ACCEPTED' as any } })
      return reply.send({ ok: true, status: t.status })
    }
  )

  app.post(
    '/trips/:id/arrived',
    { schema: { tags: ['trips'], security: [{ bearerAuth: [] }], params: idParams, response: simpleActionResponse } },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { id } = req.params as { id: string }
      const t = await prisma.trip.update({ where: { id }, data: { status: 'ARRIVED' as any } })
      return reply.send({ ok: true, status: t.status })
    }
  )

  app.post(
    '/trips/:id/start',
    { schema: { tags: ['trips'], security: [{ bearerAuth: [] }], params: idParams, response: simpleActionResponse } },
    async (req: FastifyRequest, reply: FastifyReply) => {
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
    { schema: { tags: ['trips'], security: [{ bearerAuth: [] }], params: idParams, response: simpleActionResponse } },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { id } = req.params as { id: string }
      const t = await prisma.trip.update({
        where: { id },
        data: { status: 'COMPLETED' as any, completedAt: new Date() }
      })
      return reply.send({ ok: true, status: t.status })
    }
  )
}
