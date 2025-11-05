// src/plugins/driver-presence.ts
import fp from 'fastify-plugin'

import prisma from '../lib/prisma'

export default fp(async (app) => {
  const intervalSec = Math.max(30, Number(process.env.DRIVER_PRESENCE_SWEEP_SEC || 60))
  const maxAgeMin = Math.max(1, Number(process.env.DRIVER_PRESENCE_MAX_AGE_MIN || 10))
  const sweep = async () => {
    const sql = `
      UPDATE "DriverProfile"
      SET "status" = 'OFFLINE', "updatedAt" = NOW()
      WHERE ("locationUpdatedAt" IS NULL OR "locationUpdatedAt" < NOW() - (interval '1 minute' * ${maxAgeMin}))
        AND "status" <> 'OFFLINE'
    `
    try { await prisma.$executeRawUnsafe(sql) } catch {}
  }
  const timer = setInterval(sweep, intervalSec * 1000)
  app.addHook('onClose', async () => { clearInterval(timer) })
})
