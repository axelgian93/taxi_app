"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = adminJwksRoutes;
const jwks_service_1 = require("../../services/jwks.service");
async function adminJwksRoutes(app) {
    // List keys (metadata only)
    app.get('/admin/jwks', {
        schema: { operationId: 'adminJwksList', tags: ['admin'], summary: 'JWT keys (metadata)', response: { 200: { type: 'object', properties: { items: { type: 'array', items: { type: 'object', properties: { kid: { type: 'string' }, active: { type: 'boolean' }, createdAt: { type: 'string', format: 'date-time' } } } }, activeKid: { type: 'string' } } } } },
        preHandler: app.auth.requireRole('ADMIN')
    }, async (_req, reply) => {
        const items = (0, jwks_service_1.listKeyMeta)();
        const active = (0, jwks_service_1.getActive)()?.kid || 'default';
        return reply.send({ items, activeKid: active });
    });
    // Rotate key
    app.post('/admin/jwks/rotate', {
        schema: { operationId: 'adminJwksRotate', tags: ['admin'], summary: 'Rotate JWT key', body: { type: 'object', properties: { kid: { type: 'string' }, secret: { type: 'string' } }, required: ['secret'] }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' }, kid: { type: 'string' } } } } },
        preHandler: app.auth.requireRole('ADMIN')
    }, async (req, reply) => {
        const b = (req.body || {});
        const kid = (b.kid && String(b.kid).trim()) || `kid_${Date.now()}`;
        const secret = String(b.secret);
        await (0, jwks_service_1.rotateKey)(kid, secret);
        return reply.send({ ok: true, kid });
    });
}
//# sourceMappingURL=admin.jwks.routes.js.map