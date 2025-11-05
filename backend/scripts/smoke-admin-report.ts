// backend/scripts/smoke-admin-report.ts
// Crea datos de ejemplo (rider/trips/payments) y consulta el reporte admin
import 'dotenv/config'
import fetch from 'node-fetch'
import bcrypt from 'bcrypt'

import prisma from '../src/lib/prisma'

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8080'

async function upsertUser(email: string, role: 'ADMIN'|'RIDER') {
  let u = await prisma.user.findUnique({ where: { email } })
  const hash = await bcrypt.hash('123456', 10)
  if (!u) {
    u = await prisma.user.create({ data: { email, passwordHash: hash, firstName: 'Smoke', lastName: role, role } })
  } else if (u.passwordHash !== hash) {
    await prisma.user.update({ where: { id: u.id }, data: { passwordHash: hash } })
    u = (await prisma.user.findUnique({ where: { email } }))!
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

async function seedPayments(riderId: string) {
  const now = new Date()
  // helper to create trip+payment
  async function make(city: string, amount: number, status: 'PAID'|'AUTHORIZED'|'PENDING', shiftMinutes: number) {
    const t = await prisma.trip.create({
      data: {
        riderId,
        status: 'COMPLETED' as any,
        requestedAt: new Date(now.getTime() - shiftMinutes * 60000),
        completedAt: new Date(now.getTime() - (shiftMinutes - 1) * 60000),
        pickupLat: 0 as any, pickupLng: 0 as any, dropoffLat: 0 as any, dropoffLng: 0 as any,
        distanceKm: 1 as any, durationMin: 2, costUsd: amount as any, city,
      }
    })
    await prisma.payment.create({ data: { tripId: t.id, amountUsd: amount as any, status: status as any, method: 'CASH', provider: null, externalId: null } })
  }
  await make('GYE', 5.5, 'PAID', 120)
  await make('GYE', 7.0, 'PAID', 60)
  await make('UIO', 3.2, 'PAID', 30)
}

async function main() {
  console.log('Smoke Admin Report @', BASE_URL)
  const admin = await upsertUser('smoke.admin@taxi.local', 'ADMIN')
  const rider = await upsertUser('smoke.report.rider@taxi.local', 'RIDER')
  await seedPayments(rider.id)
  const token = await login(admin.email)

  async function call(qs: string) {
    const r = await fetch(BASE_URL + '/admin/payments/report?' + qs, { headers: { authorization: 'Bearer ' + token } })
    console.log('GET /admin/payments/report?' + qs, '->', r.status)
    const txt = await r.text()
    console.log(txt.slice(0, 400))
  }

  await call('groupBy=city_day&format=json')
  await call('groupBy=city_day&format=csv')
}

main().catch(e => { console.error(e); process.exit(1) })


