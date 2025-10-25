// scripts/dev-bootstrap.ts
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Inicializando datos base para Taxi App...')

  // 🔑 Hash para contraseña común (123456)
  const hash = await bcrypt.hash('123456', 10)

  // 👑 Admin
  const admin = await prisma.user.upsert({
    where: { id: 'u_admin' },
    update: { passwordHash: hash },
    create: {
      id: 'u_admin',
      email: 'admin@taxi.local',
      passwordHash: hash,
      firstName: 'Admin',
      lastName: 'Root',
      role: 'ADMIN',
      isActive: true,
    },
  })

  // 🚗 Driver user
  const driverUser = await prisma.user.upsert({
    where: { id: 'u_driver' },
    update: { passwordHash: hash },
    create: {
      id: 'u_driver',
      email: 'driver@taxi.local',
      passwordHash: hash,
      firstName: 'Driver',
      lastName: 'Demo',
      role: 'DRIVER',
      isActive: true,
    },
  })

  // 🧍 Rider user
  const riderUser = await prisma.user.upsert({
    where: { id: 'u_rider' },
    update: { passwordHash: hash },
    create: {
      id: 'u_rider',
      email: 'rider@taxi.local',
      passwordHash: hash,
      firstName: 'Rider',
      lastName: 'Demo',
      role: 'RIDER',
      isActive: true,
    },
  })

  // 👨‍✈️ Driver profile
  const driverProfile = await prisma.driverProfile.upsert({
    where: { id: 'dp_driver' },
    update: {},
    create: {
      id: 'dp_driver',
      userId: driverUser.id,
      licenseNumber: 'LIC-DRIVER-001',
      status: 'IDLE',
      rating: 4.8 as any, // Decimal en Prisma acepta number
      totalTrips: 0,
      currentLat: -2.170 as any,
      currentLng: -79.922 as any,
      locationUpdatedAt: new Date(),
    },
  })

  // 🚘 Vehicle asociado (si ya existe por driverId, lo reusa)
  let vehicle = await prisma.vehicle.findFirst({
    where: { driverId: driverProfile.id },
  })

  if (!vehicle) {
    vehicle = await prisma.vehicle.create({
      data: {
        id: 'v_driver',
        driverId: driverProfile.id,
        plate: 'ABC-123',
        brand: 'Kia',
        model: 'Rio',
        color: 'Blanco',
        year: 2021,
        seats: 4,
        type: 'SEDAN', // usar literal del enum
        isActive: true,
      },
    })
  }

  // 👤 Rider profile
  await prisma.riderProfile.upsert({
    where: { userId: riderUser.id },
    update: {},
    create: { userId: riderUser.id },
  })

  // 💰 Tarifa base Guayaquil
  const tariffRule = await prisma.tariffRule.upsert({
    where: { id: 'tariff_gye' },
    update: {},
    create: {
      id: 'tariff_gye',
      city: 'Guayaquil',
      active: true,
      baseFareUsd: 1.5 as any,
      perKmUsd: 0.5 as any,
      perMinUsd: 0.15 as any,
      minFareUsd: 2.0 as any,
      nightMultiplier: 1.2 as any,
      weekendMultiplier: 1.3 as any,
      surgeMultiplier: 1.0 as any,
      nightStartHour: 22,
      nightEndHour: 5,
      validFrom: new Date('2025-01-01'),
    },
  })

  console.log('✅ Datos base creados correctamente:')
  console.table([
    { Role: 'ADMIN', Email: admin.email },
    { Role: 'DRIVER', Email: driverUser.email },
    { Role: 'RIDER', Email: riderUser.email },
  ])
  console.log('🔑 Usuarios: admin@taxi.local / driver@taxi.local / rider@taxi.local')
  console.log('🔑 Password común: 123456')
  console.log('🚘 DriverProfile:', driverProfile.id, ' Vehicle:', vehicle.id, ' TariffRule:', tariffRule.id)
}

main()
  .catch((e) => {
    console.error('❌ Error al ejecutar bootstrap:', e)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
