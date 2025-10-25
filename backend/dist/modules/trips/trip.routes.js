"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = tripRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const client_1 = require("@prisma/client");
function fail(reply, code, msg) {
    return reply.code(code).send({ error: msg });
}
async function tripRoutes(app) {
    // ---------------------------
    // POST /trips/request  (RIDER autenticado)
    // ---------------------------
    app.post('/trips/request', { schema: { tags: ['trips'] }, preHandler: app.auth.verifyJWT }, async (req, reply) => {
        const riderId = req.user?.id;
        if (!riderId)
            return fail(reply, 401, 'Unauthorized');
        const body = (req.body || {});
        const { origin, destination } = body;
        if (!origin ||
            !destination ||
            typeof origin.lat !== 'number' ||
            typeof origin.lng !== 'number' ||
            typeof destination.lat !== 'number' ||
            typeof destination.lng !== 'number') {
            return fail(reply, 400, 'Body inválido');
        }
        // Buscar conductor IDLE
        const idleDriver = (await prisma_1.default.driverProfile
            .findFirst({
            where: { status: client_1.DriverStatus.IDLE },
            select: { userId: true, id: true },
        })
            .catch(() => null)) || null;
        if (!idleDriver)
            return fail(reply, 400, 'No hay conductores disponibles cerca');
        // Crear trip en estado ASSIGNED
        const trip = await prisma_1.default.trip.create({
            data: {
                riderId,
                driverId: idleDriver.userId,
                status: client_1.TripStatus.ASSIGNED,
                pickupLat: Number(origin.lat),
                pickupLng: Number(origin.lng),
                dropoffLat: Number(destination.lat),
                dropoffLng: Number(destination.lng),
            },
            select: { id: true, status: true },
        });
        return reply.send({ ok: true, trip });
    });
    // ---------------------------
    // POST /trips/:id/accept  (DRIVER)
    // ---------------------------
    app.post('/trips/:id/accept', { schema: { tags: ['trips'] }, preHandler: app.auth.requireRole('DRIVER') }, async (req, reply) => {
        const driverId = req.user?.id;
        const id = req.params.id;
        const trip = await prisma_1.default.trip.findUnique({ where: { id } });
        if (!trip)
            return fail(reply, 404, 'Trip no encontrado');
        if (trip.driverId !== driverId)
            return fail(reply, 403, 'Forbidden');
        if (trip.status !== client_1.TripStatus.ASSIGNED)
            return fail(reply, 400, 'Estado inválido para aceptar');
        await prisma_1.default.trip.update({ where: { id }, data: { status: client_1.TripStatus.ACCEPTED } });
        return reply.send({ ok: true });
    });
    // ---------------------------
    // POST /trips/:id/arrive  (DRIVER)
    // ---------------------------
    app.post('/trips/:id/arrive', { schema: { tags: ['trips'] }, preHandler: app.auth.requireRole('DRIVER') }, async (req, reply) => {
        const driverId = req.user?.id;
        const id = req.params.id;
        const trip = await prisma_1.default.trip.findUnique({ where: { id } });
        if (!trip)
            return fail(reply, 404, 'Trip no encontrado');
        if (trip.driverId !== driverId)
            return fail(reply, 403, 'Forbidden');
        if (trip.status !== client_1.TripStatus.ACCEPTED)
            return fail(reply, 400, 'Estado inválido para llegar');
        await prisma_1.default.trip.update({ where: { id }, data: { status: client_1.TripStatus.ARRIVED } });
        return reply.send({ ok: true });
    });
    // ---------------------------
    // POST /trips/:id/start  (DRIVER)
    // ---------------------------
    app.post('/trips/:id/start', { schema: { tags: ['trips'] }, preHandler: app.auth.requireRole('DRIVER') }, async (req, reply) => {
        const driverId = req.user?.id;
        const id = req.params.id;
        const trip = await prisma_1.default.trip.findUnique({ where: { id } });
        if (!trip)
            return fail(reply, 404, 'Trip no encontrado');
        if (trip.driverId !== driverId)
            return fail(reply, 403, 'Forbidden');
        if (trip.status !== client_1.TripStatus.ARRIVED)
            return fail(reply, 400, 'Estado inválido para iniciar');
        await prisma_1.default.trip.update({
            where: { id },
            data: { status: client_1.TripStatus.STARTED, startedAt: new Date() },
        });
        return reply.send({ ok: true });
    });
    // ---------------------------
    // POST /trips/:id/complete  (DRIVER)
    // ---------------------------
    app.post('/trips/:id/complete', { schema: { tags: ['trips'] }, preHandler: app.auth.requireRole('DRIVER') }, async (req, reply) => {
        const driverId = req.user?.id;
        const id = req.params.id;
        const trip = await prisma_1.default.trip.findUnique({ where: { id } });
        if (!trip)
            return fail(reply, 404, 'Trip no encontrado');
        if (trip.driverId !== driverId)
            return fail(reply, 403, 'Forbidden');
        if (trip.status !== client_1.TripStatus.STARTED)
            return fail(reply, 400, 'Estado inválido para completar');
        await prisma_1.default.trip.update({
            where: { id },
            data: {
                status: client_1.TripStatus.COMPLETED,
                completedAt: new Date(),
                // fareUsd: new Prisma.Decimal(7.5), // si tu modelo lo tuviera
            },
        });
        return reply.send({ ok: true });
    });
}
//# sourceMappingURL=trip.routes.js.map