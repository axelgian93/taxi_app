import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import bcrypt from 'bcrypt';

export default async function adminRoutes(app: FastifyInstance) {
  const mustBeAdmin = [app.auth.verifyJWT, app.auth.requireRole('ADMIN')];

  // ===========================
  //  POST /admin/users
  // ===========================
  app.post('/admin/users', {
    preHandler: mustBeAdmin,
    handler: async (req, reply) => {
      const bodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
        fullName: z.string().min(2),
        phone: z.string().optional(),
        role: z.enum(['DRIVER', 'RIDER']),
        driver: z
          .object({
            licenseNumber: z.string().min(5),
          })
          .optional(),
      });

      const { email, password, fullName, phone, role, driver } = bodySchema.parse(req.body);

      const exists = await app.prisma.user.findUnique({ where: { email } });
      if (exists) return reply.code(409).send({ message: 'Email already in use' });

      const passwordHash = await bcrypt.hash(password, 10);

      const created = await app.prisma.user.create({
        data: {
          email,
          passwordHash,
          fullName,
          phone,
          role,
          ...(role === 'DRIVER'
            ? { driver: { create: { licenseNumber: driver?.licenseNumber ?? 'PENDING' } } }
            : { rider: { create: {} } }),
        },
        select: { id: true, email: true, role: true, fullName: true },
      });

      return reply.code(201).send(created);
    },
  });

  // ===========================
  //  POST /admin/vehicles
  // ===========================
  app.post('/admin/vehicles', {
    preHandler: mustBeAdmin,
    handler: async (req, reply) => {
      const bodySchema = z.object({
        driverId: z.string().uuid(),
        plate: z.string().min(5),
        brand: z.string(),
        model: z.string(),
        color: z.string().optional(),
        year: z.number().int().min(1990).max(new Date().getFullYear()).optional(),
      });

      const { driverId, plate, brand, model, color, year } = bodySchema.parse(req.body);

      const driver = await app.prisma.driver.findUnique({ where: { id: driverId } });
      if (!driver) return reply.code(404).send({ message: 'Driver not found' });

      const vehicle = await app.prisma.vehicle.create({
        data: { driverId, plate, brand, model, color, year },
      });

      return reply.code(201).send(vehicle);
    },
  });

  // ===========================
  //  GET /admin/drivers
  // ===========================
  app.get('/admin/drivers', {
    preHandler: mustBeAdmin,
    handler: async (req, reply) => {
      const q = (req.query as any)?.email as string | undefined;

      const drivers = await app.prisma.driver.findMany({
        where: q ? { user: { email: q } } : undefined,
        select: {
          id: true,                // <- driverId
          licenseNumber: true,
          isAvailable: true,
          user: {
            select: {
              id: true,
              email: true,
              fullName: true,
              phone: true,
              role: true,
            },
          },
        },
        take: 50,
      });

      return reply.send(drivers);
    },
  });
}
