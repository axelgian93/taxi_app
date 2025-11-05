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
// src/plugins/sessions-sweep.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const prisma_1 = __importDefault(require("../lib/prisma"));
exports.default = (0, fastify_plugin_1.default)(async (app) => {
    const days = Number(process.env.REFRESH_INACTIVITY_MAX_DAYS || 90);
    const sweepSec = Number(process.env.REFRESH_SWEEP_SEC || 3600);
    if (!(days > 0) || !(sweepSec > 0))
        return;
    async function sweepOnce() {
        const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
        try {
            // Revoke tokens where lastUsedAt < cutoff or (lastUsedAt is null and createdAt < cutoff)
            const res = await prisma_1.default.refreshToken.updateMany({
                where: { revokedAt: null, OR: [{ lastUsedAt: { lt: cutoff } }, { AND: [{ lastUsedAt: null }, { createdAt: { lt: cutoff } }] }] },
                data: { revokedAt: new Date() }
            });
            if (res.count > 0) {
                try {
                    const { incCounter } = await Promise.resolve().then(() => __importStar(require('../services/metrics.service')));
                    for (let i = 0; i < res.count; i++)
                        incCounter('session_revokes_total');
                }
                catch { }
                app.log.info({ count: res.count }, 'sessions-sweep: revoked stale sessions');
            }
        }
        catch (e) {
            app.log.warn({ err: e }, 'sessions-sweep error');
        }
    }
    // initial sweep (non-blocking)
    setTimeout(sweepOnce, 5000).unref();
    // periodic sweep
    const timer = setInterval(sweepOnce, sweepSec * 1000);
    timer.unref();
});
//# sourceMappingURL=sessions-sweep.js.map