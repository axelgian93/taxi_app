"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/plugins/availability.ts
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const metrics_service_1 = require("../services/metrics.service");
exports.default = (0, fastify_plugin_1.default)(async (app) => {
    const SAMPLE_SEC = Number(process.env.AVAILABILITY_SAMPLE_SEC || 15);
    const LOCATION_MAX_AGE_MIN = Number(process.env.LOCATION_MAX_AGE_MIN || 10);
    async function sample() {
        try {
            const cutoff = new Date(Date.now() - LOCATION_MAX_AGE_MIN * 60 * 1000);
            const n = await prisma_1.default.driverProfile.count({
                where: {
                    status: 'IDLE',
                    currentLat: { not: null },
                    currentLng: { not: null },
                    locationUpdatedAt: { gte: cutoff },
                },
            });
            (0, metrics_service_1.updateCurrentDriversAvailable)(n);
        }
        catch (e) {
            app.log.warn({ err: String(e) }, 'availability sample failed');
        }
    }
    await sample();
    const timer = setInterval(sample, SAMPLE_SEC * 1000);
    app.addHook('onClose', async () => clearInterval(timer));
});
//# sourceMappingURL=availability.js.map