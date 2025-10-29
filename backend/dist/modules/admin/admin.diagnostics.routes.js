"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = adminDiagnosticsRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const metrics_service_1 = require("../../services/metrics.service");
const haversine_1 = require("../../utils/haversine");
async function adminDiagnosticsRoutes(app) {
    const respSchema = {
        type: 'object',
        properties: {
            postgisAvailable: { type: 'boolean' },
            env: {
                type: 'object',
                properties: {
                    MATCH_RADIUS_M: { type: 'integer' },
                    LOCATION_MAX_AGE_MIN: { type: 'integer' },
                },
            },
            counters: { type: 'object', additionalProperties: { type: 'integer' } },
        },
    };
    app.get('/admin/diagnostics/matching', { schema: { operationId: 'adminDiagnosticsMatching', tags: ['admin'], summary: 'Diagnostics matching', description: 'Estado de PostGIS y parÃ¡metros de matching (env) + contadores de uso.', response: { 200: respSchema, 401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } }, 403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } } } }, preHandler: app.auth.requireRole('ADMIN') }, async (_req, reply) => {
        let postgisAvailable = false;
        try {
            const r = await prisma_1.default.$queryRaw `SELECT extname FROM pg_extension WHERE extname='postgis'`;
            postgisAvailable = Array.isArray(r) && r.length > 0;
        }
        catch {
            postgisAvailable = false;
        }
        const data = {
            postgisAvailable,
            env: {
                MATCH_RADIUS_M: Number(process.env.MATCH_RADIUS_M || 5000),
                LOCATION_MAX_AGE_MIN: Number(process.env.LOCATION_MAX_AGE_MIN || 10),
            },
            counters: (0, metrics_service_1.getCounters)(),
        };
        return reply.send(data);
    });
    // Force a matching test with provided coordinates. Does not create trips.
    app.post('/admin/diagnostics/matching/test', {
        schema: {
            operationId: 'adminDiagnosticsMatchingTest',
            tags: ['admin'],
            summary: 'Probar matching (PostGIS/Haversine/Idle)',
            description: 'Intenta encontrar el driver más cercano usando PostGIS si está disponible; de lo contrario cae a Haversine y finalmente idle fallback. Incrementa contadores de métricas según el camino usado.',
            body: {
                type: 'object',
                required: ['pickupLat', 'pickupLng'],
                properties: {
                    pickupLat: { type: 'number', example: -2.17 },
                    pickupLng: { type: 'number', example: -79.92 },
                    radiusM: { type: 'number', default: 5000 },
                    maxAgeMin: { type: 'number', default: 10 },
                },
                additionalProperties: false,
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        postgisAvailable: { type: 'boolean' },
                        modeUsed: { type: 'string', enum: ['POSTGIS', 'HAVERSINE', 'IDLE'] },
                        driverId: { type: 'string', nullable: true },
                        meters: { type: 'number', nullable: true },
                        candidatesChecked: { type: 'number', nullable: true },
                    },
                    example: { postgisAvailable: true, modeUsed: 'POSTGIS', driverId: 'usr_123', meters: 120.3 }
                },
                401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } },
                403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } },
            },
        },
        preHandler: app.auth.requireRole('ADMIN'),
    }, async (req, reply) => {
        const b = (req.body || {});
        const pickupLat = Number(b.pickupLat);
        const pickupLng = Number(b.pickupLng);
        const radiusM = Number(b.radiusM ?? 5000);
        const maxAgeMin = Number(b.maxAgeMin ?? 10);
        let postgisAvailable = false;
        try {
            const r = await prisma_1.default.$queryRaw `SELECT extname FROM pg_extension WHERE extname='postgis'`;
            postgisAvailable = Array.isArray(r) && r.length > 0;
        }
        catch {
            postgisAvailable = false;
        }
        if (postgisAvailable) {
            try {
                const nearest = await prisma_1.default.$queryRaw `
            SELECT dp."userId",
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
                if (nearest && nearest.length > 0) {
                    (0, metrics_service_1.incCounter)('matching_postgis');
                    return reply.send({ postgisAvailable, modeUsed: 'POSTGIS', driverId: nearest[0].userId, meters: nearest[0].meters });
                }
            }
            catch {
                // fallthrough
            }
        }
        // Haversine fallback
        const cutoff = new Date(Date.now() - maxAgeMin * 60 * 1000);
        const candidates = await prisma_1.default.driverProfile.findMany({
            where: { status: 'IDLE', currentLat: { not: null }, currentLng: { not: null }, locationUpdatedAt: { gte: cutoff } },
            select: { userId: true, currentLat: true, currentLng: true },
            take: 200,
            orderBy: { locationUpdatedAt: 'desc' },
        });
        let best = null;
        let bestDist = Number.POSITIVE_INFINITY;
        for (const c of candidates) {
            const dKm = (0, haversine_1.haversineKm)(pickupLat, pickupLng, Number(c.currentLat), Number(c.currentLng));
            if (dKm < bestDist) {
                bestDist = dKm;
                best = c.userId;
            }
        }
        if (best) {
            (0, metrics_service_1.incCounter)('matching_haversine');
            return reply.send({ postgisAvailable, modeUsed: 'HAVERSINE', driverId: best, meters: bestDist * 1000, candidatesChecked: candidates.length });
        }
        (0, metrics_service_1.incCounter)('matching_idle_fallback');
        return reply.send({ postgisAvailable, modeUsed: 'IDLE', driverId: null, meters: null, candidatesChecked: candidates.length });
    });
}
//# sourceMappingURL=admin.diagnostics.routes.js.map