"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = adminTripsRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const metrics_service_1 = require("../../services/metrics.service");
const listQuery = {
    type: 'object',
    properties: {
        limit: { type: 'integer', minimum: 1, maximum: 200, default: 50 },
        cursor: { type: 'string' },
        from: { type: 'string', format: 'date-time' },
        to: { type: 'string', format: 'date-time' },
        city: { type: 'string' },
        status: { type: 'string' },
        riderEmail: { type: 'string' },
        driverEmail: { type: 'string' },
        format: { type: 'string', enum: ['json', 'csv'], default: 'json' }
    }
};
const tripItem = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        status: { type: 'string' },
        riderId: { type: 'string' },
        driverId: { type: 'string' },
        requestedAt: { type: 'string', format: 'date-time' },
        completedAt: { type: 'string', format: 'date-time', nullable: true },
        costUsd: { type: 'number' },
        currency: { type: 'string' }
    }
};
async function adminTripsRoutes(app) {
    app.get('/admin/trips', {
        schema: {
            operationId: 'adminTripsList',
            tags: ['admin'],
            security: [{ bearerAuth: [] }],
            querystring: listQuery,
            response: { 200: { type: 'object', properties: { items: { type: 'array', items: tripItem }, nextCursor: { type: 'string', nullable: true } } }, 401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } }, 403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } } }
        }
    }, async (req, reply) => {
        (0, metrics_service_1.incCounter)('admin_trips_queries_total');
        const q = (req.query || {});
        const limit = Math.min(Math.max(Number(q.limit || 50), 1), 200);
        const cursor = (q.cursor || '');
        const from = q.from ? new Date(String(q.from)) : null;
        const to = q.to ? new Date(String(q.to)) : null;
        const city = q.city ? String(q.city) : undefined;
        const status = q.status ? String(q.status) : undefined;
        const riderEmail = q.riderEmail ? String(q.riderEmail) : undefined;
        const driverEmail = q.driverEmail ? String(q.driverEmail) : undefined;
        let riderId;
        let driverId;
        if (riderEmail) {
            const u = await prisma_1.default.user.findUnique({ where: { email: riderEmail }, select: { id: true } });
            riderId = u?.id;
        }
        if (driverEmail) {
            const u = await prisma_1.default.user.findUnique({ where: { email: driverEmail }, select: { id: true } });
            driverId = u?.id;
        }
        const where = {};
        if (from || to)
            where.requestedAt = { ...(from ? { gte: from } : {}), ...(to ? { lte: to } : {}) };
        if (city)
            where.city = city;
        if (status)
            where.status = status;
        if (riderId)
            where.riderId = riderId;
        if (driverId)
            where.driverId = driverId;
        const items = await prisma_1.default.trip.findMany({
            where,
            take: limit,
            ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
            orderBy: [{ requestedAt: 'desc' }, { id: 'desc' }],
            select: { id: true, status: true, riderId: true, driverId: true, requestedAt: true, completedAt: true, costUsd: true, currency: true, city: true }
        });
        const nextCursor = items.length === limit ? items[items.length - 1].id : null;
        if ((q.format || 'json') === 'csv') {
            (0, metrics_service_1.incCounter)('admin_trips_csv_exports_total');
            const header = 'id,status,riderId,driverId,requestedAt,completedAt,costUsd,currency,city\n';
            const body = items.map((r) => [r.id, r.status, r.riderId || '', r.driverId || '', new Date(r.requestedAt).toISOString(), r.completedAt ? new Date(r.completedAt).toISOString() : '', r.costUsd ?? '', r.currency ?? '', r.city ?? '']
                .map((v) => { const s = String(v); return /[,"]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }).join(',')).join('\n');
            reply.header('Content-Type', 'text/csv; charset=utf-8');
            return reply.send(header + body + '\n');
        }
        return reply.send({ items, nextCursor });
    });
}
//# sourceMappingURL=admin.trips.routes.js.map