// src/modules/drivers/driver.routes.ts
import { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'

/** Enums documentados */
const DriverStatusEnum = ['OFFLINE', 'IDLE', 'ON_TRIP'] as const

/** Schemas */
const locationBody = {
  type: 'object',
  required: ['lat', 'lng'],
  properties: {
    lat: { type: 'number', examples: [-2.170], description: 'Latitud actual del driver' },
    lng: { type: 'number', examples: [-79.922], description: 'Longitud actual del driver' }
  },
  additionalProperties: false
} as const

const statusBody = {
  type: 'object',
  required: ['status'],
  properties: {
    status: { type: 'string', enum: DriverStatusEnum, examples: ['IDLE'] }
  },
  additionalProperties: false
} as const

const okResponse = { type: 'object', properties: { ok: { type: 'boolean' } } } as const
const errorResponse = { type: 'object', properties: { error: { type: 'string' } } } as const

export default async function driverRoutes(app: FastifyInstance) {
  // Reportar ubicación
  app.post(
    '/drivers/location',
    {
      schema: {
        tags: ['drivers'],
        summary: 'Reporta la ubicación actual del driver y lo deja IDLE',
        security: [{ bearerAuth: [] }],
        body: locationBody,
        response: {
          200: okResponse,
          401: errorResponse,
          422: errorResponse
        }
      }
    },
    async (req, reply) => {
      const driverUserId =
        (req.headers['x-user-id'] as string | undefined) ||
        (req as any).userId ||
        (req as any).user?.id

      if (!driverUserId) return reply.code(401).send({ error: 'Unauthorized' })

      const body = req.body as { lat: number; lng: number }

      // ✅ Opción 1: no tocamos lastLat/lastLng (no existen en tu modelo)
      // Solo dejamos el driver en IDLE y registramos en el historial
      await prisma.driverProfile.updateMany({
        where: { userId: driverUserId },
        data: { status: 'IDLE' as any }
      })

      // Inserta en historial (si existe profile)
      const dp = await prisma.driverProfile.findFirst({ where: { userId: driverUserId } })
      if (dp) {
        await prisma.driverLocationHistory.create({
          data: { driverId: dp.id, lat: body.lat as any, lng: body.lng as any }
        })
      }

      return reply.send({ ok: true })
    }
  )

  // Cambiar status del driver
  app.post(
    '/drivers/status',
    {
      schema: {
        tags: ['drivers'],
        summary: 'Cambia el estado del driver',
        security: [{ bearerAuth: [] }],
        body: statusBody,
        response: {
          200: {
            type: 'object',
            properties: {
              ok: { type: 'boolean' },
              status: { type: 'string', enum: DriverStatusEnum }
            }
          },
          401: errorResponse,
          422: errorResponse
        }
      }
    },
    async (req, reply) => {
      const driverUserId =
        (req.headers['x-user-id'] as string | undefined) ||
        (req as any).userId ||
        (req as any).user?.id

      if (!driverUserId) return reply.code(401).send({ error: 'Unauthorized' })

      const body = req.body as { status: typeof DriverStatusEnum[number] }

      await prisma.driverProfile.updateMany({
        where: { userId: driverUserId },
        data: { status: body.status as any }
      })
      return reply.send({ ok: true, status: body.status })
    }
  )
}
