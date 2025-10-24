// src/modules/trips/trip.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import { Prisma, TripStatus, DriverStatus } from '@prisma/client'

function fail(reply: any, code: number, msg: string) {
  return reply.code(code).send({ error: msg })
}

function getUserId(req: any): string | undefined {
  return (req.user?.id as string | undefined) ?? (req.headers?.['x-user-id'] as string | undefined)
}

export default async function tripRoutes(app: FastifyInstance) {
  // Rider pide viaje
  app.post('/trips/request', { schema: { tags: ['trips'] } }, async (req, reply) => {
    const riderId = getUserId(req)
    if (!riderId) return fail(reply, 401, 'Unauthorized')

    const body = (req.body || {}) as {
      origin?: { lat: number; lng: number }
      destination?: { lat: number; lng: number }
    }
    const { origin, destination } = body
    if (
      !origin ||
      !destination ||
      typeof origin.lat !== 'number' ||
      typeof origin.lng !== 'number' ||
      typeof destination.lat !== 'number' ||
      typeof destination.lng !== 'number'
    ) {
      return fail(reply, 400, 'Body inválido')
    }

    // buscamos conductor IDLE
    const idleDriver =
      (await prisma.driverProfile
        .findFirst({
          where: { status: DriverStatus.IDLE },
          select: { userId: true, id: true },
        })
        .catch(() => null)) || null

    if (!idleDriver) return fail(reply, 400, 'No hay conductores disponibles cerca')

    // 🔧 IMPORTANTE: no cambiamos el estado del driver aquí
    // (tu enum no tiene ASSIGNED). El driver seguirá IDLE hasta que inicie viaje.

    // creamos el trip con estado ASSIGNED
    const trip = await prisma.trip.create({
      data: {
        riderId,
        driverId: idleDriver.userId,
        status: TripStatus.ASSIGNED,
        pickupLat: Number(origin.lat),
        pickupLng: Number(origin.lng),
        dropoffLat: Number(destination.lat),
        dropoffLng: Number(destination.lng),
      },
      select: { id: true, status: true },
    })

    return reply.send({ ok: true, trip })
  })

  // Driver acepta
  app.post('/trips/:id/accept', { schema: { tags: ['trips'] } }, async (req, reply) => {
    const driverId = getUserId(req)
    if (!driverId) return fail(reply, 401, 'Unauthorized')

    const id = (req.params as any).id as string
    const trip = await prisma.trip.findUnique({ where: { id } })
    if (!trip) return fail(reply, 404, 'Trip no encontrado')
    if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
    if (trip.status !== TripStatus.ASSIGNED) return fail(reply, 400, 'Estado inválido para aceptar')

    await prisma.trip.update({
      where: { id },
      data: { status: TripStatus.ACCEPTED },
    })

    return reply.send({ ok: true })
  })

  // Driver llega
  app.post('/trips/:id/arrive', { schema: { tags: ['trips'] } }, async (req, reply) => {
    const driverId = getUserId(req)
    if (!driverId) return fail(reply, 401, 'Unauthorized')

    const id = (req.params as any).id as string
    const trip = await prisma.trip.findUnique({ where: { id } })
    if (!trip) return fail(reply, 404, 'Trip no encontrado')
    if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
    if (trip.status !== TripStatus.ACCEPTED) return fail(reply, 400, 'Estado inválido para llegar')

    await prisma.trip.update({
      where: { id },
      data: { status: TripStatus.ARRIVED },
    })

    return reply.send({ ok: true })
  })

  // Driver inicia viaje
  app.post('/trips/:id/start', { schema: { tags: ['trips'] } }, async (req, reply) => {
    const driverId = getUserId(req)
    if (!driverId) return fail(reply, 401, 'Unauthorized')

    const id = (req.params as any).id as string
    const trip = await prisma.trip.findUnique({ where: { id } })
    if (!trip) return fail(reply, 404, 'Trip no encontrado')
    if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
    if (trip.status !== TripStatus.ARRIVED) return fail(reply, 400, 'Estado inválido para iniciar')

    await prisma.trip.update({
      where: { id },
      data: { status: TripStatus.STARTED, startedAt: new Date() },
    })

    return reply.send({ ok: true })
  })

  // Driver completa viaje
  app.post('/trips/:id/complete', { schema: { tags: ['trips'] } }, async (req, reply) => {
    const driverId = getUserId(req)
    if (!driverId) return fail(reply, 401, 'Unauthorized')

    const id = (req.params as any).id as string
    const trip = await prisma.trip.findUnique({ where: { id } })
    if (!trip) return fail(reply, 404, 'Trip no encontrado')
    if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
    if (trip.status !== TripStatus.STARTED) return fail(reply, 400, 'Estado inválido para completar')

    await prisma.trip.update({
      where: { id },
      data: {
        status: TripStatus.COMPLETED,
        completedAt: new Date(),
        // Si tu modelo tuviera tarifa, aquí podrías setearla:
        // fareUsd: new Prisma.Decimal(7.5),
      },
    })

    return reply.send({ ok: true })
  })
}
