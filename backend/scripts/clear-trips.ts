// scripts/clear-trips.ts
import 'dotenv/config'
import { PrismaClient, DriverStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🧹 Limpiando trips...')
  const del = await prisma.trip.deleteMany({})
  console.log(`🗑️ Eliminados ${del.count} trips`)

  const upd = await prisma.driverProfile.updateMany({
    data: { status: DriverStatus.IDLE }
  })
  console.log(`🚗 Drivers restablecidos a IDLE: ${upd.count}`)

  console.log('✅ Limpieza completa')
}

main().catch((e) => {
  console.error('❌ Error clear-trips:', e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})
