"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/metrics.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
exports.default = (0, fastify_plugin_1.default)(async (app) => {
    let prom;
    try {
        prom = require('prom-client');
    }
    catch {
        app.log.warn('prom-client not installed; HTTP metrics disabled');
        return;
    }
    const APP_NAME = process.env.APP_NAME || process.env.SERVICE_NAME || 'taxi_api';
    const histogram = new prom.Histogram({
        name: 'app_http_request_duration_seconds',
        help: 'HTTP request duration in seconds',
        labelNames: ['app', 'method', 'route', 'status'],
        // Buckets from 5ms to 10s
        buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
    });
    prom.register.registerMetric(histogram);
    app.addHook('onRequest', async (req, _rep) => {
        ;
        req._ts_hr = process.hrtime.bigint();
    });
    app.addHook('onResponse', async (req, rep) => {
        const start = req._ts_hr;
        if (!start)
            return;
        const dur = Number(process.hrtime.bigint() - start) / 1e9;
        const method = (req.method || 'GET').toUpperCase();
        const route = req.routerPath || req.routeOptions?.url || req.url.split('?')[0] || 'unknown';
        const status = String(rep.statusCode || 0);
        try {
            histogram.labels({ app: APP_NAME, method, route, status }).observe(dur);
        }
        catch {
            // ignore label errors
        }
    });
});
//# sourceMappingURL=metrics.js.map