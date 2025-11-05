"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/swagger-csp.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
exports.default = (0, fastify_plugin_1.default)(async function swaggerCsp(app) {
    const isProd = (process.env.NODE_ENV || 'development') === 'production';
    if (!isProd)
        return;
    app.addHook('onSend', async (req, reply, payload) => {
        const url = String((req.url || '').split('?')[0]);
        if (url === '/docs' || url.startsWith('/docs/')) {
            // CSP compatible with Swagger UI assets
            reply.header('Content-Security-Policy', [
                "default-src 'self'",
                "img-src 'self' data:",
                "font-src 'self' data:",
                "style-src 'self' 'unsafe-inline'",
                "script-src 'self' 'unsafe-inline'",
                "connect-src 'self'",
                'object-src \'' + 'none' + '\'',
                'frame-ancestors \'' + 'none' + '\'',
            ].join('; '));
            reply.header('X-Content-Type-Options', 'nosniff');
            reply.header('X-Frame-Options', 'DENY');
            reply.header('Referrer-Policy', 'no-referrer');
        }
        return payload;
    });
});
//# sourceMappingURL=swagger-csp.js.map