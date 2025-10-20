import { FastifyInstance } from 'fastify'
import { upsertDriverLocation } from '../../services/driver.service'
import { prisma } from '../../lib/prisma'
import { authGuard } from '../../utils/authGuard'

export default async function driverRoutes(app: FastifyInstance) {
  // Driver reporta ubicación
  app.post('/drivers/location', { preHandler: [authGuard(['DRIVER'])] }, async (req, reply) => {
    const user = req.user!
    const { lat, lng } = (req.body || {}) as { lat?: number; lng?: number }
    if (typeof lat !== 'number' || typeof lng !== 'number') {
      return reply.code(400).send({ error: 'lat y lng numéricos son requeridos' })
    }
    try {
      const updated = await upsertDriverLocation(user.id, lat, lng)
      return reply.send({ ok: true, driver: { id: updated.id, status: updated.status } })
    } catch (e: any) {
      return reply.code(400).send({ error: e.message })
    }
  })

  // Cambiar status
  app.post('/drivers/status', { preHandler: [authGuard(['DRIVER'])] }, async (req, reply) => {
    const user = req.user!
    const { status } = (req.body || {}) as { status?: 'OFFLINE' | 'IDLE' | 'ON_TRIP' | 'SUSPENDED' }
    if (!status) return reply.code(400).send({ error: 'status requerido' })

    const dp = await prisma.driverProfile.update({
      where: { userId: user.id },
      data: { status },
      select: { id: true, status: true },
    })
    return reply.send({ ok: true, driver: dp })
  })
}
