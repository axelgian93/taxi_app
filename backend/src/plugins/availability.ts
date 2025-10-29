// src/plugins/availability.ts
import fp from 'fastify-plugin'

import prisma from '../lib/prisma'
import { updateCurrentDriversAvailable } from '../services/metrics.service'

export default fp(async (app) => {
  const SAMPLE_SEC = Number(process.env.AVAILABILITY_SAMPLE_SEC || 15)
  const LOCATION_MAX_AGE_MIN = Number(process.env.LOCATION_MAX_AGE_MIN || 10)

  async function sample() {
    try {
      const cutoff = new Date(Date.now() - LOCATION_MAX_AGE_MIN * 60 * 1000)
      const n = await prisma.driverProfile.count({
        where: {
          status: 'IDLE',
          currentLat: { not: null },
          currentLng: { not: null },
          locationUpdatedAt: { gte: cutoff },
        },
      })
      updateCurrentDriversAvailable(n)
    } catch (e) {
      app.log.warn({ err: String(e) }, 'availability sample failed')
    }
  }

  await sample()
  const timer = setInterval(sample, SAMPLE_SEC * 1000)
  app.addHook('onClose', async () => clearInterval(timer))
})

