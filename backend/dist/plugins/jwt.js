"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/jwt.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const jwt_1 = __importDefault(require("@fastify/jwt"));
const jwks_service_1 = require("../services/jwks.service");
const env_1 = require("../config/env");
exports.default = (0, fastify_plugin_1.default)(async (app) => {
    await (0, jwks_service_1.ensureBootstrapFromEnv)();
    await app.register(jwt_1.default, {
        // Provide dynamic secret based on token header.kid
        secret: async (request, token) => {
            const kid = token?.header?.kid;
            const key = (0, jwks_service_1.findByKid)(kid);
            return key?.secret || (env_1.env.jwtSecret || process.env.JWT_SECRET || 'dev-secret');
        },
        sign: { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    });
    async function verifyJWT(request, reply) {
        try {
            await request.jwtVerify();
        }
        catch {
            return reply.code(401).send({ error: 'Unauthorized' });
        }
    }
    function requireRole(role) {
        return async (request, reply) => {
            try {
                await request.jwtVerify();
            }
            catch {
                return reply.code(401).send({ error: 'Unauthorized' });
            }
            if (request.user.role !== role) {
                return reply.code(403).send({ error: 'Forbidden' });
            }
        };
    }
    app.decorate('auth', { verifyJWT, requireRole });
});
//# sourceMappingURL=jwt.js.map