import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { haversineKm } from '../utils/geo.ts';

function isNight(date: Date) {
  const h = date.getHours();
  // Recargo nocturno aprox. EC: 22:00–05:59
  return h >= 22 || h < 6;
}

function isWeekend(date: Date) {
  const d = date.getDay(); // 0=Dom, 6=Sáb
  return d === 0 || d === 6;
}

export default async function pricingRoutes(app: FastifyInstance) {
  // ----------------------------
  // GET /pricing/config?city=Guayaquil
  // ----------------------------
  app.get('/pricing/config', {
    handler: async (req, reply) => {
      const querySchema = z.object({
        city: z.string().min(2),
      });
      const { city } = querySchema.parse((req as any).query);

      const cfg = await app.prisma.fareConfig.findFirst({
        where: { city, active: true },
        orderBy: { activeFrom: 'desc' },
      });
      if (!cfg) return reply.code(404).send({ message: `No fare config for ${city}` });
      return reply.send(cfg);
    },
  });

  // ----------------------------
  // POST /pricing/estimate
  // ----------------------------
  app.post('/pricing/estimate', {
    handler: async (req, reply) => {
      const bodySchema = z.object({
        city: z.string().min(2),
        origin: z.object({ lat: z.number(), lng: z.number() }),
        dest: z.object({ lat: z.number(), lng: z.number() }),
        distanceKm: z.number().positive().optional(),
        durationMin: z.number().positive().optional(),
        // ⬇️ ahora acepta offsets como -05:00
        requestedAt: z.string().datetime({ offset: true }).optional(),
      });

      const body = bodySchema.parse((req as any).body);

      const cfg = await app.prisma.fareConfig.findFirst({
        where: { city: body.city, active: true },
        orderBy: { activeFrom: 'desc' },
      });
      if (!cfg) return reply.code(404).send({ message: `No fare config for ${body.city}` });

      const when = body.requestedAt ? new Date(body.requestedAt) : new Date();

      // Distancia (km)
      const distKm =
        body.distanceKm ??
        haversineKm(body.origin.lat, body.origin.lng, body.dest.lat, body.dest.lng);

      // Duración (min) — si no viene, estimamos a 25 km/h
      const durMin =
        body.durationMin ?? Math.max(1, Math.round((distKm / 25) * 60));

      // Componentes
      const base = Number(cfg.baseFare);
      const perKm = Number(cfg.perKm) * distKm;
      const perMin = Number(cfg.perMin) * durMin;

      let subtotal = base + perKm + perMin;

      // Mínimo
      const minFare = Number(cfg.minFare);
      if (subtotal < minFare) subtotal = minFare;

      // Recargos
      let surchargePct = 0;
      const nightApplies = isNight(when) && cfg.nightPct > 0;
      const weekendApplies = isWeekend(when) && cfg.weekendPct > 0;

      if (nightApplies) surchargePct += cfg.nightPct;
      if (weekendApplies) surchargePct += cfg.weekendPct;

      const surchargeAmount = Math.round((subtotal * surchargePct) / 100 * 100) / 100;
      const total = subtotal + surchargeAmount;

      const toCents = (v: number) => Math.round(v * 100);

      return reply.send({
        city: body.city,
        requestedAt: when.toISOString(),
        currency: 'USD',
        breakdown: {
          base: +base.toFixed(2),
          perKm: +perKm.toFixed(2),
          perMin: +perMin.toFixed(2),
          minFare: +minFare.toFixed(2),
          nightPct: nightApplies ? cfg.nightPct : 0,
          weekendPct: weekendApplies ? cfg.weekendPct : 0,
          surchargeAmount: +surchargeAmount.toFixed(2),
          distanceKm: +distKm.toFixed(3),
          durationMin: durMin,
        },
        amount: {
          totalUsd: +total.toFixed(2),
          totalCents: toCents(total),
        },
      });
    },
  });
}
