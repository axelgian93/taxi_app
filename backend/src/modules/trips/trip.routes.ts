// src/modules/trips/trip.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import { Prisma, TripStatus, DriverStatus } from '@prisma/client'

function fail(reply: any, code: number, msg: string) {
  return reply.code(code).send({ error: msg })
}

export default async function tripRoutes(app: FastifyInstance) {
  // ---------------------------
  // POST /trips/request  (RIDER autenticado)
  // ---------------------------
  app.post(
    '/trips/request',
    { schema: { tags: ['trips'] }, preHandler: app.auth.verifyJWT },
    async (req, reply) => {
      const riderId = (req as any).user?.id as string | undefined
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

      // Buscar conductor IDLE
      const idleDriver =
        (await prisma.driverProfile
          .findFirst({
            where: { status: DriverStatus.IDLE },
            select: { userId: true, id: true },
          })
          .catch(() => null)) || null

      if (!idleDriver) return fail(reply, 400, 'No hay conductores disponibles cerca')

      // Crear trip en estado ASSIGNED
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
    }
  )

  // ---------------------------
  // POST /trips/:id/accept  (DRIVER)
  // ---------------------------
  app.post(
    '/trips/:id/accept',
    { schema: { tags: ['trips'] }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
      const id = (req.params as any).id as string

      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
      if (trip.status !== TripStatus.ASSIGNED) return fail(reply, 400, 'Estado inválido para aceptar')

      await prisma.trip.update({ where: { id }, data: { status: TripStatus.ACCEPTED } })
      return reply.send({ ok: true })
    }
  )

  // ---------------------------
  // POST /trips/:id/arrive  (DRIVER)
  // ---------------------------
  app.post(
    '/trips/:id/arrive',
    { schema: { tags: ['trips'] }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
      const id = (req.params as any).id as string

      const trip = await prisma.trip.findUnique({ where: { id } })
      if (!trip) return fail(reply, 404, 'Trip no encontrado')
      if (trip.driverId !== driverId) return fail(reply, 403, 'Forbidden')
      if (trip.status !== TripStatus.ACCEPTED) return fail(reply, 400, 'Estado inválido para llegar')

      await prisma.trip.update({ where: { id }, data: { status: TripStatus.ARRIVED } })
      return reply.send({ ok: true })
    }
  )

  // ---------------------------
  // POST /trips/:id/start  (DRIVER)
  // ---------------------------
  app.post(
    '/trips/:id/start',
    { schema: { tags: ['trips'] }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
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
    }
  )

  // ---------------------------
  // POST /trips/:id/complete  (DRIVER)
  // ---------------------------
  app.post(
    '/trips/:id/complete',
    { schema: { tags: ['trips'] }, preHandler: app.auth.requireRole('DRIVER') },
    async (req, reply) => {
      const driverId = (req as any).user?.id as string
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
          // fareUsd: new Prisma.Decimal(7.5), // si tu modelo lo tuviera
        },
      })
      return reply.send({ ok: true })
    }
  )
}
