"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = driverRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const events_service_1 = require("../../services/events.service");
// Extrae userId desde req.user (JWT), header x-user-id, o verificando Bearer manualmente
async function getUserId(app, req) {
    const fromReq = req.user?.id;
    if (fromReq)
        return fromReq;
    // 1) Header directo (ÃƒÂºtil en pruebas manuales)
    const fromHeader = req.headers?.['x-user-id']?.trim();
    if (fromHeader)
        return fromHeader;
    // 2) Bearer token (lo que usa tu smoke-e2e)
    const auth = req.headers?.authorization || '';
    const m = auth.match(/^Bearer\s+(.+)$/i);
    if (!m)
        return undefined;
    // Si registraste @fastify/jwt, ÃƒÂºsalo para verificar
    try {
        // @ts-ignore - fastify-jwt aÃƒÂ±ade .jwt al server
        const decoded = await app.jwt?.verify(m[1]);
        const id = decoded?.id;
        if (typeof id === 'string' && id)
            return id;
    }
    catch {
        // ignore: retornaremos undefined -> 401
    }
    return undefined;
}
async function handleReport(app, req, reply) {
    const userId = await getUserId(app, req);
    if (!userId)
        return reply.code(401).send({ error: 'Unauthorized' });
    const body = (req.body || {});
    const status = (body.status ?? 'IDLE');
    // Throttle frequent updates per driver
    const minIntervalMs = Number(process.env.DRIVER_LOCATION_MIN_INTERVAL_MS || 2000);
    globalThis.__driverLastLoc = globalThis.__driverLastLoc || new Map();
    const lastMap = globalThis.__driverLastLoc;
    const now = Date.now();
    const last = lastMap.get(userId) || 0;
    const tooSoon = now - last < minIntervalMs;
    // Aseguramos que exista el DriverProfile
    const driverProfile = await prisma_1.default.driverProfile.upsert({
        where: { userId },
        update: {},
        create: {
            userId,
            rating: 5.0,
            totalTrips: 0,
            status: 'IDLE',
            licenseNumber: `PENDING-${userId}`,
        },
    });
    // Si vinieron coordenadas, validamos y guardamos histórico (respetando throttling)
    if (typeof body.lat === 'number' && typeof body.lng === 'number') {
        const lat = Number(body.lat);
        const lng = Number(body.lng);
        const valid = isFinite(lat) && isFinite(lng) && lat <= 90 && lat >= -90 && lng <= 180 && lng >= -180;
        if (!valid)
            return reply.code(400).send({ error: 'Invalid lat/lng' });
        if (!tooSoon) {
            await prisma_1.default.driverLocationHistory.create({ data: { driverId: driverProfile.id, lat: lat, lng: lng } });
            await prisma_1.default.driverProfile.update({ where: { id: driverProfile.id }, data: { currentLat: lat, currentLng: lng, locationUpdatedAt: new Date() } });
            const active = await prisma_1.default.trip.findFirst({ where: { driverId: userId, status: { in: ['ACCEPTED', 'ARRIVED', 'STARTED'] } }, orderBy: { requestedAt: 'desc' }, select: { id: true } });
            if (active?.id)
                (0, events_service_1.publishTripEvent)(active.id, { type: 'LOCATION', at: new Date().toISOString(), data: { lat, lng } });
        }
    }
    // Actualizamos status (enum -> usar set)
    await prisma_1.default.driverProfile.update({
        where: { id: driverProfile.id },
        data: { status: { set: status } },
    });
    if (!tooSoon)
        lastMap.set(userId, now);
    return reply.code(tooSoon ? 202 : 200).send({ ok: true });
}
async function driverRoutes(app) {
    // Esquema simple para Swagger
    const bodySchema = {
        type: 'object',
        properties: {
            lat: { type: 'number', example: -2.17 },
            lng: { type: 'number', example: -79.92 },
            status: {
                type: 'string',
                enum: ['IDLE', 'ASSIGNED', 'ARRIVED', 'ON_TRIP', 'OFFLINE'],
                example: 'IDLE',
            },
        },
        additionalProperties: false,
    };
    const responseOk = {
        200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } },
        401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } }
    };
    // /drivers/status (original)
    app.post('/drivers/status', {
        schema: { operationId: 'driverUpdateStatus', tags: ['drivers'], summary: 'Actualizar estado del driver', description: 'Driver reporta su estado (IDLE/ON_TRIP/etc.). Requiere JWT.', body: bodySchema, response: responseOk },
        preHandler: app.auth.verifyJWT,
        config: {
            rateLimit: {
                max: Number(process.env.RL_DRIVER_LOC_MAX || 120),
                timeWindow: process.env.RL_DRIVER_LOC_WIN || '1 minute',
                keyGenerator: (req) => `drloc:${req.user?.id || req.ip}`,
            }
        }
    }, (req, reply) => handleReport(app, req, reply));
    // /drivers/location (alias que usa el smoke)
    app.post('/drivers/location', {
        schema: { operationId: 'driverUpdateLocation', tags: ['drivers'], summary: 'Actualizar estado del driver', description: 'Driver reporta su estado (IDLE/ON_TRIP/etc.). Requiere JWT.', body: bodySchema, response: responseOk },
        preHandler: app.auth.verifyJWT,
        config: {
            rateLimit: {
                max: Number(process.env.RL_DRIVER_LOC_MAX || 120),
                timeWindow: process.env.RL_DRIVER_LOC_WIN || '1 minute',
                keyGenerator: (req) => `drloc:${req.user?.id || req.ip}`,
            }
        }
    }, (req, reply) => handleReport(app, req, reply));
    // Lista de viajes activos asignados al driver actual
    app.get('/drivers/my-trips/active', {
        schema: {
            operationId: 'driverMyTripsActive',
            tags: ['drivers'],
            summary: 'Mis viajes activos',
            description: 'Lista viajes del driver con estado ACCEPTED/ARRIVED/STARTED.',
            response: {
                200: {
                    type: 'object',
                    properties: {
                        items: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    status: { type: 'string', enum: ['ACCEPTED', 'ARRIVED', 'STARTED'] },
                                    pickupLat: { type: 'number' },
                                    pickupLng: { type: 'number' },
                                    dropoffLat: { type: 'number' },
                                    dropoffLng: { type: 'number' },
                                    requestedAt: { type: 'string', format: 'date-time' },
                                    preferredMethod: { type: 'string', enum: ['CASH', 'CARD'], nullable: true },
                                }
                            }
                        }
                    },
                    example: { items: [{ id: 'trp_123', status: 'ACCEPTED', pickupLat: -2.17, pickupLng: -79.92, dropoffLat: -2.19, dropoffLng: -79.89, requestedAt: '2025-01-01T12:00:00.000Z', preferredMethod: 'CARD' }] }
                },
                401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } },
                403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } },
            }
        },
        preHandler: app.auth.requireRole('DRIVER')
    }, async (req, reply) => {
        const userId = req.user?.id;
        const rows = await prisma_1.default.trip.findMany({
            where: { driverId: userId, status: { in: ['ACCEPTED', 'ARRIVED', 'STARTED'] } },
            orderBy: { requestedAt: 'desc' },
            take: 20,
            select: { id: true, status: true, pickupLat: true, pickupLng: true, dropoffLat: true, dropoffLng: true, requestedAt: true, pricingSnapshot: true }
        });
        const items = rows.map((r) => ({
            id: r.id,
            status: r.status,
            pickupLat: Number(r.pickupLat),
            pickupLng: Number(r.pickupLng),
            dropoffLat: Number(r.dropoffLat),
            dropoffLng: Number(r.dropoffLng),
            requestedAt: r.requestedAt,
            preferredMethod: r.pricingSnapshot?.preferredMethod ?? null,
        }));
        return reply.send({ items });
    });
    // Historial del driver (COMPLETED o CANCELED)
    app.get('/drivers/my-trips/history', {
        schema: {
            operationId: 'driverMyTripsHistory',
            tags: ['drivers'],
            summary: 'Mis viajes (historial)',
            description: 'Lista de viajes completados o cancelados para el driver autenticado.',
            querystring: { type: 'object', properties: { limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 }, cursor: { type: 'string', nullable: true } } },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        items: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    status: { type: 'string', enum: ['COMPLETED', 'CANCELED'] },
                                    pickupLat: { type: 'number' },
                                    pickupLng: { type: 'number' },
                                    dropoffLat: { type: 'number' },
                                    dropoffLng: { type: 'number' },
                                    requestedAt: { type: 'string', format: 'date-time' },
                                    completedAt: { type: 'string', format: 'date-time', nullable: true },
                                    costUsd: { type: 'number', nullable: true },
                                    currency: { type: 'string', nullable: true },
                                }
                            }
                        },
                        nextCursor: { type: 'string', nullable: true }
                    }
                },
                401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } },
                403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } },
            }
        },
        preHandler: app.auth.requireRole('DRIVER')
    }, async (req, reply) => {
        const userId = req.user?.id;
        function enc(id, at) { return Buffer.from(JSON.stringify({ id, requestedAt: at.toISOString() }), 'utf8').toString('base64'); }
        function dec(raw) {
            if (!raw)
                return null;
            try {
                const o = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
                const id = String(o.id || '');
                const at = new Date(String(o.requestedAt || ''));
                if (!id || isNaN(at.getTime()))
                    return null;
                return { id, requestedAt: at };
            }
            catch {
                return null;
            }
        }
        const q = (req.query || {});
        const lim = Math.min(Math.max(Number(q.limit || 20), 1), 100);
        const cur = dec(q.cursor);
        const where = { driverId: userId, status: { in: ['COMPLETED', 'CANCELED'] } };
        if (cur) {
            where.OR = [{ requestedAt: { lt: cur.requestedAt } }, { AND: [{ requestedAt: cur.requestedAt }, { id: { lt: cur.id } }] }];
        }
        const rows = await prisma_1.default.trip.findMany({
            where,
            orderBy: [{ requestedAt: 'desc' }, { id: 'desc' }],
            take: lim,
            select: { id: true, status: true, pickupLat: true, pickupLng: true, dropoffLat: true, dropoffLng: true, requestedAt: true, completedAt: true, costUsd: true, currency: true }
        });
        const items = rows.map((r) => ({
            id: r.id,
            status: r.status,
            pickupLat: Number(r.pickupLat),
            pickupLng: Number(r.pickupLng),
            dropoffLat: Number(r.dropoffLat),
            dropoffLng: Number(r.dropoffLng),
            requestedAt: r.requestedAt,
            completedAt: r.completedAt ?? null,
            costUsd: r.costUsd ?? null,
            currency: r.currency ?? null,
        }));
        const last = rows[rows.length - 1];
        const nextCursor = last ? enc(last.id, last.requestedAt) : null;
        return reply.send({ items, nextCursor });
    });
}
//# sourceMappingURL=driver.routes.js.map