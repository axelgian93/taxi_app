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
exports.default = adminSecurityRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
async function adminSecurityRoutes(app) {
    app.get('/admin/login-attempts', {
        schema: {
            operationId: 'adminLoginAttempts',
            tags: ['admin'],
            summary: 'Login attempts audit',
            description: 'Lista de intentos de login con filtros y salida CSV opcional.',
            querystring: {
                type: 'object',
                properties: {
                    email: { type: 'string', nullable: true },
                    success: { type: 'boolean', nullable: true },
                    since: { type: 'string', format: 'date-time', nullable: true },
                    limit: { type: 'integer', minimum: 1, maximum: 1000, default: 200 },
                    format: { type: 'string', enum: ['json', 'csv'], default: 'json' }
                }
            },
            response: { 200: { type: 'object', properties: { items: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, email: { type: 'string' }, success: { type: 'boolean' }, ip: { type: 'string', nullable: true }, userAgent: { type: 'string', nullable: true }, reason: { type: 'string', nullable: true }, createdAt: { type: 'string', format: 'date-time' } } } } } } }
        },
        preHandler: app.auth.requireRole('ADMIN')
    }, async (req, reply) => {
        const q = (req.query || {});
        const limit = Math.min(Math.max(Number(q.limit || 200), 1), 1000);
        const params = [];
        let where = '1=1';
        if (q.email) {
            params.push(String(q.email));
            where += ` AND email = $${params.length}`;
        }
        if (q.success === true || q.success === 'true') {
            where += ' AND success = true';
        }
        if (q.success === false || q.success === 'false') {
            where += ' AND success = false';
        }
        if (q.since) {
            const d = new Date(String(q.since));
            if (!isNaN(d.getTime())) {
                params.push(d.toISOString());
                where += ` AND "createdAt" >= $${params.length}`;
            }
        }
        params.push(limit);
        const sql = `SELECT id::text, email, success, ip, "userAgent", reason, "createdAt" FROM "LoginAttempt" WHERE ${where} ORDER BY "createdAt" DESC LIMIT $${params.length}`;
        const rows = await prisma_1.default.$queryRawUnsafe(sql, ...params);
        if ((q.format || 'json') === 'csv') {
            const header = 'id,email,success,ip,userAgent,reason,createdAt\n';
            const body = rows.map(r => [r.id, r.email, r.success ? 'true' : 'false', r.ip || '', (r.userAgent || '').replace(/"/g, '""'), r.reason || '', r.createdAt.toISOString()].map(v => {
                const s = String(v);
                return /[,"]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
            }).join(',')).join('\n');
            reply.header('Content-Type', 'text/csv; charset=utf-8');
            return reply.send(header + body + '\n');
        }
        return reply.send({ items: rows });
    });
    // Check lock status for an email
    app.get('/admin/login-locks', {
        schema: {
            operationId: 'adminLoginLockStatus', tags: ['admin'],
            summary: 'Login lock status',
            querystring: { type: 'object', properties: { email: { type: 'string' } }, required: ['email'] },
            response: { 200: { type: 'object', properties: { email: { type: 'string' }, secondsLeft: { type: 'integer' }, lockedUntil: { type: 'string', nullable: true }, lockCount: { type: 'integer' } } } }
        },
        preHandler: app.auth.requireRole('ADMIN')
    }, async (req, reply) => {
        const email = String((req.query || {}).email || '');
        const { checkLockedSeconds, getLockInfo } = await Promise.resolve().then(() => __importStar(require('../auth/login-lock.service')));
        const secondsLeft = checkLockedSeconds(email);
        const info = getLockInfo(email);
        return reply.send({ email, secondsLeft, lockedUntil: info?.lockedUntil ? new Date(info.lockedUntil).toISOString() : null, lockCount: info?.lockCount || 0 });
    });
    // Manual unlock
    app.post('/admin/login-locks/unlock', {
        schema: {
            operationId: 'adminLoginUnlock', tags: ['admin'],
            summary: 'Unlock login for email',
            body: { type: 'object', required: ['email'], properties: { email: { type: 'string' } } },
            response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } } }
        },
        preHandler: app.auth.requireRole('ADMIN')
    }, async (req, reply) => {
        const email = String((req.body || {}).email || '');
        const { clearFailuresAndUnlock } = await Promise.resolve().then(() => __importStar(require('../auth/login-lock.service')));
        clearFailuresAndUnlock(email);
        return reply.send({ ok: true });
    });
}
//# sourceMappingURL=admin.security.routes.js.map