// src/modules/admin/admin.demo.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import { computeFare } from '../../services/pricing.service'

export default async function adminDemoRoutes(app: FastifyInstance) {
  const defaultCity = 'Guayaquil'
  const demoFlag = 'DEMO'

  app.post('/admin/demo/seed', { schema: { operationId: 'adminDemoSeed', tags: ['admin'], summary: 'Crear datos de demo', description: 'Crea usuarios (admin/rider/drivers), reglas de tarifa y algunos viajes de ejemplo para demo.', response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } } } }, preHandler: app.auth.requireRole('ADMIN') }, async (_req, reply) => {
    // Ensure TariffRule
    let tariff = await prisma.tariffRule.findFirst({ where: { city: defaultCity, active: true }, orderBy: { updatedAt: 'desc' } })
    if (!tariff) {
      tariff = await prisma.tariffRule.create({ data: { city: defaultCity, active: true, baseFareUsd: 1.5 as any, perKmUsd: 0.5 as any, perMinUsd: 0.2 as any, minFareUsd: 2 as any, nightMultiplier: 1 as any, weekendMultiplier: 1 as any, surgeMultiplier: 1 as any } as any })
    }

    // Helper create user
    async function upsertUser(email: string, role: 'ADMIN'|'RIDER'|'DRIVER', firstName: string, lastName: string) {
      const pwdHash = require('crypto').createHash('sha256').update('123456').digest('hex')
      let user = await prisma.user.findUnique({ where: { email } })
      if (!user) {
        user = await prisma.user.create({ data: { email, passwordHash: pwdHash, firstName, lastName, role, isActive: true, emailVerifiedAt: new Date() } as any })
      }
      if (role === 'RIDER') {
        await prisma.riderProfile.upsert({ where: { userId: user.id }, update: {}, create: { userId: user.id } })
      }
      if (role === 'DRIVER') {
        await prisma.driverProfile.upsert({ where: { userId: user.id }, update: { licenseNumber: `DEMO-${user.id}` }, create: { userId: user.id, licenseNumber: `DEMO-${user.id}`, status: 'IDLE' as any } })
      }
      return user
    }

    // Create users
    await upsertUser('admin@taxi.local', 'ADMIN', 'Admin', 'Demo')
    const rider = await upsertUser('rider@taxi.local', 'RIDER', 'Rider', 'Demo')
    const d1 = await upsertUser('driver1@taxi.local', 'DRIVER', 'Driver', 'Uno')
    const d2 = await upsertUser('driver2@taxi.local', 'DRIVER', 'Driver', 'Dos')

    // Place drivers around Guayaquil
    const now = new Date()
    const positions = [ { lat: -2.170, lng: -79.922 }, { lat: -2.175, lng: -79.930 } ]
    const drivers = [d1, d2]
    for (let i = 0; i < drivers.length; i++) {
      const dp = await prisma.driverProfile.findUnique({ where: { userId: drivers[i].id } })
      if (dp) {
        await prisma.driverProfile.update({ where: { userId: drivers[i].id }, data: { status: 'IDLE' as any, currentLat: positions[i].lat as any, currentLng: positions[i].lng as any, locationUpdatedAt: now } })
      }
    }

    // Create a couple of historical trips
    const sampleTrips = [
      { pickup: { lat: -2.170, lng: -79.922 }, drop: { lat: -2.185, lng: -79.900 }, distanceKm: 3.2, durationMin: 10 },
      { pickup: { lat: -2.168, lng: -79.935 }, drop: { lat: -2.160, lng: -79.910 }, distanceKm: 2.8, durationMin: 9 }
    ]
    for (const s of sampleTrips) {
      const fare = await computeFare({ city: defaultCity, distanceKm: s.distanceKm, durationMin: s.durationMin })
      const tr = await prisma.trip.create({ data: { riderId: rider.id, driverId: d1.id, status: 'COMPLETED' as any, requestedAt: new Date(Date.now() - 86400000), startedAt: new Date(Date.now() - 86300000), completedAt: new Date(Date.now() - 86200000), pickupLat: s.pickup.lat as any, pickupLng: s.pickup.lng as any, dropoffLat: s.drop.lat as any, dropoffLng: s.drop.lng as any, distanceKm: s.distanceKm as any, durationMin: s.durationMin, costUsd: (fare.totalUsd as any), pricingSnapshot: fare.snapshot as any, city: defaultCity } as any })
      await prisma.payment.create({ data: { tripId: tr.id, amountUsd: (fare.totalUsd as any), status: 'PAID' as any, method: 'CASH', provider: null, externalId: null } as any })
    }

    return reply.send({ ok: true })
  })

  app.post('/admin/demo/reset', { schema: { operationId: 'adminDemoReset', tags: ['admin'], summary: 'Reset demo', description: 'Elimina datos generados por la demo (trips de rider@taxi.local y drivers DEMO-).', response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } } } }, preHandler: app.auth.requireRole('ADMIN') }, async (_req, reply) => {
    const rider = await prisma.user.findUnique({ where: { email: 'rider@taxi.local' } })
    if (rider) {
      const trips = await prisma.trip.findMany({ where: { riderId: rider.id } })
      for (const t of trips) {
        await prisma.payment.deleteMany({ where: { tripId: t.id } })
      }
      await prisma.trip.deleteMany({ where: { riderId: rider.id } })
    }
    // Reset drivers to IDLE and clear history
    const drivers = await prisma.driverProfile.findMany({ where: { licenseNumber: { startsWith: demoFlag } } })
    for (const dp of drivers) {
      await prisma.driverLocationHistory.deleteMany({ where: { driverId: dp.id } })
      await prisma.driverProfile.update({ where: { id: dp.id }, data: { status: 'IDLE' as any } })
    }
    return reply.send({ ok: true })
  })

  app.post('/admin/demo/trips/:id/assign-driver', { schema: { operationId: 'adminDemoAssignDriver', tags: ['admin'], summary: 'Asignar driver (demo)', params: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } }, 404: { type: 'object', properties: { error: { type: 'string' } } } } }, preHandler: app.auth.requireRole('ADMIN') }, async (req: any, reply) => {
    const id = (req.params || {}).id as string
    const trip = await prisma.trip.findUnique({ where: { id } })
    if (!trip) return reply.code(404).send({ error: 'Trip not found' })
    // pick any IDLE driver
    const driver = await prisma.driverProfile.findFirst({ where: { status: 'IDLE' as any }, orderBy: { locationUpdatedAt: 'desc' } })
    if (!driver) return reply.code(404).send({ error: 'No idle drivers' })
    await prisma.trip.update({ where: { id }, data: { driverId: driver.userId, status: 'ASSIGNED' as any, assignedAt: new Date() } })
    return reply.send({ ok: true })
  })

  app.post('/admin/demo/trips/:id/advance', { schema: { operationId: 'adminDemoAdvanceTrip', tags: ['admin'], summary: 'Avanzar estado de trip (demo)', params: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } }, body: { type: 'object', required: ['to'], properties: { to: { type: 'string', enum: ['ACCEPTED','ARRIVED','STARTED','COMPLETED'] } }, additionalProperties: false }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } }, 404: { type: 'object', properties: { error: { type: 'string' } } } } }, preHandler: app.auth.requireRole('ADMIN') }, async (req: any, reply) => {
    const id = (req.params || {}).id as string
    const { to } = (req.body || {}) as { to: 'ACCEPTED'|'ARRIVED'|'STARTED'|'COMPLETED' }
    const trip = await prisma.trip.findUnique({ where: { id } })
    if (!trip) return reply.code(404).send({ error: 'Trip not found' })
    const now = new Date()
    if (to === 'ACCEPTED') await prisma.trip.update({ where: { id }, data: { status: 'ACCEPTED' as any, acceptedAt: now } })
    else if (to === 'ARRIVED') await prisma.trip.update({ where: { id }, data: { status: 'ARRIVED' as any, arrivedAt: now } })
    else if (to === 'STARTED') await prisma.trip.update({ where: { id }, data: { status: 'STARTED' as any, startedAt: now } })
    else if (to === 'COMPLETED') {
      // compute fare if missing
      const dist = Number(trip.distanceKm || 3)
      const dur = Number(trip.durationMin || 10)
      const city = (trip.city || defaultCity)
      const fare = await computeFare({ city, distanceKm: dist, durationMin: dur })
      await prisma.trip.update({ where: { id }, data: { status: 'COMPLETED' as any, completedAt: now, costUsd: (fare.totalUsd as any), pricingSnapshot: fare.snapshot as any } })
      const existing = await prisma.payment.findUnique({ where: { tripId: id } })
      if (!existing) await prisma.payment.create({ data: { tripId: id, amountUsd: (fare.totalUsd as any), status: 'PAID' as any, method: 'CASH', provider: null, externalId: null } as any })
    }
    return reply.send({ ok: true })
  })
}

