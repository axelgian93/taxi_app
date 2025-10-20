import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { authGuard } from '../../utils/authGuard'

export default async function adminTripsRoutes(app: FastifyInstance) {
  app.get('/admin/trips', { preHandler: [authGuard(['ADMIN'])] }, async (req, reply) => {
    const q = req.query as any
    const page = Math.max(1, Number(q.page ?? 1))
    const pageSize = Math.min(100, Math.max(1, Number(q.pageSize ?? 20)))

    const where: any = {}
    if (q.status) where.status = q.status
    if (q.riderId) where.riderId = q.riderId
    if (q.driverId) where.driverId = q.driverId
    if (q.dateFrom || q.dateTo) {
      where.requestedAt = {}
      if (q.dateFrom) where.requestedAt.gte = new Date(q.dateFrom)
      if (q.dateTo) where.requestedAt.lte = new Date(q.dateTo)
    }

    const [items, total] = await Promise.all([
      prisma.trip.findMany({
        where,
        orderBy: { requestedAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          rider: { select: { firstName: true, lastName: true, email: true } },
          driver: { select: { firstName: true, lastName: true, email: true } },
          vehicle: { select: { plate: true, brand: true, model: true } },
          payment: true,
        },
      }),
      prisma.trip.count({ where }),
    ])

    return reply.send({ page, pageSize, total, items })
  })
}
