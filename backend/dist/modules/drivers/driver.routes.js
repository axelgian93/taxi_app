"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = driverRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
// Extrae userId desde req.user (JWT), header x-user-id, o verificando Bearer manualmente
async function getUserId(app, req) {
    const fromReq = req.user?.id;
    if (fromReq)
        return fromReq;
    // 1) Header directo (Ãºtil en pruebas manuales)
    const fromHeader = req.headers?.['x-user-id']?.trim();
    if (fromHeader)
        return fromHeader;
    // 2) Bearer token (lo que usa tu smoke-e2e)
    const auth = req.headers?.authorization || '';
    const m = auth.match(/^Bearer\s+(.+)$/i);
    if (!m)
        return undefined;
    // Si registraste @fastify/jwt, Ãºsalo para verificar
    try {
        // @ts-ignore - fastify-jwt aÃ±ade .jwt al server
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
    // Si vinieron coordenadas, guardamos histÃ³rico
    if (typeof body.lat === 'number' && typeof body.lng === 'number') {
        await prisma_1.default.driverLocationHistory.create({
            data: {
                driverId: driverProfile.id,
                lat: body.lat,
                lng: body.lng,
            },
        });
    }
    // Actualizamos status (enum -> usar set)
    await prisma_1.default.driverProfile.update({
        where: { id: driverProfile.id },
        data: { status: { set: status } },
    });
    return reply.send({ ok: true });
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
        200: { type: 'object', properties: { ok: { type: 'boolean' } } },
    };
    // /drivers/status (original)
    app.post('/drivers/status', { schema: { tags: ['drivers'], summary: 'Actualizar estado del driver', description: 'Driver reporta su estado (IDLE/ON_TRIP/etc.). Requiere JWT.', body: bodySchema, response: responseOk }, preHandler: app.auth.verifyJWT }, (req, reply) => handleReport(app, req, reply));
    // /drivers/location (alias que usa el smoke)
    app.post('/drivers/location', { schema: { tags: ['drivers'], summary: 'Actualizar estado del driver', description: 'Driver reporta su estado (IDLE/ON_TRIP/etc.). Requiere JWT.', body: bodySchema, response: responseOk }, preHandler: app.auth.verifyJWT }, (req, reply) => handleReport(app, req, reply));
}
//# sourceMappingURL=driver.routes.js.map