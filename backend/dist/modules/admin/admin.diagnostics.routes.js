"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = adminDiagnosticsRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const metrics_service_1 = require("../../services/metrics.service");
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
}
//# sourceMappingURL=admin.diagnostics.routes.js.map