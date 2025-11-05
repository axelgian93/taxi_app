"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = authRoutes;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const refresh_service_1 = require("./refresh.service");
const login_lock_service_1 = require("./login-lock.service");
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
    function secsUntilThrottleReset(key) {
        const cur = rlMap.get(key);
        if (!cur)
            return 0;
        const now = Date.now();
        return cur.resetAt > now ? Math.ceil((cur.resetAt - now) / 1000) : 0;
    }
    // Simple per-IP throttle (independent bucket)
    const RL_LOGIN_PER_IP_MAX = Number(process.env.RL_LOGIN_PER_IP_MAX || 50);
    const RL_LOGIN_PER_IP_WIN_MS = Number(process.env.RL_LOGIN_PER_IP_WIN_SEC || 60) * 1000;
    const rlIp = new Map();
    function checkIpThrottle(ip) {
        const now = Date.now();
        const cur = rlIp.get(ip);
        if (!cur || now >= cur.resetAt) {
            rlIp.set(ip, { count: 1, resetAt: now + RL_LOGIN_PER_IP_WIN_MS });
            return true;
        }
        cur.count += 1;
        if (cur.count > RL_LOGIN_PER_IP_MAX)
            return false;
        return true;
    }
    function secsUntilIpReset(ip) {
        const cur = rlIp.get(ip);
        if (!cur)
            return 0;
        const now = Date.now();
        return cur.resetAt > now ? Math.ceil((cur.resetAt - now) / 1000) : 0;
    }
    // Brute-force hardening functions imported from service
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
            password: { type: 'string', minLength: 6, example: '123456' },
            deviceId: { type: 'string', nullable: true, example: 'dev-123' },
            deviceName: { type: 'string', nullable: true, example: 'Mi iPhone' },
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
        },
        example: { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', refreshToken: 'rt_abcdefgh123456', user: { id: 'usr_123', email: 'driver@taxi.local', role: 'DRIVER' } }
    };
    // POST /auth/register
    app.post('/auth/register', {
        config: {
            rateLimit: {
                max: Number(process.env.RL_AUTH_REGISTER_MAX || 5),
                timeWindow: process.env.RL_AUTH_REGISTER_WIN || '1 minute',
                keyGenerator: (req) => `areg:${req.body?.email || req.ip}`,
            }
        },
        schema: {
            operationId: 'authRegister',
            tags: ['auth'],
            security: [],
            body: registerBodySchema,
            response: { 201: loginResponseSchema, 400: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Email already registered' } } }
        }
    }, async (req, reply) => {
        const { email, password, firstName, lastName, role } = req.body;
        const exists = await prisma_1.default.user.findUnique({ where: { email } });
        if (exists)
            return reply.code(400).send({ error: 'Email already registered' });
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
        const { signAccessToken } = await Promise.resolve().then(() => __importStar(require('../../services/jwks.service')));
        const token = signAccessToken({ id: user.id, email: user.email, role: user.role });
        const rt = await (0, refresh_service_1.issueRefreshToken)(user.id);
        return reply.code(201).send({ token, refreshToken: rt.token, user: { id: user.id, email: user.email, role: user.role } });
    });
    // POST /auth/login
    app.post('/auth/login', {
        config: {
            rateLimit: {
                max: Number(process.env.RL_AUTH_LOGIN_MAX || 20),
                timeWindow: process.env.RL_AUTH_LOGIN_WIN || '1 minute',
                keyGenerator: (req) => `alogin:${req.body?.email || req.ip}`,
            }
        },
        schema: {
            operationId: 'authLogin', tags: ['auth'], security: [],
            body: loginBodySchema,
            response: { 200: loginResponseSchema, 401: { type: 'object', properties: { error: { type: 'string' } } }, 429: { type: 'object', properties: { error: { type: 'string' } } } }
        }
    }, async (req, reply) => {
        const { email, password, deviceId, deviceName } = req.body;
        // Global IP throttle
        const ip = (req.ip || '').toString();
        if (!checkIpThrottle(ip)) {
            const sec = secsUntilIpReset(ip);
            if (sec > 0)
                reply.header('Retry-After', String(sec));
            await logAttempt(email, false, 'RATE_LIMIT_IP', req);
            return reply.code(429).send({ error: 'Too Many Requests' });
        }
        const key = `login:${(email || '').toLowerCase() || req.ip}`;
        if (!checkLoginThrottle(key)) {
            const sec = secsUntilThrottleReset(key);
            if (sec > 0)
                reply.header('Retry-After', String(sec));
            await logAttempt(email, false, 'RATE_LIMIT', req);
            return reply.code(429).send({ error: 'Too Many Requests' });
        }
        const lockedFor = (0, login_lock_service_1.checkLockedSeconds)(email || '');
        if (lockedFor > 0) {
            reply.header('Retry-After', String(lockedFor));
            await logAttempt(email, false, 'LOCKED', req);
            return reply.code(429).send({ error: 'Too Many Requests' });
        }
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            const sec = (0, login_lock_service_1.registerFailureAndMaybeLock)(email || 'unknown');
            if (sec > 0) {
                try {
                    const { incCounter } = await Promise.resolve().then(() => __importStar(require('../../services/metrics.service')));
                    incCounter('login_locked');
                }
                catch { }
                reply.header('Retry-After', String(sec));
            }
            else {
                try {
                    const { incCounter } = await Promise.resolve().then(() => __importStar(require('../../services/metrics.service')));
                    incCounter('login_failures');
                }
                catch { }
            }
            await logAttempt(email, false, 'INVALID', req);
            return reply.code(401).send({ error: 'Invalid credentials' });
        }
        const ok = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!ok) {
            const sec = (0, login_lock_service_1.registerFailureAndMaybeLock)(email);
            if (sec > 0) {
                try {
                    const { incCounter } = await Promise.resolve().then(() => __importStar(require('../../services/metrics.service')));
                    incCounter('login_locked');
                }
                catch { }
                reply.header('Retry-After', String(sec));
            }
            else {
                try {
                    const { incCounter } = await Promise.resolve().then(() => __importStar(require('../../services/metrics.service')));
                    incCounter('login_failures');
                }
                catch { }
            }
            await logAttempt(email, false, 'INVALID', req);
            return reply.code(401).send({ error: 'Invalid credentials' });
        }
        (0, login_lock_service_1.clearFailuresAndUnlock)(email);
        const { signAccessToken } = await Promise.resolve().then(() => __importStar(require('../../services/jwks.service')));
        const token = signAccessToken({ id: user.id, email: user.email, role: user.role });
        const rt = await (0, refresh_service_1.issueRefreshToken)(user.id, undefined, { deviceId, deviceName, userAgent: req.headers['user-agent'] || null, ip: req.ip || null });
        await logAttempt(email, true, 'OK', req);
        return reply.send({ token, refreshToken: rt.token, user: { id: user.id, email: user.email, role: user.role } });
    });
    // POST /auth/refresh
    const refreshBody = { type: 'object', required: ['refreshToken'], properties: { refreshToken: { type: 'string' }, deviceId: { type: 'string', nullable: true }, deviceName: { type: 'string', nullable: true } }, additionalProperties: false };
    app.post('/auth/refresh', {
        schema: {
            operationId: 'authRefresh', tags: ['auth'], security: [],
            body: refreshBody,
            response: {
                200: { type: 'object', properties: { token: { type: 'string' }, refreshToken: { type: 'string' } }, example: { token: 'eyJhbGciOiJIUzI1NiIs...', refreshToken: 'rt_new_abcdef123456' } },
                401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Invalid refresh token' } }
            }
        }
    }, async (req, reply) => {
        const { refreshToken, deviceId, deviceName } = req.body;
        const rotated = await (0, refresh_service_1.rotateRefreshToken)(refreshToken, { deviceId, deviceName, userAgent: req.headers['user-agent'] || null, ip: req.ip || null });
        if (!rotated)
            return reply.code(401).send({ error: 'Invalid refresh token' });
        const u = await prisma_1.default.user.findUnique({ where: { id: rotated.userId }, select: { email: true, role: true } });
        const { signAccessToken } = await Promise.resolve().then(() => __importStar(require('../../services/jwks.service')));
        const token = signAccessToken({ id: rotated.userId, email: u?.email || '', role: u?.role || 'RIDER' });
        return reply.send({ token, refreshToken: rotated.token });
    });
    // POST /auth/logout
    const logoutBody = { type: 'object', properties: { refreshToken: { type: 'string' } }, additionalProperties: false };
    app.post('/auth/logout', {
        schema: { operationId: 'authLogout', tags: ['auth'], body: logoutBody, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } }, example: { ok: true } }, 401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } } } }
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
    // Sessions: list own
    app.get('/auth/sessions', {
        schema: {
            operationId: 'authSessionsList', tags: ['auth'],
            response: { 200: { type: 'object', properties: { items: { type: 'array', items: { type: 'object' } } }, example: { items: [{ id: '1', deviceId: 'dev-123', deviceName: 'Mi iPhone', userAgent: 'Dart/Flutter', ip: '10.0.2.2', createdAt: '2025-01-01T12:00:00.000Z', lastUsedAt: '2025-01-01T12:10:00.000Z', expiresAt: '2025-02-01T12:00:00.000Z' }] } } }
        },
        preHandler: app.auth.verifyJWT
    }, async (req, reply) => {
        const userId = req.user?.id;
        const rows = await prisma_1.default.refreshToken.findMany({ where: { userId, revokedAt: null }, orderBy: { createdAt: 'desc' }, take: 50, select: { id: true, deviceId: true, deviceName: true, userAgent: true, ip: true, createdAt: true, lastUsedAt: true, expiresAt: true } });
        return reply.send({ items: rows.map(r => ({ ...r, id: String(r.id) })) });
    });
    // Sessions: revoke by deviceId or token id
    app.post('/auth/sessions/revoke', {
        schema: { operationId: 'authSessionsRevoke', tags: ['auth'], body: { type: 'object', properties: { deviceId: { type: 'string' }, tokenId: { type: 'string' } }, additionalProperties: false }, response: { 200: { type: 'object', properties: { count: { type: 'integer' } } } } },
        preHandler: app.auth.verifyJWT
    }, async (req, reply) => {
        const userId = req.user?.id;
        const b = (req.body || {});
        if (!b.deviceId && !b.tokenId)
            return reply.code(400).send({ error: 'deviceId or tokenId required' });
        const where = { userId, revokedAt: null };
        if (b.deviceId)
            where.deviceId = b.deviceId;
        if (b.tokenId)
            where.id = Number(b.tokenId);
        const res = await prisma_1.default.refreshToken.updateMany({ where, data: { revokedAt: new Date() } });
        if (res.count > 0) {
            try {
                const { incCounter } = await Promise.resolve().then(() => __importStar(require('../../services/metrics.service')));
                for (let i = 0; i < res.count; i++)
                    incCounter('session_revokes_total');
            }
            catch { }
        }
        return reply.send({ count: res.count });
    });
    // Sessions: revoke all (alias)
    app.post('/auth/sessions/revoke-all', {
        schema: { operationId: 'authSessionsRevokeAll', tags: ['auth'], response: { 200: { type: 'object', properties: { count: { type: 'integer' } } } } },
        preHandler: app.auth.verifyJWT
    }, async (req, reply) => {
        const userId = req.user?.id;
        const res = await prisma_1.default.refreshToken.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } });
        if (res.count > 0) {
            try {
                const { incCounter } = await Promise.resolve().then(() => __importStar(require('../../services/metrics.service')));
                for (let i = 0; i < res.count; i++)
                    incCounter('session_revokes_total');
            }
            catch { }
        }
        return reply.send({ count: res.count });
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
async function logAttempt(email, success, reason, req) {
    try {
        const ip = (req.ip || '').toString();
        const ua = (req.headers?.['user-agent'] || '').toString();
        await prisma_1.default.$executeRawUnsafe('INSERT INTO "LoginAttempt" (email, success, ip, "userAgent", reason) VALUES ($1, $2, $3, $4, $5)', email || '', success, ip, ua, reason || '');
    }
    catch {
        // ignore
    }
}
//# sourceMappingURL=auth2.routes.js.map