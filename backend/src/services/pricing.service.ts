import { prisma } from '../lib/prisma'

export type PricingInput = {
  city: string
  distanceKm: number
  durationMin: number
  requestedAt?: Date
}

export async function computeFare(input: PricingInput) {
  const when = input.requestedAt ?? new Date()

  const rule = await prisma.tariffRule.findFirst({
    where: {
      city: input.city,
      active: true,
      OR: [
        { validFrom: null, validTo: null },
        { validFrom: { lte: when }, validTo: null },
        { validFrom: null, validTo: { gte: when } },
        { AND: [{ validFrom: { lte: when } }, { validTo: { gte: when } }] },
      ],
    },
    orderBy: { updatedAt: 'desc' },
  })

  if (!rule) {
    throw new Error(`No hay TariffRule activa para ciudad: ${input.city}`)
  }

  let multiplier = Number(rule.surgeMultiplier)
  const hour = when.getHours()
  const isWeekend = [0, 6].includes(when.getDay())

  if (
    rule.nightStartHour !== null &&
    rule.nightEndHour !== null &&
    rule.nightStartHour !== undefined &&
    rule.nightEndHour !== undefined
  ) {
    const ns = rule.nightStartHour
    const ne = rule.nightEndHour
    const isNight = ns < ne ? hour >= ns && hour < ne : hour >= ns || hour < ne
    if (isNight) multiplier *= Number(rule.nightMultiplier)
  }

  if (isWeekend) multiplier *= Number(rule.weekendMultiplier)

  const base = Number(rule.baseFareUsd)
  const perKm = Number(rule.perKmUsd) * input.distanceKm
  const perMin = Number(rule.perMinUsd) * input.durationMin
  let total = (base + perKm + perMin) * multiplier

  const minFare = Number(rule.minFareUsd || 0)
  if (total < minFare) total = minFare

  return {
    currency: 'USD',
    total: Number(total.toFixed(2)),
    breakdown: {
      base: Number(base.toFixed(2)),
      perKm: Number((Number(rule.perKmUsd) * input.distanceKm).toFixed(2)),
      perMin: Number((Number(rule.perMinUsd) * input.durationMin).toFixed(2)),
      multiplier: Number(multiplier.toFixed(2)),
      minFareApplied: total === minFare,
    },
    ruleSnapshot: {
      id: rule.id,
      city: rule.city,
      baseFareUsd: rule.baseFareUsd,
      perKmUsd: rule.perKmUsd,
      perMinUsd: rule.perMinUsd,
      minFareUsd: rule.minFareUsd,
      nightMultiplier: rule.nightMultiplier,
      weekendMultiplier: rule.weekendMultiplier,
      surgeMultiplier: rule.surgeMultiplier,
      nightStartHour: rule.nightStartHour,
      nightEndHour: rule.nightEndHour,
      validFrom: rule.validFrom,
      validTo: rule.validTo,
      updatedAt: rule.updatedAt,
    },
  }
}
