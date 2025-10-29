import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

import prisma from '../../lib/prisma'

const listQuery = {
  type: 'object',
  properties: {
    limit: { type: 'integer', minimum: 1, maximum: 200, default: 50 },
    cursor: { type: 'string' }
  }
} as const

const tripItem = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    status: { type: 'string' },
    riderId: { type: 'string' },
    driverId: { type: 'string' },
    requestedAt: { type: 'string', format: 'date-time' },
    completedAt: { type: 'string', format: 'date-time', nullable: true },
    costUsd: { type: 'number' },
    currency: { type: 'string' }
  }
} as const

export default async function adminTripsRoutes(app: FastifyInstance) {
  app.get(
    '/admin/trips',
    {
      schema: {
        operationId: 'adminTripsList',
        tags: ['admin'],
        security: [{ bearerAuth: [] }],
        querystring: listQuery,
        response: { 200: { type: 'object', properties: { items: { type: 'array', items: tripItem }, nextCursor: { type: 'string', nullable: true } } }, 401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } }, 403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } } }
      }
    },
    async (req: FastifyRequest, reply: FastifyReply) => {
      const { limit = 50, cursor } = req.query as { limit?: number; cursor?: string }
      const items = await prisma.trip.findMany({
        take: limit,
        ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
        orderBy: { requestedAt: 'desc' },
        select: {
          id: true, status: true, riderId: true, driverId: true,
          requestedAt: true, completedAt: true, costUsd: true, currency: true
        }
      })
      const nextCursor = items.length === limit ? items[items.length - 1].id : null
      return reply.send({ items, nextCursor })
    }
  )
}

