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
exports.default = adminSessionsRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
async function adminSessionsRoutes(app) {
    // List sessions (refresh tokens) for a user
    app.get('/admin/auth/sessions', {
        schema: {
            operationId: 'adminAuthSessionsList', tags: ['admin'],
            summary: 'List user sessions',
            querystring: {
                type: 'object',
                properties: {
                    userId: { type: 'string', nullable: true },
                    email: { type: 'string', nullable: true },
                    limit: { type: 'integer', minimum: 1, maximum: 1000, default: 200 },
                    format: { type: 'string', enum: ['json', 'csv'], default: 'json' }
                }
            },
            response: { 200: { type: 'object', properties: { items: { type: 'array', items: { type: 'object' } } } } }
        },
        preHandler: app.auth.requireRole('ADMIN')
    }, async (req, reply) => {
        const q = (req.query || {});
        const limit = Math.min(Math.max(Number(q.limit || 200), 1), 1000);
        const params = [limit];
        let where = '1=1';
        if (q.userId) {
            params.push(String(q.userId));
            where += ` AND rt."userId" = $${params.length}`;
        }
        if (q.email) {
            params.push(String(q.email));
            where += ` AND u.email = $${params.length}`;
        }
        const sql = `SELECT rt.id::text, rt."userId", u.email, rt."deviceId", rt."deviceName", rt."userAgent", rt.ip, rt."createdAt", rt."lastUsedAt", rt."expiresAt", rt."revokedAt"
                 FROM "RefreshToken" rt
                 LEFT JOIN "User" u ON u.id = rt."userId"
                 WHERE ${where}
                 ORDER BY rt."createdAt" DESC
                 LIMIT $1`;
        const rows = await prisma_1.default.$queryRawUnsafe(sql, ...params);
        if ((q.format || 'json') === 'csv') {
            const header = 'id,userId,email,deviceId,deviceName,userAgent,ip,createdAt,lastUsedAt,expiresAt,revokedAt\n';
            const body = rows.map(r => [r.id, r.userId, r.email || '', r.deviceId || '', r.deviceName || '', (r.userAgent || '').replace(/"/g, '""'), r.ip || '',
                new Date(r.createdAt).toISOString(), r.lastUsedAt ? new Date(r.lastUsedAt).toISOString() : '', r.expiresAt ? new Date(r.expiresAt).toISOString() : '', r.revokedAt ? new Date(r.revokedAt).toISOString() : ''
            ].map((v) => {
                const s = String(v);
                return /[,"]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
            }).join(',')).join('\n');
            reply.header('Content-Type', 'text/csv; charset=utf-8');
            return reply.send(header + body + '\n');
        }
        return reply.send({ items: rows });
    });
    // Revoke sessions for a user (by deviceId or tokenId, or all)
    app.post('/admin/auth/sessions/revoke', {
        schema: {
            operationId: 'adminAuthSessionsRevoke', tags: ['admin'],
            summary: 'Revoke sessions for user',
            body: { type: 'object', properties: { userId: { type: 'string' }, deviceId: { type: 'string', nullable: true }, tokenId: { type: 'string', nullable: true }, all: { type: 'boolean', nullable: true } }, required: ['userId'] },
            response: { 200: { type: 'object', properties: { count: { type: 'integer' } } } }
        },
        preHandler: app.auth.requireRole('ADMIN')
    }, async (req, reply) => {
        const b = (req.body || {});
        if (!b.all && !b.deviceId && !b.tokenId) {
            return reply.code(400).send({ error: 'Provide deviceId, tokenId, or all=true' });
        }
        const where = { userId: b.userId, revokedAt: null };
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
    // Sweep stale sessions (older than REFRESH_INACTIVITY_MAX_DAYS)
    app.post('/admin/auth/sessions/sweep', {
        schema: { operationId: 'adminAuthSessionsSweep', tags: ['admin'], summary: 'Revoke stale sessions by inactivity', response: { 200: { type: 'object', properties: { count: { type: 'integer' } } } } },
        preHandler: app.auth.requireRole('ADMIN')
    }, async (_req, reply) => {
        const days = Number(process.env.REFRESH_INACTIVITY_MAX_DAYS || 90);
        const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        const res = await prisma_1.default.refreshToken.updateMany({ where: { revokedAt: null, OR: [{ lastUsedAt: { lt: cutoff } }, { AND: [{ lastUsedAt: null }, { createdAt: { lt: cutoff } }] }] }, data: { revokedAt: new Date() } });
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
}
//# sourceMappingURL=admin.sessions.routes.js.map