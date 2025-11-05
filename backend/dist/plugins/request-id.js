"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = requestIdPlugin;
async function requestIdPlugin(app) {
    app.addHook('onRequest', async (req, reply) => {
        // Ensure X-Request-Id header is set for downstream and responses
        const incoming = req.headers['x-request-id']?.trim();
        const id = incoming && incoming.length > 0 ? incoming : req.id;
        reply.header('x-request-id', id);
    });
}
//# sourceMappingURL=request-id.js.map