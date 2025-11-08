// src/modules/drivers/driver.routes.ts
import type { FastifyInstance } from 'fastify'
import type { $Enums } from '@prisma/client'

import prisma from '../../lib/prisma'
import { publishTripEvent } from '../../services/events.service'

type BodyReport = {
  lat?: number
  lng?: number
  status?: $Enums.DriverStatus
}

// Extrae userId desde req.user (JWT), header x-user-id, o verificando Bearer manualmente
async function getUserId(app: FastifyInstance, req: any): Promise<string | undefined> {
  const fromReq = (req as any).user?.id as string | undefined
  if (fromReq) return fromReq
  // 1) Header directo (ÃƒÂºtil en pruebas manuales)
  const fromHeader = (req.headers?.['x-user-id'] as string | undefined)?.trim()
  if (fromHeader) return fromHeader

  // 2) Bearer token (lo que usa tu smoke-e2e)
  const auth = (req.headers?.authorization as string | undefined) || ''
  const m = auth.match(/^Bearer\s+(.+)$/i)
  if (!m) return undefined

  // Si registraste @fastify/jwt, ÃƒÂºsalo para verificar
  try {
    // @ts-ignore - fastify-jwt aÃƒÂ±ade .jwt al server
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

  // Throttle frequent updates per driver
  const minIntervalMs = Number(process.env.DRIVER_LOCATION_MIN_INTERVAL_MS || 2000)
  ;(globalThis as any).__driverLastLoc = (globalThis as any).__driverLastLoc || new Map<string, number>()
  const lastMap: Map<string, number> = (globalThis as any).__driverLastLoc
  const now = Date.now()
  const last = lastMap.get(userId) || 0
  const tooSoon = now - last < minIntervalMs

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

  // Si vinieron coordenadas, validamos y guardamos histórico (respetando throttling)
  if (typeof body.lat === 'number' && typeof body.lng === 'number') {
    const lat = Number(body.lat)
    const lng = Number(body.lng)
    const valid = isFinite(lat) && isFinite(lng) && lat <= 90 && lat >= -90 && lng <= 180 && lng >= -180
    if (!valid) return reply.code(400).send({ error: 'Invalid lat/lng' })
    if (!tooSoon) {
      await prisma.driverLocationHistory.create({ data: { driverId: driverProfile.id, lat: lat as any, lng: lng as any } })
      await prisma.driverProfile.update({ where: { id: driverProfile.id }, data: { currentLat: lat as any, currentLng: lng as any, locationUpdatedAt: new Date() } })
      const active = await prisma.trip.findFirst({ where: { driverId: userId, status: { in: ['ACCEPTED','ARRIVED','STARTED'] as any } }, orderBy: { requestedAt: 'desc' }, select: { id: true } })
      if (active?.id) publishTripEvent(active.id, { type: 'LOCATION', at: new Date().toISOString(), data: { lat, lng } })
    }
  }

  // Actualizamos status (enum -> usar set)
  await prisma.driverProfile.update({
    where: { id: driverProfile.id },
    data: { status: { set: status } },
  })

  if (!tooSoon) lastMap.set(userId, now)
  return reply.code(tooSoon ? 202 : 200).send({ ok: true })
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
    401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } },
    403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Email not verified' } }
  } as const

  // /drivers/status (original)
  app.post(
    '/drivers/status',
    {
      schema: { operationId: 'driverUpdateStatus', tags: ['drivers'], summary: 'Actualizar estado del driver', description: 'Driver reporta su estado (IDLE/ON_TRIP/etc.). Requiere JWT.', body: bodySchema, response: responseOk },
      preHandler: app.auth.verifyJWT,
      config: {
        rateLimit: {
          max: Number(process.env.RL_DRIVER_LOC_MAX || 120),
          timeWindow: process.env.RL_DRIVER_LOC_WIN || '1 minute',
          keyGenerator: (req: any) => `drloc:${(req as any).user?.id || req.ip}`,
        }
      }
    },
    (req, reply) => handleReport(app, req, reply),
  )

  // /drivers/location (alias que usa el smoke)
  app.post(
    '/drivers/location',
    {
      schema: { operationId: 'driverUpdateLocation', tags: ['drivers'], summary: 'Actualizar estado del driver', description: 'Driver reporta su estado (IDLE/ON_TRIP/etc.). Requiere JWT.', body: bodySchema, response: responseOk },
      preHandler: app.auth.verifyJWT,
      config: {
        rateLimit: {
          max: Number(process.env.RL_DRIVER_LOC_MAX || 120),
          timeWindow: process.env.RL_DRIVER_LOC_WIN || '1 minute',
          keyGenerator: (req: any) => `drloc:${(req as any).user?.id || req.ip}`,
        }
      }
    },
    (req, reply) => handleReport(app, req, reply),
  )

  // Lista de viajes activos/asignados al driver actual
  app.get(
    '/drivers/my-trips/active',
    {
      schema: {
        operationId: 'driverMyTripsActive',
        tags: ['drivers'],
        summary: 'Mis viajes activos',
        description: 'Lista viajes del driver con estado ASSIGNED/ACCEPTED/ARRIVED/STARTED.',
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
                    status: { type: 'string', enum: ['ASSIGNED','ACCEPTED','ARRIVED','STARTED'] },
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
            example: { items: [ { id: 'trp_123', status: 'ASSIGNED', pickupLat: -2.17, pickupLng: -79.92, dropoffLat: -2.19, dropoffLng: -79.89, requestedAt: '2025-01-01T12:00:00.000Z', preferredMethod: 'CARD' } ] }
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
        where: { driverId: userId, status: { in: ['ASSIGNED','ACCEPTED','ARRIVED','STARTED'] as any } },
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

  // Historial del driver (COMPLETED o CANCELED)
  app.get(
    '/drivers/my-trips/history',
    {
      schema: {
        operationId: 'driverMyTripsHistory',
        tags: ['drivers'],
        summary: 'Mis viajes (historial)',
        description: 'Lista de viajes completados o cancelados para el driver autenticado.',
        querystring: { type: 'object', properties: { limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 }, cursor: { type: 'string', nullable: true } } },
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
                    status: { type: 'string', enum: ['COMPLETED','CANCELED'] },
                    pickupLat: { type: 'number' },
                    pickupLng: { type: 'number' },
                    dropoffLat: { type: 'number' },
                    dropoffLng: { type: 'number' },
                    requestedAt: { type: 'string', format: 'date-time' },
                    completedAt: { type: 'string', format: 'date-time', nullable: true },
                    costUsd: { type: 'number', nullable: true },
                    currency: { type: 'string', nullable: true },
                  }
                }
              },
              nextCursor: { type: 'string', nullable: true }
            }
          },
          401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } },
          403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } },
        }
      },
      preHandler: app.auth.requireRole('DRIVER')
    },
    async (req: any, reply) => {
      const userId = req.user?.id as string
      function enc(id: string, at: Date): string { return Buffer.from(JSON.stringify({ id, requestedAt: at.toISOString() }), 'utf8').toString('base64') }
      function dec(raw?: string | null): { id: string; requestedAt: Date } | null {
        if (!raw) return null; try { const o = JSON.parse(Buffer.from(raw, 'base64').toString('utf8')); const id = String(o.id||''); const at = new Date(String(o.requestedAt||'')); if (!id || isNaN(at.getTime())) return null; return { id, requestedAt: at } } catch { return null }
      }
      const q = (req.query || {}) as any
      const lim = Math.min(Math.max(Number(q.limit || 20), 1), 100)
      const cur = dec(q.cursor)
      const where: any = { driverId: userId, status: { in: ['COMPLETED','CANCELED'] as any } }
      if (cur) {
        where.OR = [ { requestedAt: { lt: cur.requestedAt } }, { AND: [ { requestedAt: cur.requestedAt }, { id: { lt: cur.id } } ] } ]
      }
      const rows = await prisma.trip.findMany({
        where,
        orderBy: [{ requestedAt: 'desc' }, { id: 'desc' }],
        take: lim,
        select: { id: true, status: true, pickupLat: true, pickupLng: true, dropoffLat: true, dropoffLng: true, requestedAt: true, completedAt: true, costUsd: true, currency: true }
      })
      const items = rows.map((r: any) => ({
        id: r.id,
        status: r.status,
        pickupLat: Number(r.pickupLat),
        pickupLng: Number(r.pickupLng),
        dropoffLat: Number(r.dropoffLat),
        dropoffLng: Number(r.dropoffLng),
        requestedAt: r.requestedAt,
        completedAt: r.completedAt ?? null,
        costUsd: r.costUsd ?? null,
        currency: r.currency ?? null,
      }))
      const last = rows[rows.length - 1]
      const nextCursor = last ? enc(last.id, last.requestedAt as any) : null
      return reply.send({ items, nextCursor })
    }
  )
}

