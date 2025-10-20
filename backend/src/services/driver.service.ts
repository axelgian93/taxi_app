import { prisma } from '../lib/prisma'

const MAX_KM = Number(process.env.MAX_ASSIGN_KM ?? 10)
const MAX_MINUTES_SINCE_UPDATE = Number(process.env.MAX_LOC_MINUTES ?? 5)

export async function findNearestDriver(pickLat: number, pickLng: number) {
  // Usamos raw SQL con Haversine, como te mostré antes
  const rows = await prisma.$queryRaw<
    Array<{ id: string; userId: string; distance_km: number }>
  >`
    WITH candidates AS (
      SELECT
        dp.id,
        dp."userId",
        dp."currentLat"::float8 AS lat,
        dp."currentLng"::float8 AS lng,
        dp."locationUpdatedAt"
      FROM "DriverProfile" dp
      WHERE dp.status = 'IDLE'
        AND dp."currentLat" IS NOT NULL
        AND dp."currentLng" IS NOT NULL
        AND dp."locationUpdatedAt" >= NOW() - INTERVAL '${MAX_MINUTES_SINCE_UPDATE} minutes'
    )
    SELECT
      c.id,
      c."userId",
      ( 6371 * acos(
          cos(radians(${pickLat})) * cos(radians(c.lat)) *
          cos(radians(c.lng) - radians(${pickLng})) +
          sin(radians(${pickLat})) * sin(radians(c.lat))
      )) AS distance_km
    FROM candidates c
    WHERE ( 6371 * acos(
          cos(radians(${pickLat})) * cos(radians(c.lat)) *
          cos(radians(c.lng) - radians(${pickLng})) +
          sin(radians(${pickLat})) * sin(radians(c.lat))
    )) <= ${MAX_KM}
    ORDER BY distance_km ASC
    LIMIT 1;
  `
  return rows[0] ?? null
}

export async function upsertDriverLocation(driverUserId: string, lat: number, lng: number) {
  // Obtenemos DriverProfile por userId
  const driver = await prisma.driverProfile.findUnique({
    where: { userId: driverUserId },
  })
  if (!driver) throw new Error('DriverProfile no encontrado para el usuario indicado')

  // Actualizamos ubicación actual y guardamos histórico
  const updated = await prisma.$transaction(async (tx) => {
    const dp = await tx.driverProfile.update({
      where: { id: driver.id },
      data: {
        currentLat: lat,
        currentLng: lng,
        locationUpdatedAt: new Date(),
      },
    })
    await tx.driverLocationHistory.create({
      data: {
        driverId: driver.id,
        lat,
        lng,
      },
    })
    return dp
  })

  return updated
}
