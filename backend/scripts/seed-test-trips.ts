// scripts/seed-test-trips.ts
import { PrismaClient, TripStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const rider = await prisma.user.findUnique({ where: { id: 'u_rider' } })
  const driver = await prisma.user.findUnique({ where: { id: 'u_driver' } })
  const vehicle = await prisma.vehicle.findFirst({ where: { driverId: 'dp_driver' } })
  const tariff = await prisma.tariffRule.findFirst({ where: { city: 'Guayaquil', active: true } })

  if (!rider || !driver || !vehicle || !tariff) {
    throw new Error('Faltan datos base (rider, driver, vehicle o tarifa). Corre primero: npm run bootstrap')
  }

  // Snapshot JSON-serializable (sin Decimal)
  const ruleSnapshot = {
    id: tariff.id,
    city: tariff.city,
    active: tariff.active,
    baseFareUsd: Number(tariff.baseFareUsd),
    perKmUsd: Number(tariff.perKmUsd),
    perMinUsd: Number(tariff.perMinUsd),
    minFareUsd: Number(tariff.minFareUsd ?? 0),
    nightMultiplier: Number(tariff.nightMultiplier ?? 1),
    weekendMultiplier: Number(tariff.weekendMultiplier ?? 1),
    surgeMultiplier: Number(tariff.surgeMultiplier ?? 1),
    nightStartHour: tariff.nightStartHour,
    nightEndHour: tariff.nightEndHour,
    validFrom: tariff.validFrom?.toISOString() ?? null,
    validTo: tariff.validTo?.toISOString() ?? null,
    updatedAt: tariff.updatedAt.toISOString(),
  }

  console.log('🚕 Creando viajes de prueba para /admin/trips...')

  const trips: Array<{
    status: TripStatus
    distanceKm: number
    durationMin: number
    costUsd: number
    requestedAt: Date
    completedAt?: Date
    canceledAt?: Date
    cancelReason?: string
  }> = [
    {
      status: TripStatus.COMPLETED,
      distanceKm: 4.3,
      durationMin: 12,
      costUsd: 3.2,
      requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 20 * 60000),
    },
    {
      status: TripStatus.COMPLETED,
      distanceKm: 6.8,
      durationMin: 18,
      costUsd: 4.8,
      requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 + 25 * 60000),
    },
    {
      status: TripStatus.CANCELED,
      distanceKm: 3.1,
      durationMin: 9,
      costUsd: 2.5,
      cancelReason: 'El pasajero canceló',
      requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
      canceledAt: new Date(Date.now() - 1000 * 60 * 60 * 7 + 15 * 60000),
    },
    {
      status: TripStatus.ASSIGNED,
      distanceKm: 5.5,
      durationMin: 16,
      costUsd: 4.1,
      requestedAt: new Date(),
    },
  ]

  for (const t of trips) {
    await prisma.trip.create({
      data: {
        riderId: rider.id,
        driverId: driver.id,
        vehicleId: vehicle.id,
        status: t.status,
        requestedAt: t.requestedAt,
        completedAt: t.completedAt ?? null,
        canceledAt: t.canceledAt ?? null,
        cancelReason: t.cancelReason ?? null,
        distanceKm: t.distanceKm,
        durationMin: t.durationMin,
        costUsd: t.costUsd,
        currency: 'USD',
        pickupLat: -2.170,
        pickupLng: -79.922,
        dropoffLat: -2.190,
        dropoffLng: -79.890,
        pickupAddress: 'Centro',
        dropoffAddress: 'Norte',
        pricingSnapshot: ruleSnapshot, // 👈 JSON plano
      },
    })
  }

  console.log(`✅ Se crearon ${trips.length} viajes de prueba.`)
}

main()
  .catch((e) => {
    console.error('❌ Error en seed-test-trips:', e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
