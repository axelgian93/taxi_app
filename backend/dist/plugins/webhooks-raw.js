"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/webhooks-raw.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
// Provides raw Buffer bodies for JSON content under the /webhooks/* prefix
exports.default = (0, fastify_plugin_1.default)(async (app) => {
    await app.register(async (scope) => {
        scope.addContentTypeParser('application/json', { parseAs: 'buffer' }, (req, body, done) => {
            done(null, body);
        });
        scope.addContentTypeParser('application/*+json', { parseAs: 'buffer' }, (req, body, done) => {
            done(null, body);
        });
    }, { prefix: '/webhooks' });
});
//# sourceMappingURL=webhooks-raw.js.map