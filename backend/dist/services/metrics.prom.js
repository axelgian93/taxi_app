"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMetricsText = getMetricsText;
// src/services/metrics.prom.ts
const metrics_service_1 = require("./metrics.service");
let prom = null;
try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    // @ts-ignore - prom-client is optional at runtime
    prom = require('prom-client');
}
catch {
    prom = null;
}
let reg = null;
let gauges = null;
const APP_NAME = process.env.APP_NAME || process.env.SERVICE_NAME || 'taxi_api';
function ensurePromRegistry() {
    if (!prom)
        return;
    if (!reg) {
        // Use default registry from prom-client
        reg = prom.register;
        try {
            prom.collectDefaultMetrics();
        }
        catch {
            // ignore if already registered
        }
    }
    if (!gauges) {
        gauges = {
            matching_postgis: new prom.Gauge({ name: 'app_matching_postgis_total', help: 'Matches using PostGIS', labelNames: ['app'] }),
            matching_haversine: new prom.Gauge({ name: 'app_matching_haversine_total', help: 'Matches using Haversine fallback', labelNames: ['app'] }),
            matching_idle_fallback: new prom.Gauge({ name: 'app_matching_idle_fallback_total', help: 'Matches using idle fallback', labelNames: ['app'] }),
            sse_connections: new prom.Gauge({ name: 'app_sse_connections_total', help: 'Total SSE connections (lifetime count)', labelNames: ['app'] }),
            sse_connections_current: new prom.Gauge({ name: 'app_sse_connections_current', help: 'Current SSE connections', labelNames: ['app'] }),
            drivers_available_current: new prom.Gauge({ name: 'app_drivers_available_current', help: 'Current available drivers (IDLE & fresh location)', labelNames: ['app'] }),
        };
        for (const g of Object.values(gauges))
            reg.registerMetric(g);
    }
}
async function getMetricsText() {
    const c = (0, metrics_service_1.getCounters)();
    if (!prom) {
        // Minimal Prometheus text exposition without prom-client
        const lines = [
            '# HELP app_matching_postgis_total Matches using PostGIS',
            '# TYPE app_matching_postgis_total gauge',
            `app_matching_postgis_total{app="${APP_NAME}"} ${c.matching_postgis ?? 0}`,
            '# HELP app_matching_haversine_total Matches using Haversine fallback',
            '# TYPE app_matching_haversine_total gauge',
            `app_matching_haversine_total{app="${APP_NAME}"} ${c.matching_haversine ?? 0}`,
            '# HELP app_matching_idle_fallback_total Matches using idle fallback',
            '# TYPE app_matching_idle_fallback_total gauge',
            `app_matching_idle_fallback_total{app="${APP_NAME}"} ${c.matching_idle_fallback ?? 0}`,
            '# HELP app_sse_connections_total Total SSE connections (lifetime count)',
            '# TYPE app_sse_connections_total gauge',
            `app_sse_connections_total{app="${APP_NAME}"} ${c.sse_connections ?? 0}`,
            '# HELP app_sse_connections_current Current SSE connections',
            '# TYPE app_sse_connections_current gauge',
            `app_sse_connections_current{app="${APP_NAME}"} ${(0, metrics_service_1.getCurrentSse)()}`,
            '# HELP app_drivers_available_current Current available drivers (IDLE & fresh location)',
            '# TYPE app_drivers_available_current gauge',
            `app_drivers_available_current{app="${APP_NAME}"} ${(0, metrics_service_1.getCurrentDriversAvailable)()}`,
        ];
        return lines.join('\n') + '\n';
    }
    ensurePromRegistry();
    if (gauges) {
        gauges.matching_postgis.labels(APP_NAME).set(c.matching_postgis ?? 0);
        gauges.matching_haversine.labels(APP_NAME).set(c.matching_haversine ?? 0);
        gauges.matching_idle_fallback.labels(APP_NAME).set(c.matching_idle_fallback ?? 0);
        gauges.sse_connections.labels(APP_NAME).set(c.sse_connections ?? 0);
        gauges.sse_connections_current.labels(APP_NAME).set((0, metrics_service_1.getCurrentSse)());
        gauges.drivers_available_current.labels(APP_NAME).set((0, metrics_service_1.getCurrentDriversAvailable)());
    }
    try {
        return await reg.metrics();
    }
    catch {
        // Fallback: simple text
        return `app_matching_postgis_total ${c.matching_postgis ?? 0}`;
    }
}
//# sourceMappingURL=metrics.prom.js.map