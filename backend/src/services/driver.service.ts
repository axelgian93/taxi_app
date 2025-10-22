// src/services/driver.service.ts
import prisma from '../lib/prisma'

export type LatLng = { lat: number; lng: number }

/**
 * Actualiza la ubicación del driver:
 * - Inserta un registro en DriverLocationHistory con lat/lng
 * - Deja al driver en estado IDLE (disponible)
 * Nota: No tocamos lastLat/lastLng porque no existen en DriverProfile.
 */
export async function updateDriverLocation(userId: string, coord: LatLng) {
  // Buscar el perfil del driver por userId
  const dp = await prisma.driverProfile.findFirst({ where: { userId } })
  if (!dp) return

  // Guardar punto en historial
  await prisma.driverLocationHistory.create({
    data: { driverId: dp.id, lat: coord.lat as any, lng: coord.lng as any }
  })

  // Ponerlo disponible
  await prisma.driverProfile.update({
    where: { id: dp.id },
    data: { status: 'IDLE' as any }
  })
}

/** Cambia el estado del driver (OFFLINE | IDLE | ON_TRIP). */
export async function setDriverStatus(userId: string, status: 'OFFLINE' | 'IDLE' | 'ON_TRIP') {
  await prisma.driverProfile.updateMany({
    where: { userId },
    data: { status: status as any }
  })
}

/** Busca un driver disponible simple: el más recientemente actualizado con status IDLE. */
export async function findNearestIdleDriver() {
  return prisma.driverProfile.findFirst({
    where: { status: 'IDLE' as any },
    orderBy: { updatedAt: 'desc' }
  })
}
