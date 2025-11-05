"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/admin-audit-logger.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
exports.default = (0, fastify_plugin_1.default)(async function adminAuditLogger(app) {
    app.addHook('onRoute', (routeOptions) => {
        const url = routeOptions.url || routeOptions.path || '';
        if (!url.startsWith('/admin/'))
            return;
        const orig = routeOptions.preHandler;
        routeOptions.preHandler = async function (req, reply) {
            // Call original preHandler(s) first if present
            if (Array.isArray(orig)) {
                for (const h of orig) {
                    await h(req, reply);
                }
            }
            else if (typeof orig === 'function') {
                await orig(req, reply);
            }
            const user = req.user || {};
            req.log.info({ requestId: req.id, userId: user.id, email: user.email, method: req.method, url: req.url }, 'ADMIN action');
        };
    });
});
//# sourceMappingURL=admin-audit-logger.js.map