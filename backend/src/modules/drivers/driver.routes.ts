// src/modules/drivers/driver.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import type { $Enums } from '@prisma/client'

type BodyReport = {
  lat?: number
  lng?: number
  status?: $Enums.DriverStatus
}

// Extrae userId desde req.user (JWT), header x-user-id, o verificando Bearer manualmente
async function getUserId(app: FastifyInstance, req: any): Promise<string | undefined> {
  const fromReq = (req as any).user?.id as string | undefined
  if (fromReq) return fromReq
  // 1) Header directo (Ãºtil en pruebas manuales)
  const fromHeader = (req.headers?.['x-user-id'] as string | undefined)?.trim()
  if (fromHeader) return fromHeader

  // 2) Bearer token (lo que usa tu smoke-e2e)
  const auth = (req.headers?.authorization as string | undefined) || ''
  const m = auth.match(/^Bearer\s+(.+)$/i)
  if (!m) return undefined

  // Si registraste @fastify/jwt, Ãºsalo para verificar
  try {
    // @ts-ignore - fastify-jwt aÃ±ade .jwt al server
    const decoded = await app.jwt?.verify(m[1])
    const id = (decoded as any)?.id
    if (typeof id === 'string' && id) return id
  } catch {
    // ignore: retornaremos undefined -> 401
  }
  return undefined
}

async function handleReport(app: FastifyInstance, req: any, reply: any) {
  const userId = await getUserId(app, req)
  if (!userId) return reply.code(401).send({ error: 'Unauthorized' })

  const body = (req.body || {}) as BodyReport
  const status = (body.status ?? 'IDLE') as $Enums.DriverStatus

  // Aseguramos que exista el DriverProfile
  const driverProfile = await prisma.driverProfile.upsert({
    where: { userId },
    update: {},
    create: {
      userId,
      rating: 5.0,
      totalTrips: 0,
      status: 'IDLE',
      licenseNumber: `PENDING-${userId}`,
    },
  })

  // Si vinieron coordenadas, guardamos histÃ³rico
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
    200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } },
    401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } }
  } as const

  // /drivers/status (original)
  app.post(
    '/drivers/status',
    { schema: { operationId: 'driverUpdateStatus', tags: ['drivers'], summary: 'Actualizar estado del driver', description: 'Driver reporta su estado (IDLE/ON_TRIP/etc.). Requiere JWT.', body: bodySchema, response: responseOk }, preHandler: app.auth.verifyJWT },
    (req, reply) => handleReport(app, req, reply),
  )

  // /drivers/location (alias que usa el smoke)
  app.post(
    '/drivers/location',
    { schema: { operationId: 'driverUpdateLocation', tags: ['drivers'], summary: 'Actualizar estado del driver', description: 'Driver reporta su estado (IDLE/ON_TRIP/etc.). Requiere JWT.', body: bodySchema, response: responseOk }, preHandler: app.auth.verifyJWT },
    (req, reply) => handleReport(app, req, reply),
  )

  // Lista de viajes activos asignados al driver actual
  app.get(
    '/drivers/my-trips/active',
    {
      schema: {
        operationId: 'driverMyTripsActive',
        tags: ['drivers'],
        summary: 'Mis viajes activos',
        description: 'Lista viajes del driver con estado ACCEPTED/ARRIVED/STARTED.',
        response: {
          200: {
            type: 'object',
            properties: {
              items: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    status: { type: 'string', enum: ['ACCEPTED','ARRIVED','STARTED'] },
                    pickupLat: { type: 'number' },
                    pickupLng: { type: 'number' },
                    dropoffLat: { type: 'number' },
                    dropoffLng: { type: 'number' },
                    requestedAt: { type: 'string', format: 'date-time' },
                    preferredMethod: { type: 'string', enum: ['CASH','CARD'], nullable: true },
                  }
                }
              }
            },
            example: { items: [ { id: 'trp_123', status: 'ACCEPTED', pickupLat: -2.17, pickupLng: -79.92, dropoffLat: -2.19, dropoffLng: -79.89, requestedAt: '2025-01-01T12:00:00.000Z', preferredMethod: 'CARD' } ] }
          },
          401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } },
          403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } },
        }
      },
      preHandler: app.auth.requireRole('DRIVER')
    },
    async (req: any, reply) => {
      const userId = req.user?.id as string
      const rows = await prisma.trip.findMany({
        where: { driverId: userId, status: { in: ['ACCEPTED','ARRIVED','STARTED'] as any } },
        orderBy: { requestedAt: 'desc' },
        take: 20,
        select: { id: true, status: true, pickupLat: true, pickupLng: true, dropoffLat: true, dropoffLng: true, requestedAt: true, pricingSnapshot: true }
      })
      const items = rows.map((r: any) => ({
        id: r.id,
        status: r.status,
        pickupLat: Number(r.pickupLat),
        pickupLng: Number(r.pickupLng),
        dropoffLat: Number(r.dropoffLat),
        dropoffLng: Number(r.dropoffLng),
        requestedAt: r.requestedAt,
        preferredMethod: (r.pricingSnapshot as any)?.preferredMethod ?? null,
      }))
      return reply.send({ items })
    }
  )
}
