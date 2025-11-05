// backend/scripts/smoke-admin-top.ts
// Crea datos de ejemplo para drivers/riders y consulta top-drivers y top-riders
import 'dotenv/config'
import fetch from 'node-fetch'
import bcrypt from 'bcrypt'

import prisma from '../src/lib/prisma'

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8080'

async function upsertUser(email: string, role: 'ADMIN'|'DRIVER'|'RIDER') {
  let u = await prisma.user.findUnique({ where: { email } })
  const hash = await bcrypt.hash('123456', 10)
  if (!u) {
    u = await prisma.user.create({ data: { email, passwordHash: hash, firstName: 'Smoke', lastName: role, role } })
  } else if (u.passwordHash !== hash) {
    await prisma.user.update({ where: { id: u.id }, data: { passwordHash: hash } })
    u = (await prisma.user.findUnique({ where: { email } }))!
  }
  if (role === 'DRIVER') {
    await prisma.driverProfile.upsert({ where: { userId: u.id }, update: { status: 'IDLE' as any }, create: { userId: u.id, status: 'IDLE' as any, rating: 5 as any, totalTrips: 0, licenseNumber: `AUTO-${u.id}` } })
  }
  if (role === 'RIDER') {
    await prisma.riderProfile.upsert({ where: { userId: u.id }, update: {}, create: { userId: u.id } })
  }
  return u
}

async function login(email: string, password = '123456') {
  const res = await fetch(BASE_URL + '/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) })
  if (!res.ok) throw new Error('login failed: ' + (await res.text()))
  const data = await res.json() as any
  return data.token as string
}

async function seedTripWithPayment(riderId: string, driverId: string, city: string, amount: number) {
  const t = await prisma.trip.create({ data: { riderId, driverId, status: 'COMPLETED' as any, requestedAt: new Date(), completedAt: new Date(), pickupLat: 0 as any, pickupLng: 0 as any, dropoffLat: 0 as any, dropoffLng: 0 as any, distanceKm: 1 as any, durationMin: 2, costUsd: amount as any, city } })
  await prisma.payment.create({ data: { tripId: t.id, amountUsd: amount as any, status: 'PAID' as any, method: 'CASH', provider: null, externalId: null } })
}

async function main() {
  console.log('Smoke Admin Top @', BASE_URL)
  const admin = await upsertUser('smoke.admin@taxi.local', 'ADMIN')
  const d1 = await upsertUser('smoke.top.d1@taxi.local', 'DRIVER')
  const d2 = await upsertUser('smoke.top.d2@taxi.local', 'DRIVER')
  const r1 = await upsertUser('smoke.top.r1@taxi.local', 'RIDER')
  const r2 = await upsertUser('smoke.top.r2@taxi.local', 'RIDER')

  // Seed a few payments
  await seedTripWithPayment(r1.id, d1.id, 'GYE', 10)
  await seedTripWithPayment(r2.id, d1.id, 'GYE', 12.5)
  await seedTripWithPayment(r1.id, d2.id, 'UIO', 8)
  await seedTripWithPayment(r2.id, d2.id, 'UIO', 4)

  const token = await login(admin.email)

  async function call(path: string) {
    const r = await fetch(BASE_URL + path, { headers: { authorization: 'Bearer ' + token } })
    console.log(path, '->', r.status)
    const txt = await r.text()
    console.log(txt.slice(0, 400))
  }

  await call('/admin/payments/top-drivers?format=json')
  await call('/admin/payments/top-drivers?format=csv')
  await call('/admin/payments/top-riders?format=json')
  await call('/admin/payments/top-riders?format=csv')
  await call('/admin/payments/summary-status?format=json')
  await call('/admin/payments/summary-status?format=csv')
}

main().catch(e => { console.error(e); process.exit(1) })
