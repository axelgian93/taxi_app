"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/trip-supervisor.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const events_service_1 = require("../services/events.service");
const geo_1 = require("../utils/geo");
const push_service_1 = require("../services/push.service");
const MATCH_RADIUS_M = Number(process.env.MATCH_RADIUS_M || 5000);
const LOCATION_MAX_AGE_MIN = Number(process.env.LOCATION_MAX_AGE_MIN || 10);
const ACCEPT_TIMEOUT_SEC = Number(process.env.ACCEPT_TIMEOUT_SEC || 120);
const ARRIVE_TIMEOUT_SEC = Number(process.env.ARRIVE_TIMEOUT_SEC || 300);
const REASSIGN_MAX_TRIES = Number(process.env.REASSIGN_MAX_TRIES || 1);
exports.default = (0, fastify_plugin_1.default)(async (app) => {
    async function ensurePostgisFlag() {
        if (globalThis.__POSTGIS_AVAILABLE__ === undefined) {
            try {
                const chk = await prisma_1.default.$queryRaw `SELECT extname FROM pg_extension WHERE extname='postgis'`;
                globalThis.__POSTGIS_AVAILABLE__ = Array.isArray(chk) && chk.length > 0;
            }
            catch {
                ;
                globalThis.__POSTGIS_AVAILABLE__ = false;
            }
        }
    }
    async function findNearestDriver(pickupLat, pickupLng, maxAgeMin, radiusM) {
        await ensurePostgisFlag();
        if (globalThis.__POSTGIS_AVAILABLE__) {
            try {
                const nearest = await prisma_1.default.$queryRaw `
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
        `;
                if (nearest && nearest.length > 0)
                    return { id: nearest[0].id, userId: nearest[0].userId };
            }
            catch (e) {
                app.log.warn({ err: String(e) }, 'trip-supervisor PostGIS failed');
            }
        }
        const cutoff = new Date(Date.now() - maxAgeMin * 60 * 1000);
        const candidates = await prisma_1.default.driverProfile.findMany({
            where: {
                status: 'IDLE',
                currentLat: { not: null },
                currentLng: { not: null },
                locationUpdatedAt: { gte: cutoff },
            },
            select: { id: true, userId: true, currentLat: true, currentLng: true },
            take: 200,
        });
        let best = null;
        let bestDist = Number.POSITIVE_INFINITY;
        for (const c of candidates) {
            const dKm = (0, geo_1.haversineKm)(pickupLat, pickupLng, Number(c.currentLat), Number(c.currentLng));
            const dM = dKm * 1000;
            if (dM <= radiusM && dM < bestDist) {
                bestDist = dM;
                best = { id: c.id, userId: c.userId };
            }
        }
        return best;
    }
    async function tick() {
        const now = Date.now();
        try {
            // Reassign or cancel ASSIGNED not accepted within timeout
            const assigned = await prisma_1.default.trip.findMany({
                where: { status: 'ASSIGNED' },
                take: 50,
            });
            for (const t of assigned) {
                const ageSec = Math.floor((now - new Date(t.requestedAt).getTime()) / 1000);
                if (ageSec < ACCEPT_TIMEOUT_SEC)
                    continue;
                const reassignCount = Number(t.pricingSnapshot?.reassignCount || 0);
                if (reassignCount >= REASSIGN_MAX_TRIES) {
                    await prisma_1.default.trip.update({ where: { id: t.id }, data: { status: 'CANCELED', canceledAt: new Date(), cancelReason: 'TIMEOUT_NO_DRIVER' } });
                    (0, events_service_1.publishTripEvent)(t.id, { type: 'CANCELED', status: 'CANCELED', at: new Date().toISOString(), data: { reason: 'TIMEOUT_NO_DRIVER' } });
                    await (0, push_service_1.sendPushToUser)(t.riderId, { title: 'Sin conductor disponible', body: 'No encontramos conductor, intenta nuevamente.' });
                    continue;
                }
                const cand = await findNearestDriver(Number(t.pickupLat), Number(t.pickupLng), LOCATION_MAX_AGE_MIN, MATCH_RADIUS_M);
                if (cand && cand.userId !== t.driverId) {
                    await prisma_1.default.trip.update({ where: { id: t.id }, data: { driverId: cand.userId, pricingSnapshot: { ...t.pricingSnapshot, reassignCount: reassignCount + 1 } } });
                    (0, events_service_1.publishTripEvent)(t.id, { type: 'REASSIGNED', status: 'ASSIGNED', at: new Date().toISOString(), data: { driverId: cand.userId } });
                    await (0, push_service_1.sendPushToUser)(t.riderId, { title: 'Nuevo conductor asignado', body: 'Hemos reasignado tu viaje.' });
                }
                else {
                    await prisma_1.default.trip.update({ where: { id: t.id }, data: { status: 'CANCELED', canceledAt: new Date(), cancelReason: 'TIMEOUT_NO_DRIVER' } });
                    (0, events_service_1.publishTripEvent)(t.id, { type: 'CANCELED', status: 'CANCELED', at: new Date().toISOString(), data: { reason: 'TIMEOUT_NO_DRIVER' } });
                    await (0, push_service_1.sendPushToUser)(t.riderId, { title: 'Sin conductor disponible', body: 'No encontramos conductor, intenta nuevamente.' });
                }
            }
            // Cancel ACCEPTED not arrived within timeout
            const accepted = await prisma_1.default.trip.findMany({ where: { status: 'ACCEPTED' }, take: 50 });
            for (const t of accepted) {
                const acceptAt = t.acceptedAt;
                if (!acceptAt)
                    continue;
                const ageSec = Math.floor((now - acceptAt.getTime()) / 1000);
                if (ageSec < ARRIVE_TIMEOUT_SEC)
                    continue;
                await prisma_1.default.trip.update({ where: { id: t.id }, data: { status: 'CANCELED', canceledAt: new Date(), cancelReason: 'DRIVER_NO_SHOW' } });
                (0, events_service_1.publishTripEvent)(t.id, { type: 'CANCELED', status: 'CANCELED', at: new Date().toISOString(), data: { reason: 'DRIVER_NO_SHOW' } });
                await (0, push_service_1.sendPushToUser)(t.riderId, { title: 'Conductor no llegó', body: 'Tu viaje fue cancelado, solicita otro.' });
            }
        }
        catch (e) {
            app.log.warn({ err: String(e) }, 'trip-supervisor tick failed');
        }
    }
    const interval = Number(process.env.SUPERVISOR_INTERVAL_SEC || 30);
    const timer = setInterval(tick, Math.max(10, interval) * 1000);
    app.addHook('onClose', async () => clearInterval(timer));
});
//# sourceMappingURL=trip-supervisor.js.map