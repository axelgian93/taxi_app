import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { findNearestDriver } from '../../services/driver.service'
import { computeFare } from '../../services/pricing.service'
import { authGuard } from '../../utils/authGuard'

export default async function tripRoutes(app: FastifyInstance) {
  // Solicitar viaje
  app.post('/trips/request', { preHandler: [authGuard(['RIDER'])] }, async (req, reply) => {
    const user = req.user!
    const body = (req.body || {}) as {
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
    const required = ['city','pickupLat','pickupLng','dropoffLat','dropoffLng','distanceKm','durationMin'] as const
    for (const k of required) if ((body as any)[k] === undefined) return reply.code(400).send({ error: `Falta ${k}` })

    const near = await findNearestDriver(body.pickupLat, body.pickupLng)
    if (!near) return reply.code(409).send({ error: 'No hay conductores disponibles cerca' })

    const pricing = await computeFare({
      city: body.city,
      distanceKm: body.distanceKm,
      durationMin: body.durationMin,
    })

    const trip = await prisma.trip.create({
      data: {
        riderId: user.id,
        driverId: near.userId,
        status: 'ASSIGNED',
        assignedAt: new Date(),
        pickupLat: body.pickupLat,
        pickupLng: body.pickupLng,
        pickupAddress: body.pickupAddress,
        dropoffLat: body.dropoffLat,
        dropoffLng: body.dropoffLng,
        dropoffAddress: body.dropoffAddress,
        distanceKm: body.distanceKm,
        durationMin: Math.round(body.durationMin),
        costUsd: pricing.total,
        currency: pricing.currency,
        pricingSnapshot: pricing.ruleSnapshot as any,
      },
    })

    await prisma.driverProfile.update({
      where: { userId: near.userId },
      data: { status: 'ON_TRIP' },
    })

    return reply.send({ ok: true, trip, pricing })
  })

  app.post('/trips/:id/accept', { preHandler: [authGuard(['DRIVER'])] }, async (req, reply) => {
    const user = req.user!
    const id = (req.params as any).id as string
    const trip = await prisma.trip.findUnique({ where: { id } })
    if (!trip) return reply.code(404).send({ error: 'Trip no encontrado' })
    if (trip.driverId !== user.id) return reply.code(403).send({ error: 'No eres el driver asignado' })
    if (trip.status !== 'ASSIGNED') return reply.code(409).send({ error: 'Estado inválido' })
    const updated = await prisma.trip.update({ where: { id }, data: { status: 'ACCEPTED', acceptedAt: new Date() } })
    return reply.send({ ok: true, trip: updated })
  })

  app.post('/trips/:id/arrived', { preHandler: [authGuard(['DRIVER'])] }, async (req, reply) => {
    const user = req.user!
    const id = (req.params as any).id as string
    const trip = await prisma.trip.findUnique({ where: { id } })
    if (!trip) return reply.code(404).send({ error: 'Trip no encontrado' })
    if (trip.driverId !== user.id) return reply.code(403).send({ error: 'No eres el driver asignado' })
    if (!['ACCEPTED','ASSIGNED'].includes(trip.status)) return reply.code(409).send({ error: 'Estado inválido' })
    const updated = await prisma.trip.update({ where: { id }, data: { status: 'ARRIVED', arrivedAt: new Date() } })
    return reply.send({ ok: true, trip: updated })
  })

  app.post('/trips/:id/start', { preHandler: [authGuard(['DRIVER'])] }, async (req, reply) => {
    const user = req.user!
    const id = (req.params as any).id as string
    const trip = await prisma.trip.findUnique({ where: { id } })
    if (!trip) return reply.code(404).send({ error: 'Trip no encontrado' })
    if (trip.driverId !== user.id) return reply.code(403).send({ error: 'No eres el driver asignado' })
    if (!['ACCEPTED','ARRIVED'].includes(trip.status)) return reply.code(409).send({ error: 'Estado inválido' })
    const updated = await prisma.trip.update({ where: { id }, data: { status: 'STARTED', startedAt: new Date() } })
    return reply.send({ ok: true, trip: updated })
  })

  app.post('/trips/:id/complete', { preHandler: [authGuard(['DRIVER'])] }, async (req, reply) => {
    const user = req.user!
    const id = (req.params as any).id as string
    const trip = await prisma.trip.findUnique({ where: { id } })
    if (!trip) return reply.code(404).send({ error: 'Trip no encontrado' })
    if (trip.driverId !== user.id) return reply.code(403).send({ error: 'No eres el driver asignado' })
    if (trip.status !== 'STARTED') return reply.code(409).send({ error: 'Estado inválido' })
    const updated = await prisma.$transaction(async (tx) => {
      const t = await tx.trip.update({ where: { id }, data: { status: 'COMPLETED', completedAt: new Date() } })
      await tx.driverProfile.update({ where: { userId: t.driverId! }, data: { status: 'IDLE', totalTrips: { increment: 1 } } })
      return t
    })
    return reply.send({ ok: true, trip: updated })
  })

  app.post('/trips/:id/cancel', { preHandler: [authGuard(['DRIVER','RIDER'])] }, async (req, reply) => {
    const user = req.user!
    const id = (req.params as any).id as string
    const { reason } = (req.body || {}) as { reason?: string }
    const trip = await prisma.trip.findUnique({ where: { id } })
    if (!trip) return reply.code(404).send({ error: 'Trip no encontrado' })
    const can =
      (user.role === 'RIDER' && trip.riderId === user.id && !['STARTED','COMPLETED','CANCELED'].includes(trip.status)) ||
      (user.role === 'DRIVER' && trip.driverId === user.id && !['STARTED','COMPLETED','CANCELED'].includes(trip.status))
    if (!can) return reply.code(403).send({ error: 'No permitido cancelar en este estado' })
    const updated = await prisma.$transaction(async (tx) => {
      const t = await tx.trip.update({ where: { id }, data: { status: 'CANCELED', canceledAt: new Date(), cancelReason: reason ?? null } })
      if (t.driverId) await tx.driverProfile.update({ where: { userId: t.driverId }, data: { status: 'IDLE' } })
      return t
    })
    return reply.send({ ok: true, trip: updated })
  })
}
