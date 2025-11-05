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
exports.generateRefreshTokenString = generateRefreshTokenString;
exports.hashToken = hashToken;
exports.issueRefreshToken = issueRefreshToken;
exports.rotateRefreshToken = rotateRefreshToken;
exports.revokeRefreshToken = revokeRefreshToken;
exports.revokeAllForUser = revokeAllForUser;
// src/modules/auth/refresh.service.ts
const crypto_1 = __importDefault(require("crypto"));
const prisma_1 = __importDefault(require("../../lib/prisma"));
const DEFAULT_TTL_DAYS = Number(process.env.REFRESH_TOKEN_TTL_DAYS || 30);
function base64url(buf) {
    return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
function generateRefreshTokenString() {
    const buf = crypto_1.default.randomBytes(48);
    return base64url(buf);
}
function hashToken(raw) {
    return crypto_1.default.createHash('sha256').update(raw).digest('hex');
}
async function issueRefreshToken(userId, ttlDays = DEFAULT_TTL_DAYS, meta = {}) {
    const raw = generateRefreshTokenString();
    const tokenHash = hashToken(raw);
    const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000);
    await prisma_1.default.refreshToken.create({ data: {
            userId,
            tokenHash,
            expiresAt,
            deviceId: meta.deviceId || null,
            deviceName: meta.deviceName || null,
            userAgent: meta.userAgent || null,
            ip: meta.ip || null,
            lastUsedAt: new Date(),
        } });
    return { token: raw, expiresAt };
}
async function rotateRefreshToken(oldRaw, meta = {}) {
    const tokenHash = hashToken(oldRaw);
    const existing = await prisma_1.default.refreshToken.findFirst({ where: { tokenHash, revokedAt: null, expiresAt: { gt: new Date() } } });
    if (!existing)
        return null;
    await prisma_1.default.refreshToken.update({ where: { id: existing.id }, data: { revokedAt: new Date() } });
    const { token, expiresAt } = await issueRefreshToken(existing.userId, DEFAULT_TTL_DAYS, {
        deviceId: meta.deviceId || existing.deviceId || null,
        deviceName: meta.deviceName || existing.deviceName || null,
        userAgent: meta.userAgent || null,
        ip: meta.ip || null,
    });
    return { userId: existing.userId, token, expiresAt };
}
async function revokeRefreshToken(raw) {
    const tokenHash = hashToken(raw);
    const existing = await prisma_1.default.refreshToken.findFirst({ where: { tokenHash, revokedAt: null } });
    if (!existing)
        return false;
    await prisma_1.default.refreshToken.update({ where: { id: existing.id }, data: { revokedAt: new Date() } });
    try {
        const { incCounter } = await Promise.resolve().then(() => __importStar(require('../../services/metrics.service')));
        incCounter('session_revokes_total');
    }
    catch { }
    return true;
}
async function revokeAllForUser(userId) {
    const res = await prisma_1.default.refreshToken.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } });
    if (res.count > 0) {
        try {
            const { incCounter } = await Promise.resolve().then(() => __importStar(require('../../services/metrics.service')));
            for (let i = 0; i < res.count; i++)
                incCounter('session_revokes_total');
        }
        catch { }
    }
    return res.count;
}
//# sourceMappingURL=refresh.service.js.map