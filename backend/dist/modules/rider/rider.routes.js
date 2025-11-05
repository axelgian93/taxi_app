"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = riderRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
async function riderRoutes(app) {
    function encodeCursor(id, requestedAt) {
        return Buffer.from(JSON.stringify({ id, requestedAt: requestedAt.toISOString() }), 'utf8').toString('base64');
    }
    function decodeCursor(raw) {
        if (!raw)
            return null;
        try {
            const obj = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
            const id = String(obj.id || '');
            const atStr = String(obj.requestedAt || '');
            const at = new Date(atStr);
            if (!id || isNaN(at.getTime()))
                return null;
            return { id, requestedAt: at };
        }
        catch {
            return null;
        }
    }
    // GET /rider/my-trips — últimos viajes del rider autenticado
    app.get('/rider/my-trips', {
        schema: {
            operationId: 'riderMyTrips',
            tags: ['rider'],
            summary: 'Mis viajes (rider)',
            description: 'Lista los últimos viajes del rider autenticado.',
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
                                    status: { type: 'string', enum: ['REQUESTED', 'ASSIGNED', 'ACCEPTED', 'ARRIVED', 'STARTED', 'COMPLETED', 'CANCELED'] },
                                    pickupLat: { type: 'number' },
                                    pickupLng: { type: 'number' },
                                    dropoffLat: { type: 'number' },
                                    dropoffLng: { type: 'number' },
                                    requestedAt: { type: 'string', format: 'date-time' },
                                    completedAt: { type: 'string', format: 'date-time', nullable: true },
                                    costUsd: { type: 'number', nullable: true },
                                    currency: { type: 'string', nullable: true },
                                    preferredMethod: { type: 'string', enum: ['CASH', 'CARD'], nullable: true },
                                }
                            }
                        },
                        nextCursor: { type: 'string', nullable: true }
                    },
                    example: {
                        items: [
                            { id: 'trp_123', status: 'COMPLETED', pickupLat: -2.17, pickupLng: -79.92, dropoffLat: -2.19, dropoffLng: -79.89, requestedAt: '2025-01-01T12:00:00.000Z', completedAt: '2025-01-01T12:30:00.000Z', costUsd: 5.5, currency: 'USD', preferredMethod: 'CASH' }
                        ],
                        nextCursor: 'eyJpZCI6InRycF8xMjMiLCJyZXF1ZXN0ZWRBdCI6IjIwMjUtMDEtMDFUMTI6MzA6MDAuMDAwWiJ9'
                    }
                },
                401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } },
                403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } },
            }
        },
        preHandler: app.auth.requireRole('RIDER')
    }, async (req, reply) => {
        const userId = req.user?.id;
        const q = (req.query || {});
        const lim = Math.min(Math.max(Number(q.limit || 20), 1), 100);
        const cur = decodeCursor(q.cursor);
        const where = { riderId: userId };
        if (cur) {
            where.OR = [
                { requestedAt: { lt: cur.requestedAt } },
                { AND: [{ requestedAt: cur.requestedAt }, { id: { lt: cur.id } }] }
            ];
        }
        const rows = await prisma_1.default.trip.findMany({
            where,
            orderBy: [{ requestedAt: 'desc' }, { id: 'desc' }],
            take: lim,
            select: { id: true, status: true, pickupLat: true, pickupLng: true, dropoffLat: true, dropoffLng: true, requestedAt: true, completedAt: true, costUsd: true, currency: true, pricingSnapshot: true }
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
            preferredMethod: r.pricingSnapshot?.preferredMethod ?? null,
        }));
        const last = rows[rows.length - 1];
        const nextCursor = last ? encodeCursor(last.id, last.requestedAt) : null;
        return reply.send({ items, nextCursor });
    });
}
//# sourceMappingURL=rider.routes.js.map