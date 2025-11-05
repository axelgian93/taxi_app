"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/driver-presence.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const prisma_1 = __importDefault(require("../lib/prisma"));
exports.default = (0, fastify_plugin_1.default)(async (app) => {
    const intervalSec = Math.max(30, Number(process.env.DRIVER_PRESENCE_SWEEP_SEC || 60));
    const maxAgeMin = Math.max(1, Number(process.env.DRIVER_PRESENCE_MAX_AGE_MIN || 10));
    const sweep = async () => {
        const sql = `
      UPDATE "DriverProfile"
      SET "status" = 'OFFLINE', "updatedAt" = NOW()
      WHERE ("locationUpdatedAt" IS NULL OR "locationUpdatedAt" < NOW() - (interval '1 minute' * ${maxAgeMin}))
        AND "status" <> 'OFFLINE'
    `;
        try {
            await prisma_1.default.$executeRawUnsafe(sql);
        }
        catch { }
    };
    const timer = setInterval(sweep, intervalSec * 1000);
    app.addHook('onClose', async () => { clearInterval(timer); });
});
//# sourceMappingURL=driver-presence.js.map