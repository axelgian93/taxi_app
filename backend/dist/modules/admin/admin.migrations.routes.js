"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = adminMigrationsRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
async function adminMigrationsRoutes(app) {
    app.get('/admin/migrations', {
        schema: {
            operationId: 'adminMigrationsList',
            tags: ['admin'],
            summary: 'List applied Prisma migrations',
            description: 'Muestra las migraciones aplicadas (según tabla _prisma_migrations) para diagnóstico rápido.',
            response: {
                200: {
                    type: 'object',
                    properties: {
                        items: { type: 'array', items: { type: 'object' } }
                    },
                    example: {
                        items: [
                            { migrationName: '20251104_jwt_keys', startedAt: '2025-11-04T10:00:00.000Z', finishedAt: '2025-11-04T10:00:01.000Z', steps: 1, rolledBackAt: null }
                        ]
                    }
                }
            }
        },
        preHandler: app.auth.requireRole('ADMIN')
    }, async (_req, reply) => {
        // Prisma keeps _prisma_migrations in the same schema as models. Our schema is taxi_app.
        try {
            const rows = await prisma_1.default.$queryRawUnsafe(`
        SELECT migration_name, started_at, finished_at, applied_steps_count, rolled_back_at
        FROM "taxi_app"."_prisma_migrations"
        ORDER BY finished_at DESC NULLS LAST, started_at DESC NULLS LAST
        LIMIT 50
      `);
            const items = rows.map(r => ({
                migrationName: r.migration_name,
                startedAt: r.started_at ? new Date(r.started_at).toISOString() : null,
                finishedAt: r.finished_at ? new Date(r.finished_at).toISOString() : null,
                steps: r.applied_steps_count ?? null,
                rolledBackAt: r.rolled_back_at ? new Date(r.rolled_back_at).toISOString() : null,
            }));
            return reply.send({ items });
        }
        catch (e) {
            return reply.code(500).send({ error: 'Failed to query migrations', message: e?.message || String(e) });
        }
    });
}
//# sourceMappingURL=admin.migrations.routes.js.map