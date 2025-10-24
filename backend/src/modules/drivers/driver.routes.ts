// src/modules/drivers/driver.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import { DriverStatus } from '@prisma/client'

type BodyReport = {
  lat?: number
  lng?: number
  status?: DriverStatus
}

// Extrae userId desde x-user-id o verificando el Bearer token
async function getUserId(app: FastifyInstance, req: any): Promise<string | undefined> {
  // 1) Header directo (útil en pruebas manuales)
  const fromHeader = (req.headers?.['x-user-id'] as string | undefined)?.trim()
  if (fromHeader) return fromHeader

  // 2) Bearer token (lo que usa tu smoke-e2e)
  const auth = (req.headers?.authorization as string | undefined) || ''
  const m = auth.match(/^Bearer\s+(.+)$/i)
  if (!m) return undefined

  // Si registraste @fastify/jwt, úsalo para verificar
  try {
    // @ts-ignore - fastify-jwt añade .jwt al server
    const decoded = await app.jwt?.verify(m[1])
    const sub = (decoded as any)?.sub
    if (typeof sub === 'string' && sub) return sub
  } catch {
    // ignore: retornaremos undefined -> 401
  }
  return undefined
}

async function handleReport(app: FastifyInstance, req: any, reply: any) {
  const userId = await getUserId(app, req)
  if (!userId) return reply.code(401).send({ error: 'Unauthorized' })

  const body = (req.body || {}) as BodyReport
  const status = (body.status ?? 'IDLE') as DriverStatus

  // Aseguramos que exista el DriverProfile
  const driverProfile = await prisma.driverProfile.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
      rating: 5.0,
      totalTrips: 0,
      status: 'IDLE',
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

  // Actualizamos status (enum -> usar set)
  await prisma.driverProfile.update({
    where: { id: driverProfile.id },
    data: { status: { set: status } },
  })

  return reply.send({ ok: true })
}

export default async function driverRoutes(app: FastifyInstance) {
  // Esquema simple para Swagger
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
    200: { type: 'object', properties: { ok: { type: 'boolean' } } },
  } as const

  // /drivers/status (original)
  app.post(
    '/drivers/status',
    { schema: { tags: ['drivers'], body: bodySchema, response: responseOk } },
    (req, reply) => handleReport(app, req, reply),
  )

  // /drivers/location (alias que usa el smoke)
  app.post(
    '/drivers/location',
    { schema: { tags: ['drivers'], body: bodySchema, response: responseOk } },
    (req, reply) => handleReport(app, req, reply),
  )
}
