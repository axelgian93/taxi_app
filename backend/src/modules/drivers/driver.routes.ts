// src/modules/drivers/driver.routes.ts
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import prisma from '../../lib/prisma'

const locationBody = {
  type: 'object',
  required: ['lat', 'lng'],
  properties: {
    lat: { type: 'number' },
    lng: { type: 'number' }
  }
} as const

const statusBody = {
  type: 'object',
  required: ['status'],
  properties: {
    status: { type: 'string', enum: ['OFFLINE', 'IDLE', 'ON_TRIP'] }
  }
} as const

export default async function driverRoutes(app: FastifyInstance) {
  // Reportar ubicación
  app.post(
    '/drivers/location',
    {
      schema: {
        tags: ['drivers'],
        security: [{ bearerAuth: [] }],
        body: locationBody,
        response: {
          200: { type: 'object', properties: { ok: { type: 'boolean' } } }
        }
      }
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const driverId = (req.headers['x-user-id'] as string) || (req as any).userId
      const body = req.body as { lat: number; lng: number }

      // Solo actualizamos el status; evitamos lastLat/lastLng porque no existen en DriverProfile
      await prisma.driverProfile.updateMany({
        where: { userId: driverId },
        data: { status: 'IDLE' as any }
      })

      // Guardamos la ubicación en el historial
      const dp = await prisma.driverProfile.findFirst({ where: { userId: driverId } })
      if (dp) {
        await prisma.driverLocationHistory.create({
          data: { driverId: dp.id, lat: body.lat as any, lng: body.lng as any }
        })
      }

      return reply.send({ ok: true })
    }
  )

  // Cambiar status
  app.post(
    '/drivers/status',
    {
      schema: {
        tags: ['drivers'],
        security: [{ bearerAuth: [] }],
        body: statusBody,
        response: {
          200: { type: 'object', properties: { ok: { type: 'boolean' }, status: { type: 'string' } } }
        }
      }
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const driverId = (req.headers['x-user-id'] as string) || (req as any).userId
      const body = req.body as { status: 'OFFLINE' | 'IDLE' | 'ON_TRIP' }

      await prisma.driverProfile.updateMany({
        where: { userId: driverId },
        data: { status: body.status as any }
      })

      return reply.send({ ok: true, status: body.status })
    }
  )
}
