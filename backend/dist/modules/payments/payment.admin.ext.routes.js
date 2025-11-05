"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = paymentAdminExtRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
async function paymentAdminExtRoutes(app) {
    const listQuery = {
        type: 'object',
        properties: {
            userId: { type: 'string' },
            status: { type: 'string', enum: ['PENDING', 'AUTHORIZED', 'PAID', 'FAILED', 'REFUNDED'] },
            method: { type: 'string' },
            provider: { type: 'string' },
            riderEmail: { type: 'string' },
            driverEmail: { type: 'string' },
            city: { type: 'string' },
            from: { type: 'string', format: 'date-time' },
            to: { type: 'string', format: 'date-time' },
            limit: { type: 'integer', minimum: 1, maximum: 200, default: 50 },
            cursor: { type: 'string' },
            format: { type: 'string', enum: ['json', 'csv'], default: 'json' },
        },
        additionalProperties: false,
    };
    app.get('/admin/payments/extended', {
        schema: { operationId: 'paymentsListExtended', tags: ['payments'], summary: 'Listar pagos (ADMIN, extended)', description: 'Lista pagos con filtros adicionales (método, proveedor, riderEmail, driverEmail) y CSV.', querystring: listQuery },
        preHandler: app.auth.requireRole('ADMIN')
    }, async (req, reply) => {
        const { userId, status, method, provider, riderEmail, driverEmail, city, from, to, limit = 50, cursor, format = 'json' } = req.query;
        const where = {};
        if (status)
            where.status = status;
        if (method)
            where.method = method;
        if (provider)
            where.provider = provider;
        if (from || to)
            where.createdAt = { ...(from ? { gte: new Date(from) } : {}), ...(to ? { lte: new Date(to) } : {}) };
        const tripWhere = {};
        if (userId) {
            tripWhere.OR = [{ riderId: userId }, { driverId: userId }];
        }
        if (city) {
            tripWhere.pricingSnapshot = { path: ['city'], equals: city };
        }
        let riderId;
        let driverId;
        if (riderEmail) {
            const u = await prisma_1.default.user.findUnique({ where: { email: String(riderEmail) }, select: { id: true } });
            riderId = u?.id;
        }
        if (driverEmail) {
            const u = await prisma_1.default.user.findUnique({ where: { email: String(driverEmail) }, select: { id: true } });
            driverId = u?.id;
        }
        if (riderId)
            tripWhere.riderId = riderId;
        if (driverId)
            tripWhere.driverId = driverId;
        if (Object.keys(tripWhere).length > 0)
            where.trip = tripWhere;
        const items = await prisma_1.default.payment.findMany({
            where,
            take: limit,
            ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
            orderBy: { createdAt: 'desc' },
            select: { id: true, tripId: true, amountUsd: true, status: true, method: true, provider: true, externalId: true, createdAt: true, updatedAt: true, trip: { select: { riderId: true, driverId: true } } }
        });
        const riderIds = Array.from(new Set(items.map((p) => p.trip?.riderId).filter(Boolean)));
        const driverIds = Array.from(new Set(items.map((p) => p.trip?.driverId).filter(Boolean)));
        const users = await prisma_1.default.user.findMany({ where: { id: { in: [...riderIds, ...driverIds] } }, select: { id: true, email: true } });
        const emailById = new Map(users.map(u => [u.id, u.email]));
        const mapped = items.map((p) => {
            const isAuthorized = p.status === 'AUTHORIZED';
            const isPaid = p.status === 'PAID';
            const isFailed = p.status === 'FAILED';
            const providerDisplay = p.provider === 'Stripe' ? 'Stripe' : p.method === 'CASH' ? 'Cash' : p.method === 'TRANSFER' ? 'Bank' : (p.provider || 'Unknown');
            const capturable = p.provider === 'Stripe' && p.status === 'AUTHORIZED' && Boolean(p.externalId);
            const riderEmailOut = p.trip?.riderId ? (emailById.get(p.trip.riderId) || null) : null;
            const driverEmailOut = p.trip?.driverId ? (emailById.get(p.trip.driverId) || null) : null;
            return { id: p.id, tripId: p.tripId, amountUsd: p.amountUsd, status: p.status, method: p.method, provider: p.provider, externalId: p.externalId, createdAt: p.createdAt, updatedAt: p.updatedAt, isAuthorized, isPaid, isFailed, providerDisplay, capturable, riderEmail: riderEmailOut, driverEmail: driverEmailOut };
        });
        if (format === 'csv') {
            const header = ['id', 'tripId', 'amountUsd', 'status', 'method', 'provider', 'externalId', 'createdAt', 'updatedAt', 'isAuthorized', 'isPaid', 'isFailed', 'providerDisplay', 'capturable', 'riderEmail', 'driverEmail'];
            const rows = mapped.map(p => [p.id, p.tripId, String(p.amountUsd ?? ''), p.status, p.method, p.provider ?? '', p.externalId ?? '', p.createdAt?.toISOString?.() || String(p.createdAt), p.updatedAt?.toISOString?.() || String(p.updatedAt), String(p.isAuthorized), String(p.isPaid), String(p.isFailed), p.providerDisplay, String(p.capturable), p.riderEmail ?? '', p.driverEmail ?? ''].map(v => `"${String(v).replace(/"/g, '""')}"`).join(','));
            const csv = [header.join(','), ...rows].join('\n') + '\n';
            reply.header('Content-Type', 'text/csv; charset=utf-8');
            return reply.send(csv);
        }
        const nextCursor = items.length === limit ? items[items.length - 1].id : null;
        return reply.send({ items: mapped, nextCursor });
    });
}
//# sourceMappingURL=payment.admin.ext.routes.js.map