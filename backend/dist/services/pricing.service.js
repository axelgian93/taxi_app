"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeFare = computeFare;
// src/services/pricing.service.ts
const prisma_1 = __importDefault(require("../lib/prisma"));
/**
 * Calcula tarifa simple a partir de la TariffRule activa de la ciudad.
 * Si existe configuración nocturna/fin de semana, se aplica como multiplicador (surge).
 */
async function computeFare(input) {
    const when = input.requestedAt ?? new Date();
    // Regla de precios activa más reciente de la ciudad
    const rule = await prisma_1.default.tariffRule.findFirst({
        where: { city: input.city, active: true },
        orderBy: { updatedAt: 'desc' }
    });
    if (!rule) {
        throw new Error(`No hay TariffRule activa para ciudad: ${input.city}`);
    }
    // Multiplicador básico (noche / fin de semana si tu modelo lo tuviera)
    let surgeMultiplier = 1;
    // ejemplo: fin de semana -> 1.1x
    const isWeekend = [0, 6].includes(when.getDay()); // dom=0, sáb=6
    if (isWeekend)
        surgeMultiplier *= 1.1;
    // ejemplo: horario nocturno (22:00-06:00) -> 1.2x
    const h = when.getHours();
    const isNight = h >= 22 || h < 6;
    if (isNight)
        surgeMultiplier *= 1.2;
    const base = Number(rule.baseFareUsd ?? 0);
    const perKm = Number(rule.perKmUsd ?? 0);
    const perMin = Number(rule.perMinUsd ?? 0);
    const minFare = Number(rule.minFareUsd ?? 0);
    const distanceCost = perKm * input.distanceKm;
    const durationCost = perMin * input.durationMin;
    const subtotal = base + distanceCost + durationCost;
    const surged = subtotal * surgeMultiplier;
    const total = Math.max(minFare || 0, surged);
    return {
        baseFareUsd: base,
        perKmUsd: perKm,
        perMinUsd: perMin,
        minFareUsd: minFare,
        surgeMultiplier: Number(surgeMultiplier.toFixed(2)),
        totalUsd: Number(total.toFixed(2)),
        breakdown: {
            base: Number(base.toFixed(2)),
            distance: Number(distanceCost.toFixed(2)),
            duration: Number(durationCost.toFixed(2)),
            surge: Number((surged - subtotal).toFixed(2))
        }
    };
}
//# sourceMappingURL=pricing.service.js.map