"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadKeys = loadKeys;
exports.ensureBootstrapFromEnv = ensureBootstrapFromEnv;
exports.listKeyMeta = listKeyMeta;
exports.getActive = getActive;
exports.findByKid = findByKid;
exports.rotateKey = rotateKey;
exports.signAccessToken = signAccessToken;
// src/services/jwks.service.ts
const prisma_1 = __importDefault(require("../lib/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let cache = { keys: [], loadedAt: 0 };
async function loadKeys() {
    try {
        const rows = await prisma_1.default.$queryRawUnsafe('SELECT kid, secret, active, "createdAt" FROM "JwtKey" ORDER BY "createdAt" DESC');
        cache = { keys: rows, loadedAt: Date.now() };
    }
    catch (e) {
        // Table may not exist yet (migrations pending); fall back to empty cache
        cache = { keys: [], loadedAt: Date.now() };
    }
}
async function ensureBootstrapFromEnv() {
    if (!cache.keys.length)
        await loadKeys();
    if (cache.keys.length === 0) {
        const envSecret = process.env.JWT_SECRET || 'dev-secret';
        const kid = 'default';
        try {
            await prisma_1.default.$executeRawUnsafe('INSERT INTO "JwtKey" (kid, secret, active) VALUES ($1, $2, true) ON CONFLICT (kid) DO NOTHING', kid, envSecret);
            await loadKeys();
        }
        catch {
            // If table is missing, set in-memory active key so server can start
            cache = { keys: [{ kid, secret: envSecret, active: true, createdAt: new Date() }], loadedAt: Date.now() };
        }
    }
}
function listKeyMeta() {
    return cache.keys.map(k => ({ kid: k.kid, active: k.active, createdAt: k.createdAt.toISOString() }));
}
function getActive() {
    return cache.keys.find(k => k.active);
}
function findByKid(kid) {
    if (!kid)
        return getActive();
    return cache.keys.find(k => k.kid === kid) || getActive();
}
async function rotateKey(newKid, newSecret) {
    await prisma_1.default.$executeRawUnsafe('UPDATE "JwtKey" SET active = false WHERE active = true');
    await prisma_1.default.$executeRawUnsafe('INSERT INTO "JwtKey" (kid, secret, active) VALUES ($1, $2, true)', newKid, newSecret);
    await loadKeys();
}
function signAccessToken(payload) {
    const active = getActive();
    const secret = active?.secret || (process.env.JWT_SECRET || 'dev-secret');
    const kid = active?.kid || 'default';
    const exp = process.env.JWT_EXPIRES_IN || '7d';
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: exp, keyid: kid });
}
//# sourceMappingURL=jwks.service.js.map