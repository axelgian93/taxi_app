// backend/src/routes/admin.trips.ts
import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

export default async function adminTripsRoutes(app: FastifyInstance) {
  const mustBeAdmin = [app.auth.verifyJWT, app.auth.requireRole('ADMIN')];

  // GET /admin/trips?from=...&to=...&city=Guayaquil&status=COMPLETED&page=1&pageSize=20
  app.get('/admin/trips', {
    preHandler: mustBeAdmin,
    handler: async (req, reply) => {
      const q = z.object({
        from: z.string().datetime({ offset: true }).optional(),
        to: z.string().datetime({ offset: true }).optional(),
        city: z.string().optional(),
        status: z
          .enum(['REQUESTED', 'ASSIGNED', 'PICKING_UP', 'ON_TRIP', 'COMPLETED', 'CANCELED'])
          .optional(),
        driverEmail: z.string().email().optional(),
        riderEmail: z.string().email().optional(),
        page: z.coerce.number().int().min(1).default(1),
        pageSize: z.coerce.number().int().min(1).max(100).default(20),
      }).parse((req as any).query);

      const where: any = {};
      if (q.city) where.city = q.city;
      if (q.status) where.status = q.status;
      if (q.from || q.to) {
        where.requestedAt = {};
        if (q.from) where.requestedAt.gte = new Date(q.from);
        if (q.to) where.requestedAt.lte = new Date(q.to);
      }
      if (q.driverEmail) where.driver = { user: { email: q.driverEmail } };
      if (q.riderEmail) where.rider = { user: { email: q.riderEmail } };

      const skip = (q.page - 1) * q.pageSize;

      const [items, total] = await app.prisma.$transaction([
        app.prisma.trip.findMany({
          where,
          orderBy: { requestedAt: 'desc' },
          skip,
          take: q.pageSize,
          // ⬇️ Trae TODA la parte escalar del Trip y añade relaciones
          include: {
            rider:  { include: { user: { select: { email: true, fullName: true } } } },
            driver: { include: { user: { select: { email: true, fullName: true } } } },
            vehicle:{ select: { plate: true, brand: true, model: true, color: true, year: true } },
          },
        }),
        app.prisma.trip.count({ where }),
      ]);

      return reply.send({
        page: q.page,
        pageSize: q.pageSize,
        total,
        items,
      });
    },
  });

  // GET /admin/trips/:id
  app.get('/admin/trips/:id', {
    preHandler: mustBeAdmin,
    handler: async (req, reply) => {
      const { id } = z.object({ id: z.string().uuid() }).parse((req as any).params);

      const trip = await app.prisma.trip.findUnique({
        where: { id },
        // ⬇️ Igual: devolvemos escalares + relaciones
        include: {
          rider:  { include: { user: { select: { email: true, fullName: true, phone: true } } } },
          driver: { include: { user: { select: { email: true, fullName: true, phone: true } } } },
          vehicle:{ select: { plate: true, brand: true, model: true, color: true, year: true } },
        },
      });

      if (!trip) return reply.code(404).send({ message: 'Trip not found' });
      return reply.send(trip);
    },
  });
}
