"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/admin-export-rate-limit.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
exports.default = (0, fastify_plugin_1.default)(async function adminExportRateLimit(app) {
    const max = Number(process.env.RL_ADMIN_EXPORT_MAX || 30);
    const win = process.env.RL_ADMIN_EXPORT_WIN || '1 minute';
    app.addHook('onRoute', (routeOptions) => {
        const url = routeOptions.url || routeOptions.path || '';
        const method = String((routeOptions.method || 'GET')).toUpperCase();
        // Apply defaults only to admin listing/report/export endpoints and only if not explicitly set
        const isAdminExport = method === 'GET' && /^(\/admin\/(payments|trips))/.test(url);
        if (!isAdminExport)
            return;
        routeOptions.config = routeOptions.config || {};
        if (!routeOptions.config.rateLimit) {
            routeOptions.config.rateLimit = {
                max,
                timeWindow: win,
                keyGenerator: (req) => `admexp:${req.user?.id || req.ip}`,
            };
        }
    });
});
//# sourceMappingURL=admin-export-rate-limit.js.map