import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Admin
  const adminEmail = 'admin@taxi.local';
  const adminPassword = 'Admin123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      fullName: 'Super Admin',
      role: Role.ADMIN,
      passwordHash,
    },
  });

  // Tarifas iniciales (coloca valores oficiales de tu ciudad luego)
  // Quito (placeholder, ajustaremos más adelante)
  await prisma.fareConfig.upsert({
    where: { city_activeFrom: { city: 'Quito', activeFrom: new Date('2025-01-01') } },
    update: {},
    create: {
      city: 'Quito',
      baseFare: 2.00,
      perKm: 0.50,
      perMin: 0.08,
      minFare: 1.50,
      nightPct: 20,
      weekendPct: 10,
      activeFrom: new Date('2025-01-01'),
      active: true,
    },
  });

  // Guayaquil (placeholder)
  await prisma.fareConfig.upsert({
    where: { city_activeFrom: { city: 'Guayaquil', activeFrom: new Date('2025-01-01') } },
    update: {},
    create: {
      city: 'Guayaquil',
      baseFare: 1.50,
      perKm: 0.45,
      perMin: 0.07,
      minFare: 1.50,
      nightPct: 20,
      weekendPct: 10,
      activeFrom: new Date('2025-01-01'),
      active: true,
    },
  });

  console.log('Seed completo. Admin:', adminEmail, 'pass:', adminPassword);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
