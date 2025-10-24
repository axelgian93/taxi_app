// src/modules/drivers/driver.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import { DriverStatus, Prisma } from '@prisma/client'

type BodyReport = {
  lat?: number
  lng?: number
  status?: DriverStatus
}

// Helper simple para sacar el userId (JWT o header dev)
function getUserId(req: any): string | undefined {
  const fromJwt = req?.user?.id as string | undefined
  const fromHeader = (req.headers?.['x-user-id'] ??
    req.headers?.['x-userid']) as string | undefined
  return fromJwt || fromHeader
}

// Handler principal (lo referenciamos desde la ruta)
async function handleReport(app: FastifyInstance, req: any, reply: any) {
  const userId = getUserId(req)
  if (!userId) return reply.code(401).send({ error: 'Unauthorized' })

  const body = (req.body || {}) as BodyReport
  const status = (body.status ?? 'IDLE') as DriverStatus

  // Aseguramos que exista el perfil del driver
  const driverProfile = await prisma.driverProfile.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
      rating: 5.0,
      totalTrips: 0,
      status: 'IDLE', // valor por defecto
      // este campo es requerido en tu schema
      licenseNumber: 'PENDING',
    },
  })

  // Si vinieron coordenadas, guardamos histórico
  if (typeof body.lat === 'number' && typeof body.lng === 'number') {
    await prisma.driverLocationHistory.create({
      data: {
        driverId: driverProfile.id,
        lat: body.lat as any,
        lng: body.lng as any,
      },
    })
  }

  // Cambiamos status del driver
  await prisma.driverProfile.update({
    where: { id: driverProfile.id },
    data: { status: { set: status as DriverStatus } }, // <- enum con set
  })

  return reply.send({ ok: true })
}

export default async function driverRoutes(app: FastifyInstance) {
  // Esquema para Swagger / validación
  const bodySchema = {
    type: 'object',
    properties: {
      lat: { type: 'number', example: -2.17 },
      lng: { type: 'number', example: -79.92 },
      status: {
        type: 'string',
        enum: ['IDLE', 'ASSIGNED', 'ARRIVED', 'ON_TRIP', 'OFFLINE'],
        example: 'IDLE',
      },
    },
    additionalProperties: false,
  } as const

  const responseOk = {
    200: {
      type: 'object',
      properties: { ok: { type: 'boolean' } },
    },
  } as const

  app.post('/drivers/status', {
    schema: {
      tags: ['drivers'],
      body: bodySchema,
      response: responseOk,
      summary: 'Driver reporta su estado y (opcional) ubicación',
    },
  }, (req, reply) => handleReport(app, req, reply))
}
