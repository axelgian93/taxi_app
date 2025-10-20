import type { FastifyInstance } from 'fastify';
import { z } from 'zod';

export default async function geoRoutes(app: FastifyInstance) {
  // DRIVER: actualiza su propia ubicación y disponibilidad
  app.patch('/driver/location', {
    preHandler: [app.auth.verifyJWT, app.auth.requireRole('DRIVER')],
    handler: async (req, reply) => {
      const bodySchema = z.object({
        lat: z.number().min(-90).max(90),
        lng: z.number().min(-180).max(180),
        isAvailable: z.boolean().optional(),
      });
      const body = bodySchema.parse((req as any).body);

      // user.id -> driver
      const driver = await app.prisma.driver.findUnique({
        where: { userId: (req.user as any).id },
        select: { id: true },
      });
      if (!driver) return reply.code(404).send({ message: 'Driver not found' });

      const updated = await app.prisma.driver.update({
        where: { id: driver.id },
        data: {
          currentLat: body.lat,
          currentLng: body.lng,
          ...(typeof body.isAvailable === 'boolean' ? { isAvailable: body.isAvailable } : {}),
        },
        select: { id: true, isAvailable: true, currentLat: true, currentLng: true },
      });

      return reply.send(updated);
    },
  });

  // ADMIN: cambiar disponibilidad de cualquier driver
  app.patch('/admin/drivers/:driverId/availability', {
    preHandler: [app.auth.verifyJWT, app.auth.requireRole('ADMIN')],
    handler: async (req, reply) => {
      const paramsSchema = z.object({ driverId: z.string().uuid() });
      const bodySchema = z.object({ isAvailable: z.boolean() });

      const { driverId } = paramsSchema.parse((req as any).params);
      const { isAvailable } = bodySchema.parse((req as any).body);

      const updated = await app.prisma.driver.update({
        where: { id: driverId },
        data: { isAvailable },
        select: { id: true, isAvailable: true },
      });

      return reply.send(updated);
    },
  });

  // DISPATCH: conductores disponibles más cercanos (PostGIS)
  app.post('/dispatch/nearest', {
    preHandler: [app.auth.verifyJWT], // puedes exigir ADMIN o RIDER según tu flujo
    handler: async (req, reply) => {
      const bodySchema = z.object({
        origin: z.object({ lat: z.number(), lng: z.number() }),
        radiusKm: z.number().positive().max(50).default(5),
        limit: z.number().int().min(1).max(50).default(5),
      });
      const { origin, radiusKm, limit } = bodySchema.parse((req as any).body);

      // Usamos PostGIS con puntos on-the-fly desde lat/lng
      // ST_DistanceSphere para distancia en metros
      // Filtramos drivers disponibles con ubicación conocida
      const rows = await app.prisma.$queryRaw<
        Array<{
          driver_id: string;
          user_id: string;
          full_name: string | null;
          email: string;
          license_number: string;
          vehicle_plate: string | null;
          vehicle_brand: string | null;
          vehicle_model: string | null;
          distance_m: number;
          current_lat: number | null;
          current_lng: number | null;
        }>
      >`
        SELECT
          d.id AS driver_id,
          u.id AS user_id,
          u."fullName" AS full_name,
          u.email,
          d."licenseNumber" AS license_number,
          v.plate AS vehicle_plate,
          v.brand AS vehicle_brand,
          v.model AS vehicle_model,
          ST_DistanceSphere(
            ST_SetSRID(ST_MakePoint(d."currentLng", d."currentLat"), 4326),
            ST_SetSRID(ST_MakePoint(${origin.lng}, ${origin.lat}), 4326)
          ) AS distance_m,
          d."currentLat" AS current_lat,
          d."currentLng" AS current_lng
        FROM "Driver" d
        JOIN "User" u ON u.id = d."userId"
        LEFT JOIN "Vehicle" v ON v."driverId" = d.id
        WHERE
          d."isAvailable" = true
          AND d."currentLat" IS NOT NULL
          AND d."currentLng" IS NOT NULL
          AND ST_DWithin(
            ST_SetSRID(ST_MakePoint(d."currentLng", d."currentLat"), 4326)::geography,
            ST_SetSRID(ST_MakePoint(${origin.lng}, ${origin.lat}), 4326)::geography,
            ${radiusKm * 1000}
          )
        ORDER BY distance_m ASC
        LIMIT ${limit};
      `;

      return reply.send({
        origin,
        radiusKm,
        count: rows.length,
        drivers: rows.map(r => ({
          driverId: r.driver_id,
          userId: r.user_id,
          fullName: r.full_name,
          email: r.email,
          licenseNumber: r.license_number,
          vehicle: r.vehicle_plate
            ? { plate: r.vehicle_plate, brand: r.vehicle_brand, model: r.vehicle_model }
            : null,
          distanceMeters: Math.round(r.distance_m),
          location: r.current_lat != null && r.current_lng != null
            ? { lat: Number(r.current_lat), lng: Number(r.current_lng) }
            : null,
        })),
      });
    },
  });
}
