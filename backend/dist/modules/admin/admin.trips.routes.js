"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = adminTripsRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const listQuery = {
    type: 'object',
    properties: {
        limit: { type: 'integer', minimum: 1, maximum: 200, default: 50 },
        cursor: { type: 'string' }
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
            tags: ['admin'],
            security: [{ bearerAuth: [] }],
            querystring: listQuery,
            response: {
                200: {
                    type: 'object',
                    properties: {
                        items: { type: 'array', items: tripItem },
                        nextCursor: { type: 'string', nullable: true }
                    }
                }
            }
        }
    }, async (req, reply) => {
        const { limit = 50, cursor } = req.query;
        const items = await prisma_1.default.trip.findMany({
            take: limit,
            ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
            orderBy: { requestedAt: 'desc' },
            select: {
                id: true, status: true, riderId: true, driverId: true,
                requestedAt: true, completedAt: true, costUsd: true, currency: true
            }
        });
        const nextCursor = items.length === limit ? items[items.length - 1].id : null;
        return reply.send({ items, nextCursor });
    });
}
//# sourceMappingURL=admin.trips.routes.js.map