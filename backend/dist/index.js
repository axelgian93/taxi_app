"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
require("dotenv/config");
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
// 🔐 plugin JWT
const jwt_1 = __importDefault(require("./plugins/jwt"));
const metrics_1 = __importDefault(require("./plugins/metrics"));
const availability_1 = __importDefault(require("./plugins/availability"));
const driver_presence_1 = __importDefault(require("./plugins/driver-presence"));
const trip_supervisor_1 = __importDefault(require("./plugins/trip-supervisor"));
const sessions_sweep_1 = __importDefault(require("./plugins/sessions-sweep"));
const operation_ids_1 = __importDefault(require("./plugins/operation-ids"));
const webhooks_raw_1 = __importDefault(require("./plugins/webhooks-raw"));
const request_id_1 = __importDefault(require("./plugins/request-id"));
const admin_export_rate_limit_1 = __importDefault(require("./plugins/admin-export-rate-limit"));
const admin_export_etag_1 = __importDefault(require("./plugins/admin-export-etag"));
const https_enforce_1 = __importDefault(require("./plugins/https-enforce"));
const hpp_sanitize_1 = __importDefault(require("./plugins/hpp-sanitize"));
const swagger_csp_1 = __importDefault(require("./plugins/swagger-csp"));
const sse_guard_1 = __importDefault(require("./plugins/sse-guard"));
const admin_audit_logger_1 = __importDefault(require("./plugins/admin-audit-logger"));
const admin_ip_allowlist_1 = __importDefault(require("./plugins/admin-ip-allowlist"));
const error_schemas_1 = __importDefault(require("./plugins/error-schemas"));
// Rutas
const auth2_routes_1 = __importDefault(require("./modules/auth/auth2.routes"));
const driver_routes_1 = __importDefault(require("./modules/drivers/driver.routes"));
const trip_routes_1 = __importDefault(require("./modules/trips/trip.routes"));
const admin_trips_routes_1 = __importDefault(require("./modules/admin/admin.trips.routes"));
const admin_diagnostics_routes_1 = __importDefault(require("./modules/admin/admin.diagnostics.routes"));
const admin_metrics_routes_1 = __importDefault(require("./modules/admin/admin.metrics.routes"));
const admin_security_routes_1 = __importDefault(require("./modules/admin/admin.security.routes"));
const admin_jwks_routes_1 = __importDefault(require("./modules/admin/admin.jwks.routes"));
const admin_sessions_routes_1 = __importDefault(require("./modules/admin/admin.sessions.routes"));
const admin_trips_report_routes_1 = __importDefault(require("./modules/admin/admin.trips.report.routes"));
const admin_audit_routes_1 = __importDefault(require("./modules/admin/admin.audit.routes"));
const admin_users_routes_1 = __importDefault(require("./modules/admin/admin.users.routes"));
const admin_trips_detailed_routes_1 = __importDefault(require("./modules/admin/admin.trips.detailed.routes"));
const admin_revenue_routes_1 = __importDefault(require("./modules/admin/admin.revenue.routes"));
const admin_tariff_routes_1 = __importDefault(require("./modules/admin/admin.tariff.routes"));
const admin_migrations_routes_1 = __importDefault(require("./modules/admin/admin.migrations.routes"));
const user_routes_1 = __importDefault(require("./modules/users/user.routes"));
const rider_routes_1 = __importDefault(require("./modules/rider/rider.routes"));
const payment_routes_utf8_1 = __importDefault(require("./modules/payments/payment.routes.utf8"));
const payment_admin_ext_routes_1 = __importDefault(require("./modules/payments/payment.admin.ext.routes"));
const stripe_webhook_routes_1 = __importDefault(require("./modules/payments/stripe.webhook.routes"));
const payment_setup_routes_1 = __importDefault(require("./modules/payments/payment.setup.routes"));
const prisma_1 = __importDefault(require("./lib/prisma"));
let Redis = null;
try {
    Redis = require('ioredis');
}
catch { }
const PORT = Number(process.env.PORT || 8080);
const NODE_ENV = process.env.NODE_ENV || 'development';
function parseCorsOrigin() {
    const raw = (process.env.CORS_ORIGIN || '*').trim();
    const isProd = (NODE_ENV === 'production');
    if (raw === '*' || raw === 'true') {
        // In production, do not allow wildcard CORS; require explicit allowlist
        if (isProd)
            return [];
        return true;
    }
    const parts = raw.split(',').map(s => s.trim()).filter(Boolean);
    return parts.length ? parts : ['http://localhost:3000'];
}
const RL_MAX = Number(process.env.RATE_LIMIT_MAX || 200);
const RL_WIN = process.env.RATE_LIMIT_TIME_WINDOW || '1 minute';
async function buildServer() {
    const MAX_BODY = Number(process.env.MAX_BODY_BYTES || 1024 * 1024);
    const app = (0, fastify_1.default)({
        ajv: { customOptions: { keywords: ['example'], strict: false } },
        trustProxy: true,
        bodyLimit: MAX_BODY,
        logger: NODE_ENV !== 'production'
            ? { transport: { target: 'pino-pretty', options: { colorize: true } } }
            : true
    });
    await app.register(cors_1.default, { origin: parseCorsOrigin(), credentials: true });
    await app.register(swagger_1.default, {
        openapi: {
            openapi: '3.0.3',
            info: { title: 'Taxi API', description: 'API de Taxi', version: '1.0.0' },
            servers: [{ url: `http://localhost:${PORT}` }],
            components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } } },
            security: [{ bearerAuth: [] }]
        }
    });
    // Optionally protect /docs in production unless DOCS_PUBLIC=true
    const DOCS_PUBLIC = (process.env.DOCS_PUBLIC || '').toLowerCase() === 'true';
    if (NODE_ENV === 'production' && !DOCS_PUBLIC) {
        app.addHook('onRequest', async (req, reply) => {
            const url = (req.url || '').split('?')[0];
            if (url === '/docs' || url.startsWith('/docs/')) {
                try {
                    await req.jwtVerify();
                }
                catch {
                    return reply.code(401).send({ error: 'Unauthorized' });
                }
                if (req.user?.role !== 'ADMIN')
                    return reply.code(403).send({ error: 'Forbidden' });
            }
        });
    }
    await app.register(swagger_ui_1.default, { routePrefix: '/docs', uiConfig: { docExpansion: 'list', deepLinking: true } });
    await app.register(swagger_csp_1.default);
    await app.register(request_id_1.default);
    await app.register(helmet_1.default, { contentSecurityPolicy: false, hsts: NODE_ENV === 'production' });
    await app.register(rate_limit_1.default, { max: RL_MAX, timeWindow: RL_WIN });
    await app.register(hpp_sanitize_1.default);
    await app.register(https_enforce_1.default);
    await app.register(metrics_1.default);
    await app.register(sse_guard_1.default);
    await app.register(admin_audit_logger_1.default);
    await app.register(admin_ip_allowlist_1.default);
    await app.register(availability_1.default);
    await app.register(driver_presence_1.default);
    // Ensure operationId mapping is applied as routes are registered
    await app.register(operation_ids_1.default);
    // Inject default error response schemas (401/403/409/429) if missing
    await app.register(error_schemas_1.default);
    // Default rate-limit for admin export endpoints (applies on route registration)
    await app.register(admin_export_rate_limit_1.default);
    // ETag/Cache-Control for admin export endpoints (applies onSend)
    await app.register(admin_export_etag_1.default);
    await app.register(trip_supervisor_1.default);
    await app.register(sessions_sweep_1.default);
    app.get('/healthz', { schema: { operationId: 'healthz', security: [] } }, async () => ({ ok: true, uptime: process.uptime(), env: NODE_ENV }));
    app.get('/healthz/extended', { schema: { operationId: 'healthzExtended', security: [] } }, async (_req, reply) => {
        const version = process.env.APP_VERSION || process.env.npm_package_version || 'unknown';
        let dbOk = false;
        try {
            await prisma_1.default.$queryRaw `SELECT 1`;
            dbOk = true;
        }
        catch { }
        let redisOk = false;
        try {
            if (process.env.EVENTS_USE_REDIS === '1' && Redis) {
                const r = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', { lazyConnect: true });
                await r.connect();
                await r.ping();
                await r.quit();
                redisOk = true;
            }
        }
        catch { }
        const mem = process.memoryUsage();
        return reply.send({ ok: true, env: NODE_ENV, version, uptime: process.uptime(), now: new Date().toISOString(), pid: process.pid, memory: { rss: mem.rss, heapUsed: mem.heapUsed, heapTotal: mem.heapTotal }, deps: { db: dbOk, redis: redisOk } });
    });
    // Liveness probe (process is up)
    app.get('/live', { schema: { operationId: 'live', security: [] } }, async (_req, reply) => {
        return reply.send({ ok: true, now: new Date().toISOString() });
    });
    // Readiness probe (deps available)
    app.get('/ready', { schema: { operationId: 'ready', security: [] } }, async (_req, reply) => {
        let dbOk = false;
        try {
            await prisma_1.default.$queryRaw `SELECT 1`;
            dbOk = true;
        }
        catch { }
        let redisOk = false;
        try {
            if (process.env.EVENTS_USE_REDIS === '1' && Redis) {
                const r = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', { lazyConnect: true });
                await r.connect();
                await r.ping();
                await r.quit();
                redisOk = true;
            }
        }
        catch { }
        const requireRedis = (process.env.EVENTS_USE_REDIS === '1');
        const ok = dbOk && (!requireRedis || redisOk);
        return ok
            ? reply.send({ ok: true, deps: { db: dbOk, redis: redisOk } })
            : reply.code(503).send({ ok: false, deps: { db: dbOk, redis: redisOk } });
    });
    // Global error handler with request id in response
    app.setErrorHandler((err, req, reply) => {
        const code = err.statusCode || 500;
        const payload = { error: err.name || 'Error', requestId: req.id };
        if (code >= 500 && NODE_ENV === 'production') {
            payload.message = 'Internal Server Error';
        }
        else {
            payload.message = err.message;
        }
        app.log.error({ err, reqId: req.id }, 'Unhandled error');
        reply.code(code).send(payload);
    });
    // 🔐 JWT ANTES de registrar rutas
    await app.register(jwt_1.default);
    // Rutas
    await app.register(auth2_routes_1.default);
    await app.register(driver_routes_1.default);
    await app.register(trip_routes_1.default);
    await app.register(admin_trips_routes_1.default);
    await app.register(admin_diagnostics_routes_1.default);
    await app.register(admin_metrics_routes_1.default);
    await app.register(admin_security_routes_1.default);
    await app.register(admin_jwks_routes_1.default);
    await app.register(admin_sessions_routes_1.default);
    await app.register(admin_trips_report_routes_1.default);
    await app.register(admin_audit_routes_1.default);
    await app.register(admin_users_routes_1.default);
    await app.register(admin_trips_detailed_routes_1.default);
    await app.register(admin_revenue_routes_1.default);
    await app.register(admin_tariff_routes_1.default);
    await app.register(admin_migrations_routes_1.default);
    await app.register(user_routes_1.default);
    await app.register(rider_routes_1.default);
    await app.register(payment_routes_utf8_1.default);
    await app.register(payment_admin_ext_routes_1.default);
    // Raw body for all /webhooks/* (e.g., Stripe)
    await app.register(webhooks_raw_1.default);
    await app.register(stripe_webhook_routes_1.default, { prefix: '/webhooks' });
    await app.register(payment_setup_routes_1.default);
    return app;
}
async function main() {
    const app = await buildServer();
    await app.listen({ port: PORT, host: '0.0.0.0' });
    app.log.info(`🚀 Taxi API corriendo en http://localhost:${PORT}`);
    app.log.info(`📖 Swagger UI en    http://localhost:${PORT}/docs`);
}
main().catch(err => {
    console.error('❌ Error al iniciar el servidor:', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map