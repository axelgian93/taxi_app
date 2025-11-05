"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/hpp-sanitize.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
exports.default = (0, fastify_plugin_1.default)(async function hppSanitize(app) {
    const MAX_REPEATED = Number(process.env.HPP_MAX_REPEATED || 5);
    app.addHook('preValidation', async (req, _reply) => {
        // If some query key appears more than MAX_REPEATED times (array), trim it
        const q = req.query;
        if (!q || typeof q !== 'object')
            return;
        for (const k of Object.keys(q)) {
            const v = q[k];
            if (Array.isArray(v) && v.length > MAX_REPEATED) {
                ;
                q[k] = v.slice(0, MAX_REPEATED);
            }
        }
    });
});
//# sourceMappingURL=hpp-sanitize.js.map