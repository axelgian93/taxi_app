"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/error-schemas.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
exports.default = (0, fastify_plugin_1.default)(async function errorSchemasPlugin(app) {
    app.addHook('onRoute', (routeOptions) => {
        const schema = routeOptions.schema;
        if (!schema)
            return;
        const resp = (schema.response = schema.response || {});
        const ensure = (code, example) => {
            if (resp[code])
                return;
            resp[code] = { type: 'object', properties: { error: { type: 'string' } }, example: { error: example } };
        };
        // Common error responses
        ensure(401, 'Unauthorized');
        ensure(403, 'Forbidden');
        ensure(409, 'Conflict');
        ensure(429, 'Too Many Requests');
    });
});
//# sourceMappingURL=error-schemas.js.map