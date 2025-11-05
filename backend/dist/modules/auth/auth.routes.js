"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoutes;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const refresh_service_1 = require("./refresh.service");
async function authRoutes(app) {
    // Simple per-email throttle (fallback in-memory)
    const RL_LOGIN_MAX = Number(process.env.RL_LOGIN_PER_EMAIL_MAX || 10);
    const RL_LOGIN_WIN_MS = Number(process.env.RL_LOGIN_PER_EMAIL_WIN_SEC || 60) * 1000;
    const rlMap = new Map();
    function checkLoginThrottle(key) {
        const now = Date.now();
        const cur = rlMap.get(key);
        if (!cur || now >= cur.resetAt) {
            rlMap.set(key, { count: 1, resetAt: now + RL_LOGIN_WIN_MS });
            return true;
        }
        cur.count += 1;
        if (cur.count > RL_LOGIN_MAX)
            return false;
        return true;
    }
    // Schemas
    const registerBodySchema = {
        type: 'object',
        required: ['email', 'password', 'firstName', 'lastName', 'role'],
        properties: {
            email: { type: 'string', format: 'email', example: 'driver@taxi.local' },
            password: { type: 'string', minLength: 6, example: '123456' },
            firstName: { type: 'string', example: 'John' },
            lastName: { type: 'string', example: 'Doe' },
            role: { type: 'string', enum: ['ADMIN', 'DRIVER', 'RIDER'], example: 'DRIVER' }
        },
        additionalProperties: false
    };
    const loginBodySchema = {
        type: 'object',
        required: ['email', 'password'],
        properties: {
            email: { type: 'string', format: 'email', example: 'driver@taxi.local' },
            password: { type: 'string', minLength: 6, example: '123456' }
        },
        additionalProperties: false
    };
    const loginResponseSchema = {
        type: 'object',
        properties: {
            token: { type: 'string' },
            refreshToken: { type: 'string' },
            user: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    email: { type: 'string' },
                    role: { type: 'string', enum: ['ADMIN', 'DRIVER', 'RIDER'] }
                }
            }
        }
    };
    // POST /auth/register
    app.post('/auth/register', {
        schema: {
            operationId: 'authRegister',
            tags: ['auth'],
            security: [],
            body: registerBodySchema,
            response: { 201: loginResponseSchema, 400: { type: 'object', properties: { error: { type: 'string' } } } }
        }
    }, async (req, reply) => {
        const { email, password, firstName, lastName, role } = req.body;
        const exists = await prisma_1.default.user.findUnique({ where: { email } });
        if (exists)
            return reply.code(400).send({ error: 'Email ya registrado' });
        const passwordHash = await bcrypt_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({ data: { email, passwordHash, firstName, lastName, role } });
        if (role === 'DRIVER') {
            await prisma_1.default.driverProfile.upsert({
                where: { userId: user.id },
                update: {},
                create: { userId: user.id, rating: 5.0, totalTrips: 0, status: 'IDLE', licenseNumber: `PENDING-${user.id}` }
            });
        }
        if (role === 'RIDER') {
            await prisma_1.default.riderProfile.upsert({ where: { userId: user.id }, update: {}, create: { userId: user.id } });
        }
        const token = app.jwt.sign({ id: user.id, email: user.email, role: user.role });
        const rt = await (0, refresh_service_1.issueRefreshToken)(user.id);
        return reply.code(201).send({ token, refreshToken: rt.token, user: { id: user.id, email: user.email, role: user.role } });
    });
    // POST /auth/login
    app.post('/auth/login', {
        schema: {
            operationId: 'authLogin', tags: ['auth'], security: [],
            body: loginBodySchema,
            response: { 200: loginResponseSchema, 401: { type: 'object', properties: { error: { type: 'string' } } }, 429: { type: 'object', properties: { error: { type: 'string' } } } }
        },
        config: {
            rateLimit: {
                max: Number(process.env.RL_LOGIN_PER_EMAIL_MAX || 10),
                timeWindow: process.env.RL_LOGIN_PER_EMAIL_WIN || '1 minute',
                keyGenerator: (req) => `login:${(req.body && req.body.email) || req.ip}`,
            }
        }
    }, async (req, reply) => {
        const { email, password } = req.body;
        const key = `login:${(email || '').toLowerCase() || req.ip}`;
        if (!checkLoginThrottle(key))
            return reply.code(429).send({ error: 'Too Many Requests' });
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user)
            return reply.code(401).send({ error: 'Credenciales inv�lidas' });
        const ok = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!ok)
            return reply.code(401).send({ error: 'Credenciales inv�lidas' });
        const token = app.jwt.sign({ id: user.id, email: user.email, role: user.role });
        const rt = await (0, refresh_service_1.issueRefreshToken)(user.id);
        return reply.send({ token, refreshToken: rt.token, user: { id: user.id, email: user.email, role: user.role } });
    });
    // POST /auth/refresh
    const refreshBody = { type: 'object', required: ['refreshToken'], properties: { refreshToken: { type: 'string' } }, additionalProperties: false };
    app.post('/auth/refresh', {
        schema: {
            operationId: 'authRefresh', tags: ['auth'], security: [],
            body: refreshBody,
            response: { 200: { type: 'object', properties: { token: { type: 'string' }, refreshToken: { type: 'string' } } }, 401: { type: 'object', properties: { error: { type: 'string' } } } }
        }
    }, async (req, reply) => {
        const { refreshToken } = req.body;
        const rotated = await (0, refresh_service_1.rotateRefreshToken)(refreshToken);
        if (!rotated)
            return reply.code(401).send({ error: 'Invalid refresh token' });
        const u = await prisma_1.default.user.findUnique({ where: { id: rotated.userId }, select: { email: true, role: true } });
        const token = app.jwt.sign({ id: rotated.userId, email: u?.email || '', role: u?.role || 'RIDER' });
        return reply.send({ token, refreshToken: rotated.token });
    });
    // POST /auth/logout
    const logoutBody = { type: 'object', properties: { refreshToken: { type: 'string' } }, additionalProperties: false };
    app.post('/auth/logout', {
        schema: { operationId: 'authLogout', tags: ['auth'], body: logoutBody, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } } } }
    }, async (req, reply) => {
        const b = (req.body || {});
        if (b.refreshToken) {
            await (0, refresh_service_1.revokeRefreshToken)(b.refreshToken);
            return reply.send({ ok: true });
        }
        try {
            await req.jwtVerify();
        }
        catch {
            return reply.code(401).send({ error: 'Unauthorized' });
        }
        const userId = req.user?.id;
        if (!userId)
            return reply.code(401).send({ error: 'Unauthorized' });
        await (0, refresh_service_1.revokeAllForUser)(userId);
        return reply.send({ ok: true });
    });
    // GET /auth/me
    app.get('/auth/me', { schema: { operationId: 'authMe', tags: ['auth'], response: { 200: { type: 'object', properties: { user: { type: 'object', properties: { id: { type: 'string' }, email: { type: 'string' }, role: { type: 'string', enum: ['ADMIN', 'DRIVER', 'RIDER'] }, firstName: { type: 'string' }, lastName: { type: 'string' } } } } }, 401: { type: 'object', properties: { error: { type: 'string' } } } } } }, async (req, reply) => {
        try {
            await req.jwtVerify();
        }
        catch {
            return reply.code(401).send({ error: 'Unauthorized' });
        }
        const user = await prisma_1.default.user.findUnique({ where: { id: req.user.id }, select: { id: true, email: true, role: true, firstName: true, lastName: true } });
        return reply.send({ user });
    });
}
//# sourceMappingURL=auth.routes.js.map