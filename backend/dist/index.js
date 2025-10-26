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
// ðŸ” plugin JWT
const jwt_1 = __importDefault(require("./plugins/jwt"));
const metrics_1 = __importDefault(require("./plugins/metrics"));
const availability_1 = __importDefault(require("./plugins/availability"));
const trip_supervisor_1 = __importDefault(require("./plugins/trip-supervisor"));
const webhooks_raw_1 = __importDefault(require("./plugins/webhooks-raw"));
// Rutas
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const driver_routes_1 = __importDefault(require("./modules/drivers/driver.routes"));
const trip_routes_1 = __importDefault(require("./modules/trips/trip.routes"));
const admin_trips_routes_1 = __importDefault(require("./modules/admin/admin.trips.routes"));
const admin_diagnostics_routes_1 = __importDefault(require("./modules/admin/admin.diagnostics.routes"));
const admin_metrics_routes_1 = __importDefault(require("./modules/admin/admin.metrics.routes"));
const user_routes_1 = __importDefault(require("./modules/users/user.routes"));
const payment_routes_1 = __importDefault(require("./modules/payments/payment.routes"));
const stripe_webhook_routes_1 = __importDefault(require("./modules/payments/stripe.webhook.routes"));
const payment_setup_routes_1 = __importDefault(require("./modules/payments/payment.setup.routes"));
const PORT = Number(process.env.PORT || 8080);
const NODE_ENV = process.env.NODE_ENV || 'development';
function parseCorsOrigin() {
    const raw = (process.env.CORS_ORIGIN || '*').trim();
    if (raw === '*' || raw === 'true')
        return true;
    const parts = raw.split(',').map(s => s.trim()).filter(Boolean);
    return parts.length ? parts : ['http://localhost:3000'];
}
const RL_MAX = Number(process.env.RATE_LIMIT_MAX || 200);
const RL_WIN = process.env.RATE_LIMIT_TIME_WINDOW || '1 minute';
async function buildServer() {
    const app = (0, fastify_1.default)({
        ajv: { customOptions: { keywords: ['example'], strict: false } },
        trustProxy: true,
        logger: NODE_ENV !== 'production'
            ? { transport: { target: 'pino-pretty', options: { colorize: true } } }
            : true
    });
    await app.register(cors_1.default, { origin: parseCorsOrigin(), credentials: true });
    await app.register(swagger_1.default, {
        openapi: {
            openapi: '3.1.0',
            info: { title: 'Taxi API', description: 'API de Taxi', version: '1.0.0' },
            servers: [{ url: `http://localhost:${PORT}` }],
            components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } } },
            security: [{ bearerAuth: [] }]
        }
    });
    await app.register(swagger_ui_1.default, { routePrefix: '/docs', uiConfig: { docExpansion: 'list', deepLinking: true } });
    await app.register(helmet_1.default, { contentSecurityPolicy: false });
    await app.register(rate_limit_1.default, { max: RL_MAX, timeWindow: RL_WIN });
    await app.register(metrics_1.default);
    await app.register(availability_1.default);
    await app.register(trip_supervisor_1.default);
    app.get('/healthz', { schema: { security: [] } }, async () => ({ ok: true, uptime: process.uptime(), env: NODE_ENV }));
    // ðŸ” JWT ANTES de registrar rutas
    await app.register(jwt_1.default);
    // Rutas
    await app.register(auth_routes_1.default);
    await app.register(driver_routes_1.default);
    await app.register(trip_routes_1.default);
    await app.register(admin_trips_routes_1.default);
    await app.register(admin_diagnostics_routes_1.default);
    await app.register(admin_metrics_routes_1.default);
    await app.register(user_routes_1.default);
    await app.register(payment_routes_1.default);
    // Raw body for all /webhooks/* (e.g., Stripe)
    await app.register(webhooks_raw_1.default);
    await app.register(stripe_webhook_routes_1.default, { prefix: '/webhooks' });
    await app.register(payment_setup_routes_1.default);
    return app;
}
async function main() {
    const app = await buildServer();
    await app.listen({ port: PORT, host: '0.0.0.0' });
    app.log.info(`ðŸš€ Taxi API corriendo en http://localhost:${PORT}`);
    app.log.info(`ðŸ“– Swagger UI en    http://localhost:${PORT}/docs`);
}
main().catch(err => {
    console.error('âŒ Error al iniciar el servidor:', err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map