// src/plugins/trip-supervisor.ts
import fp from 'fastify-plugin'
import prisma from '../lib/prisma'
import { publishTripEvent } from '../services/events.service'
import { haversineKm } from '../utils/geo'
import { sendPushToUser } from '../services/push.service'

const MATCH_RADIUS_M = Number(process.env.MATCH_RADIUS_M || 5000)
const LOCATION_MAX_AGE_MIN = Number(process.env.LOCATION_MAX_AGE_MIN || 10)
const ACCEPT_TIMEOUT_SEC = Number(process.env.ACCEPT_TIMEOUT_SEC || 120)
const ARRIVE_TIMEOUT_SEC = Number(process.env.ARRIVE_TIMEOUT_SEC || 300)
const REASSIGN_MAX_TRIES = Number(process.env.REASSIGN_MAX_TRIES || 1)

export default fp(async (app) => {
  async function ensurePostgisFlag() {
    if ((globalThis as any).__POSTGIS_AVAILABLE__ === undefined) {
      try {
        const chk = await prisma.$queryRaw<{ extname: string }[]>`SELECT extname FROM pg_extension WHERE extname='postgis'`
        ;(globalThis as any).__POSTGIS_AVAILABLE__ = Array.isArray(chk) && chk.length > 0
      } catch {
        ;(globalThis as any).__POSTGIS_AVAILABLE__ = false
      }
    }
  }

  async function findNearestDriver(pickupLat: number, pickupLng: number, maxAgeMin: number, radiusM: number) {
    await ensurePostgisFlag()
    if ((globalThis as any).__POSTGIS_AVAILABLE__) {
      try {
        const nearest = await prisma.$queryRaw<{ id: string; userId: string; meters: number }[]>`
          SELECT dp.id, dp."userId",
                 public.ST_Distance(
                   public.ST_SetSRID(public.ST_MakePoint(${pickupLng}, ${pickupLat}), 4326)::public.geography,
                   public.ST_SetSRID(public.ST_MakePoint(dp."currentLng", dp."currentLat"), 4326)::public.geography
                 ) AS meters
          FROM "DriverProfile" dp
          WHERE dp.status = 'IDLE'
            AND dp."currentLat" IS NOT NULL AND dp."currentLng" IS NOT NULL
            AND dp."locationUpdatedAt" IS NOT NULL
            AND dp."locationUpdatedAt" >= NOW() - (interval '1 minute' * ${maxAgeMin})
            AND public.ST_DWithin(
                public.ST_SetSRID(public.ST_MakePoint(${pickupLng}, ${pickupLat}), 4326)::public.geography,
                public.ST_SetSRID(public.ST_MakePoint(dp."currentLng", dp."currentLat"), 4326)::public.geography,
                ${radiusM}
            )
          ORDER BY meters ASC
          LIMIT 1
        `
        if (nearest && nearest.length > 0) return { id: nearest[0].id, userId: nearest[0].userId }
      } catch (e) {
        app.log.warn({ err: String(e) }, 'trip-supervisor PostGIS failed')
      }
    }
    const cutoff = new Date(Date.now() - maxAgeMin * 60 * 1000)
    const candidates = await prisma.driverProfile.findMany({
      where: {
        status: 'IDLE',
        currentLat: { not: null },
        currentLng: { not: null },
        locationUpdatedAt: { gte: cutoff },
      },
      select: { id: true, userId: true, currentLat: true, currentLng: true },
      take: 200,
    })
    let best: { id: string; userId: string } | null = null
    let bestDist = Number.POSITIVE_INFINITY
    for (const c of candidates) {
      const dKm = haversineKm(pickupLat, pickupLng, Number(c.currentLat as any), Number(c.currentLng as any))
      const dM = dKm * 1000
      if (dM <= radiusM && dM < bestDist) {
        bestDist = dM
        best = { id: c.id, userId: c.userId }
      }
    }
    return best
  }

  async function tick() {
    const now = Date.now()
    try {
      // Reassign or cancel ASSIGNED not accepted within timeout
      const assigned = await prisma.trip.findMany({
        where: { status: 'ASSIGNED' },
        take: 50,
      })
      for (const t of assigned) {
        const ageSec = Math.floor((now - new Date((t as any).requestedAt as any).getTime()) / 1000)
        if (ageSec < ACCEPT_TIMEOUT_SEC) continue
        const reassignCount = Number(((t as any).pricingSnapshot as any)?.reassignCount || 0)
        if (reassignCount >= REASSIGN_MAX_TRIES) {
          await prisma.trip.update({ where: { id: t.id }, data: { status: 'CANCELED', canceledAt: new Date(), cancelReason: 'TIMEOUT_NO_DRIVER' } })
          publishTripEvent(t.id, { type: 'CANCELED', status: 'CANCELED', at: new Date().toISOString(), data: { reason: 'TIMEOUT_NO_DRIVER' } })
          await sendPushToUser(t.riderId, { title: 'Sin conductor disponible', body: 'No encontramos conductor, intenta nuevamente.' })
          continue
        }
        const cand = await findNearestDriver(Number(t.pickupLat as any), Number(t.pickupLng as any), LOCATION_MAX_AGE_MIN, MATCH_RADIUS_M)
        if (cand && cand.userId !== t.driverId) {
          await prisma.trip.update({ where: { id: t.id }, data: { driverId: cand.userId, pricingSnapshot: { ...(t as any).pricingSnapshot, reassignCount: reassignCount + 1 } as any } })
          publishTripEvent(t.id, { type: 'REASSIGNED', status: 'ASSIGNED', at: new Date().toISOString(), data: { driverId: cand.userId } })
          await sendPushToUser(t.riderId, { title: 'Nuevo conductor asignado', body: 'Hemos reasignado tu viaje.' })
        } else {
          await prisma.trip.update({ where: { id: t.id }, data: { status: 'CANCELED', canceledAt: new Date(), cancelReason: 'TIMEOUT_NO_DRIVER' } })
          publishTripEvent(t.id, { type: 'CANCELED', status: 'CANCELED', at: new Date().toISOString(), data: { reason: 'TIMEOUT_NO_DRIVER' } })
          await sendPushToUser(t.riderId, { title: 'Sin conductor disponible', body: 'No encontramos conductor, intenta nuevamente.' })
        }
      }

      // Cancel ACCEPTED not arrived within timeout
      const accepted = await prisma.trip.findMany({ where: { status: 'ACCEPTED' }, take: 50 })
      for (const t of accepted) {
        const acceptAt = (t as any).acceptedAt as Date | null
        if (!acceptAt) continue
        const ageSec = Math.floor((now - acceptAt.getTime()) / 1000)
        if (ageSec < ARRIVE_TIMEOUT_SEC) continue
        await prisma.trip.update({ where: { id: t.id }, data: { status: 'CANCELED', canceledAt: new Date(), cancelReason: 'DRIVER_NO_SHOW' } })
        publishTripEvent(t.id, { type: 'CANCELED', status: 'CANCELED', at: new Date().toISOString(), data: { reason: 'DRIVER_NO_SHOW' } })
        await sendPushToUser(t.riderId, { title: 'Conductor no llegó', body: 'Tu viaje fue cancelado, solicita otro.' })
      }
    } catch (e) {
      app.log.warn({ err: String(e) }, 'trip-supervisor tick failed')
    }
  }

  const interval = Number(process.env.SUPERVISOR_INTERVAL_SEC || 30)
  const timer = setInterval(tick, Math.max(10, interval) * 1000)
  app.addHook('onClose', async () => clearInterval(timer))
})
