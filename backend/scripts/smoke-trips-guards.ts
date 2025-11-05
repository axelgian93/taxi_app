// backend/scripts/smoke-trips-guards.ts
// Smoke script para validar guardas 409 en flujo Trips sin Stripe
// Crea usuarios (rider y 2 drivers), crea un trip REQUESTED sin driver,
// prueba aceptaciones concurrentes (uno gana; otro 409), arrived/start/complete secuenciales,
// y cancel intentos inválidos.

import 'dotenv/config'
import fetch from 'node-fetch'
import bcrypt from 'bcrypt'

import prisma from '../src/lib/prisma'

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8080'

async function ensureUserWithPassword(email: string, role: 'RIDER'|'DRIVER') {
  const hash = await bcrypt.hash('123456', 10)
  let u = await prisma.user.findUnique({ where: { email } })
  if (!u) {
    u = await prisma.user.create({ data: { email, passwordHash: hash, firstName: 'Smoke', lastName: role, role } })
  } else {
    if (u.passwordHash !== hash) {
      await prisma.user.update({ where: { id: u.id }, data: { passwordHash: hash } })
    }
  }
  if (role === 'DRIVER') {
    await prisma.driverProfile.upsert({
      where: { userId: u.id },
      update: { status: 'IDLE' as any, currentLat: 0 as any, currentLng: 0 as any, locationUpdatedAt: new Date() },
      create: { userId: u.id, status: 'IDLE' as any, rating: 5 as any, totalTrips: 0, licenseNumber: `AUTO-${u.id}` },
    })
  } else {
    await prisma.riderProfile.upsert({ where: { userId: u.id }, update: {}, create: { userId: u.id } })
  }
  return await prisma.user.findUnique({ where: { email } })
}

async function login(email: string, password = '123456') {
  const res = await fetch(BASE_URL + '/auth/login', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error('login failed: ' + (await res.text()))
  const data = await res.json() as any
  return data.token as string
}

async function main() {
  console.log('Smoke Trips Guards @', BASE_URL)

  // 1) Ensure users
  // Register users via API to ensure password correctness (use unique suffix)
  const suffix = String(Date.now()).slice(-6)
  const riderEmail = `smoke.rider+${suffix}@taxi.local`
  const d1Email = `smoke.driver1+${suffix}@taxi.local`
  const d2Email = `smoke.driver2+${suffix}@taxi.local`
  const rider = await ensureUserWithPassword(riderEmail, 'RIDER')
  const d1 = await ensureUserWithPassword(d1Email, 'DRIVER')
  const d2 = await ensureUserWithPassword(d2Email, 'DRIVER')
  if (!rider || !d1 || !d2) throw new Error('users not found after register')
  // ensure driver profiles are IDLE and fresh locations
  await prisma.driverProfile.update({ where: { userId: d1.id }, data: { status: 'IDLE' as any, currentLat: 0 as any, currentLng: 0 as any, locationUpdatedAt: new Date() } })
  await prisma.driverProfile.update({ where: { userId: d2.id }, data: { status: 'IDLE' as any, currentLat: 0 as any, currentLng: 0 as any, locationUpdatedAt: new Date() } })

  // 2) Create trip directly (REQUESTED, no driver)
  const trip = await prisma.trip.create({
    data: {
      riderId: rider.id,
      status: 'REQUESTED' as any,
      city: 'smoke-city',
      pickupLat: 0 as any, pickupLng: 0 as any,
      dropoffLat: 0 as any, dropoffLng: 0 as any,
      distanceKm: 1 as any, durationMin: 2,
      costUsd: 3.5 as any,
      requestedAt: new Date(),
      pricingSnapshot: { city: 'smoke-city' } as any,
    },
  })
  console.log('Trip created:', trip.id)

  // 3) Login tokens
  const tRider = await login(riderEmail)
  const tD1 = await login(d1Email)
  const tD2 = await login(d2Email)

  // 4) Concurrent accept
  const reqAccept = (tok: string) => fetch(BASE_URL + `/trips/${trip.id}/accept`, { method: 'POST', headers: { authorization: `Bearer ${tok}` } })
  const [a1, a2] = await Promise.all([reqAccept(tD1), reqAccept(tD2)])
  console.log('accept status:', a1.status, a2.status)

  // Detect driver winner by querying active trips for each
  async function myActive(token: string) {
    const r = await fetch(BASE_URL + '/drivers/my-trips/active', { headers: { authorization: `Bearer ${token}` } })
    if (!r.ok) return { items: [] as any[] }
    return r.json() as Promise<{ items: Array<{ id: string }> }>
  }
  const [m1, m2] = await Promise.all([myActive(tD1), myActive(tD2)])
  const d1Has = (m1.items || []).some(x => x.id === trip.id)
  const d2Has = (m2.items || []).some(x => x.id === trip.id)
  const winnerTok = d1Has ? tD1 : d2Has ? tD2 : tD1
  const loserTok = d1Has ? tD2 : d2Has ? tD1 : tD2

  // 5) Arrived (should be 200 once with winner)
  const ar = await fetch(BASE_URL + `/trips/${trip.id}/arrived`, { method: 'POST', headers: { authorization: `Bearer ${winnerTok}` } })
  console.log('arrived status:', ar.status)

  // 6) Start (CASH)
  const st = await fetch(BASE_URL + `/trips/${trip.id}/start`, { method: 'POST', headers: { authorization: `Bearer ${winnerTok}`, 'content-type': 'application/json' }, body: JSON.stringify({ method: 'CASH' }) })
  console.log('start status:', st.status)

  // 7) Complete
  const co = await fetch(BASE_URL + `/trips/${trip.id}/complete`, { method: 'POST', headers: { authorization: `Bearer ${winnerTok}` } })
  console.log('complete status:', co.status)

  // 8) Cancel after complete should 409
  const ca = await fetch(BASE_URL + `/trips/${trip.id}/cancel`, { method: 'POST', headers: { authorization: `Bearer ${tRider}`, 'content-type': 'application/json' }, body: JSON.stringify({ reason: 'TEST' }) })
  console.log('cancel after complete status:', ca.status)

  // Output brief result JSON
  const result = { accept: [a1.status, a2.status], arrived: ar.status, start: st.status, complete: co.status, cancelAfterComplete: ca.status, winnerIsD1: d1Has }
  console.log(JSON.stringify(result, null, 2))
}

main().catch((e) => { console.error(e); process.exit(1) })
