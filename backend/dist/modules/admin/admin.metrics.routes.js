"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = adminMetricsRoutes;
const metrics_prom_1 = require("../../services/metrics.prom");
const env_1 = require("../../config/env");
async function adminMetricsRoutes(app) {
    app.get('/admin/metrics', { schema: { tags: ['admin'], summary: 'Prometheus metrics', description: 'Exposición de métricas en formato Prometheus. Protegido por rol ADMIN.' }, preHandler: app.auth.requireRole('ADMIN') }, async (_req, reply) => {
        const text = await (0, metrics_prom_1.getMetricsText)();
        reply.header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
        return reply.send(text);
    });
    // Optional unauthenticated metrics endpoint for Prometheus scraping inside trusted networks.
    // If METRICS_TOKEN is set, it must be provided as header `x-metrics-token`.
    app.get('/metrics', { schema: { tags: ['admin'], summary: 'Prometheus metrics (public)', description: 'Endpoint para scraping por Prometheus. Requiere header x-metrics-token si METRICS_TOKEN está definido o si METRICS_PUBLIC=false.', security: [] } }, async (req, reply) => {
        if (!env_1.env.metricsPublic || env_1.env.metricsToken) {
            const tokHeader = req.headers['x-metrics-token'] || '';
            const auth = req.headers['authorization'] || '';
            const bearer = auth.startsWith('Bearer ') ? auth.slice('Bearer '.length) : '';
            const provided = tokHeader || bearer;
            if (!provided || (env_1.env.metricsToken && provided !== env_1.env.metricsToken)) {
                return reply.code(401).send('unauthorized');
            }
        }
        const text = await (0, metrics_prom_1.getMetricsText)();
        reply.header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
        return reply.send(text);
    });
}
//# sourceMappingURL=admin.metrics.routes.js.map