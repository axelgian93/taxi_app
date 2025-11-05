"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/https-enforce.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
exports.default = (0, fastify_plugin_1.default)(async function httpsEnforce(app) {
    const enabled = (process.env.ENFORCE_HTTPS || '').toLowerCase() === 'true';
    if (!enabled)
        return;
    const EXEMPT = new Set([
        '/live', '/ready', '/healthz', '/healthz/extended', '/metrics', '/docs',
    ]);
    app.addHook('onRequest', async (req, reply) => {
        try {
            const url = String((req.url || '').split('?')[0]);
            if (url.startsWith('/docs/'))
                return;
            if (EXEMPT.has(url))
                return;
            const xfproto = String(req.headers['x-forwarded-proto'] || '').toLowerCase();
            // If behind proxy and not https, redirect
            if (xfproto && xfproto !== 'https') {
                const host = req.headers['host'];
                const location = `https://${host}${req.url}`;
                return reply.code(301).header('Location', location).send();
            }
        }
        catch { }
    });
});
//# sourceMappingURL=https-enforce.js.map