// scripts/clear-trips.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Limpiando viajes y pagos relacionados...')

  // Borra todos los viajes (Payment se elimina por cascada si dejaste onDelete: Cascade)
  const delTrips = await prisma.trip.deleteMany({})

  // (Opcional) Limpia historiales de ubicación antiguos si te interesa
  // await prisma.driverLocationHistory.deleteMany({})

  // Asegura que ningún driver quede marcado como ON_TRIP
  const updDrivers = await prisma.driverProfile.updateMany({
    where: { status: 'ON_TRIP' },
    data: { status: 'IDLE' },
  })

  console.log(`✅ Eliminados ${delTrips.count} trips.`)
  if (updDrivers.count > 0) {
    console.log(`🔄 Drivers actualizados a IDLE: ${updDrivers.count}`)
  }
}

main()
  .catch((e) => {
    console.error('❌ Error en clear-trips:', e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
