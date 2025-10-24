import { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import { requestTripBody, tripResponse, errorResponse } from './trip.schemas'
import { computeFare } from '../../services/pricing.service'

export default async function tripRoutes(app: FastifyInstance) {
  app.post('/trips/request', {
    schema: {
      tags: ['trips'],
      body: requestTripBody,
      response: { 200: tripResponse, 400: errorResponse, 409: errorResponse }
    }
  }, async (req, reply) => {
    const userId = (req.headers['x-user-id'] as string) || 'u_rider'
    const rider = await prisma.riderProfile.findFirst({ where: { userId } })
    if (!rider) return reply.code(400).send({ error: 'Rider no encontrado' })

    const body = req.body as any

    const near = await prisma.driverProfile.findFirst({
      where: { status: 'IDLE' },
      orderBy: { updatedAt: 'desc' }
    })
    if (!near) return reply.code(409).send({ error: 'No hay conductores disponibles cerca' })

    const tariff = await computeFare({
      city: body.city,
      distanceKm: body.distanceKm,
      durationMin: body.durationMin
    })

    const trip = await prisma.trip.create({
      data: {
        riderId: rider.userId,
        driverId: near.userId,
        vehicleId: null,
        status: 'ASSIGNED',
        requestedAt: new Date(),
        distanceKm: body.distanceKm,
        durationMin: body.durationMin,
        costUsd: Number(tariff.totalUsd),
        currency: 'USD',
        pickupLat: body.pickupLat,
        pickupLng: body.pickupLng,
        dropoffLat: body.dropoffLat,
        dropoffLng: body.dropoffLng,
        pickupAddress: body.pickupAddress ?? 'Origen',
        dropoffAddress: body.dropoffAddress ?? 'Destino',
        pricingSnapshot: tariff as any
      }
    })

    return reply.send({ ok: true, trip: { id: trip.id, status: trip.status } })
  })
}
