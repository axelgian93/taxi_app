// src/plugins/sessions-sweep.ts
import fp from 'fastify-plugin'
import prisma from '../lib/prisma'

export default fp(async (app) => {
  const days = Number(process.env.REFRESH_INACTIVITY_MAX_DAYS || 90)
  const sweepSec = Number(process.env.REFRESH_SWEEP_SEC || 3600)
  if (!(days > 0) || !(sweepSec > 0)) return

  async function sweepOnce() {
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
    try {
      // Revoke tokens where lastUsedAt < cutoff or (lastUsedAt is null and createdAt < cutoff)
      const res = await (prisma as any).refreshToken.updateMany({
        where: { revokedAt: null, OR: [ { lastUsedAt: { lt: cutoff } }, { AND: [ { lastUsedAt: null }, { createdAt: { lt: cutoff } } ] } ] },
        data: { revokedAt: new Date() }
      })
      if (res.count > 0) {
        try { const { incCounter } = await import('../services/metrics.service'); for (let i=0;i<res.count;i++) incCounter('session_revokes_total' as any) } catch {}
        app.log.info({ count: res.count }, 'sessions-sweep: revoked stale sessions')
      }
    } catch (e) {
      app.log.warn({ err: e }, 'sessions-sweep error')
    }
  }

  // initial sweep (non-blocking)
  setTimeout(sweepOnce, 5000).unref()
  // periodic sweep
  const timer = setInterval(sweepOnce, sweepSec * 1000)
  timer.unref()
})

