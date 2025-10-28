// src/modules/admin/admin.tariff.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'

export default async function adminTariffRoutes(app: FastifyInstance) {
  const money = { type: 'number', minimum: 0, multipleOf: 0.01 } as const
  const ruleBody = {
    type: 'object',
    required: ['city', 'baseFareUsd', 'perKmUsd', 'perMinUsd'],
    properties: {
      city: { type: 'string', minLength: 2, example: 'Guayaquil' },
      active: { type: 'boolean', default: true },
      baseFareUsd: money,
      perKmUsd: money,
      perMinUsd: money,
      minFareUsd: money,
      nightMultiplier: { type: 'number', minimum: 0, default: 1.0 },
      weekendMultiplier: { type: 'number', minimum: 0, default: 1.0 },
      surgeMultiplier: { type: 'number', minimum: 0, default: 1.0 },
      nightStartHour: { type: 'integer', minimum: 0, maximum: 23, nullable: true },
      nightEndHour: { type: 'integer', minimum: 0, maximum: 23, nullable: true },
      cancellationGraceSec: { type: 'integer', minimum: 0, nullable: true, example: 120 },
      cancellationFeeAcceptedUsd: money,
      cancellationFeeArrivedUsd: money,
      notes: { type: 'string', nullable: true },
      deactivateOld: { type: 'boolean', default: true, description: 'Si true, desactiva reglas activas previas de la misma ciudad' },
    },
    additionalProperties: false,
    example: {
      city: 'Guayaquil', active: true,
      baseFareUsd: 1.5, perKmUsd: 0.5, perMinUsd: 0.15, minFareUsd: 2.0,
      nightMultiplier: 1.2, weekendMultiplier: 1.1, surgeMultiplier: 1.0,
      nightStartHour: 22, nightEndHour: 5,
      cancellationGraceSec: 120, cancellationFeeAcceptedUsd: 1.0, cancellationFeeArrivedUsd: 2.0,
      notes: 'Regla base ciudad', deactivateOld: true,
    }
  } as const

  const rulePatch = {
    type: 'object',
    properties: { ...ruleBody.properties },
    additionalProperties: false,
  } as const

  const ruleSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' }, city: { type: 'string' }, active: { type: 'boolean' },
      baseFareUsd: money, perKmUsd: money, perMinUsd: money, minFareUsd: money,
      nightMultiplier: { type: 'number' }, weekendMultiplier: { type: 'number' }, surgeMultiplier: { type: 'number' },
      nightStartHour: { type: 'integer', nullable: true }, nightEndHour: { type: 'integer', nullable: true },
      cancellationGraceSec: { type: 'integer', nullable: true },
      cancellationFeeAcceptedUsd: money, cancellationFeeArrivedUsd: money,
      validFrom: { type: 'string', format: 'date-time', nullable: true },
      validTo: { type: 'string', format: 'date-time', nullable: true },
      notes: { type: 'string', nullable: true },
      createdAt: { type: 'string', format: 'date-time' }, updatedAt: { type: 'string', format: 'date-time' },
    }
  } as const

  const listQuery = {
    type: 'object',
    properties: { city: { type: 'string' }, active: { type: 'boolean' } },
    additionalProperties: false,
  } as const

  // GET /admin/tariffs - list
  app.get(
    '/admin/tariffs',
    { schema: { operationId: 'adminTariffsList', tags: ['admin'], summary: 'Listar TariffRule', description: 'Lista reglas por ciudad.', querystring: listQuery, response: { 200: { type: 'object', properties: { items: { type: 'array', items: ruleSchema } } }, 401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } }, 403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } } } }, preHandler: app.auth.requireRole('ADMIN') },
    async (req, reply) => {
      const q = (req.query || {}) as any
      const items = await prisma.tariffRule.findMany({ where: { city: q.city || undefined, active: typeof q.active === 'boolean' ? q.active : undefined }, orderBy: [{ city: 'asc' }, { updatedAt: 'desc' }], take: 200 })
      return reply.send({ items })
    }
  )

  // POST /admin/tariffs - create and optionally deactivate old rules by city
  app.post(
    '/admin/tariffs',
    { schema: { operationId: 'adminTariffsCreate', tags: ['admin'], summary: 'Crear TariffRule', description: 'Crea una regla y opcionalmente desactiva reglas activas previas de la misma ciudad.', body: ruleBody, response: { 200: ruleSchema, 401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } }, 403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } } } }, preHandler: app.auth.requireRole('ADMIN') },
    async (req, reply) => {
      const b = (req.body || {}) as any
      if (b.deactivateOld) {
        await prisma.tariffRule.updateMany({ where: { city: b.city, active: true }, data: { active: false } })
      }
      const rule = await prisma.tariffRule.create({
        data: ({
          city: b.city, active: b.active !== false,
          baseFareUsd: b.baseFareUsd as any, perKmUsd: b.perKmUsd as any, perMinUsd: b.perMinUsd as any, minFareUsd: (b.minFareUsd ?? 0) as any,
          nightMultiplier: (b.nightMultiplier ?? 1.0) as any, weekendMultiplier: (b.weekendMultiplier ?? 1.0) as any, surgeMultiplier: (b.surgeMultiplier ?? 1.0) as any,
          nightStartHour: b.nightStartHour ?? null, nightEndHour: b.nightEndHour ?? null,
          cancellationGraceSec: b.cancellationGraceSec ?? null,
          cancellationFeeAcceptedUsd: (b.cancellationFeeAcceptedUsd ?? null) as any,
          cancellationFeeArrivedUsd: (b.cancellationFeeArrivedUsd ?? null) as any,
          notes: b.notes ?? null,
        } as any)
      })
      return reply.send(rule)
    }
  )

  // PATCH /admin/tariffs/:id - update fields
  app.patch(
    '/admin/tariffs/:id',
    { schema: { operationId: 'adminTariffsUpdateById', tags: ['admin'], summary: 'Actualizar TariffRule', description: 'Actualiza campos de una regla por id.', params: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } }, body: rulePatch, response: { 200: ruleSchema, 404: { type: 'object', properties: { error: { type: 'string' } } }, 401: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Unauthorized' } }, 403: { type: 'object', properties: { error: { type: 'string' } }, example: { error: 'Forbidden' } } } }, preHandler: app.auth.requireRole('ADMIN') },
    async (req, reply) => {
      const id = (req.params as any).id as string
      const b = (req.body || {}) as any
      const found: any = await prisma.tariffRule.findUnique({ where: { id } })
      if (!found) return reply.code(404).send({ error: 'TariffRule no encontrada' })
      const rule = await prisma.tariffRule.update({ where: { id }, data: ({
        city: b.city ?? found.city,
        active: typeof b.active === 'boolean' ? b.active : found.active,
        baseFareUsd: (b.baseFareUsd ?? found.baseFareUsd) as any,
        perKmUsd: (b.perKmUsd ?? found.perKmUsd) as any,
        perMinUsd: (b.perMinUsd ?? found.perMinUsd) as any,
        minFareUsd: (b.minFareUsd ?? found.minFareUsd) as any,
        nightMultiplier: (b.nightMultiplier ?? found.nightMultiplier) as any,
        weekendMultiplier: (b.weekendMultiplier ?? found.weekendMultiplier) as any,
        surgeMultiplier: (b.surgeMultiplier ?? found.surgeMultiplier) as any,
        nightStartHour: b.nightStartHour ?? found.nightStartHour,
        nightEndHour: b.nightEndHour ?? found.nightEndHour,
        cancellationGraceSec: b.cancellationGraceSec ?? found.cancellationGraceSec,
        cancellationFeeAcceptedUsd: (b.cancellationFeeAcceptedUsd ?? found.cancellationFeeAcceptedUsd) as any,
        cancellationFeeArrivedUsd: (b.cancellationFeeArrivedUsd ?? found.cancellationFeeArrivedUsd) as any,
        notes: b.notes ?? found.notes,
      } as any) })
      return reply.send(rule)
    }
  )
}

