"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/admin-ip-allowlist.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
exports.default = (0, fastify_plugin_1.default)(async function adminIpAllowlist(app) {
    const raw = (process.env.ADMIN_IP_ALLOWLIST || '').trim();
    if (!raw)
        return;
    const allowed = new Set(raw.split(',').map(s => s.trim()).filter(Boolean));
    app.addHook('onRequest', async (req, reply) => {
        const url = String((req.url || '').split('?')[0]);
        if (!url.startsWith('/admin/'))
            return;
        const ip = String(req.ip || req.headers['x-forwarded-for'] || '');
        if (!allowed.has(ip)) {
            return reply.code(403).send({ error: 'Forbidden' });
        }
    });
});
//# sourceMappingURL=admin-ip-allowlist.js.map