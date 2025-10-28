// scripts/smoke-refund-cash.ts
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const BASE = `http://localhost:${process.env.PORT || 8080}`

async function login(email: string, password: string) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error(`login failed: ${res.status} ${await res.text()}`)
  return res.json() as Promise<{ token: string }>
}

async function post(url: string, token: string, body?: unknown) {
  const res = await fetch(`${BASE}${url}`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, ...(body ? { 'content-type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`POST ${url} -> ${res.status} ${text}`)
  return text ? JSON.parse(text) : {}
}

async function get(url: string, token: string) {
  const res = await fetch(`${BASE}${url}`, {
    headers: token ? { authorization: `Bearer ${token}` } : undefined,
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status} ${text}`)
  try { return JSON.parse(text) } catch { return text }
}

async function main() {
  // Logins
  const admin = await login('admin@taxi.local', '123456')
  const rider = await login('rider@taxi.local', '123456')

  // Prepare a Trip and a CASH PAID payment via Prisma
  const riderUser = await prisma.user.findUnique({ where: { email: 'rider@taxi.local' } })
  if (!riderUser) throw new Error('seed rider missing')

  const trip = await prisma.trip.create({
    data: {
      riderId: riderUser.id,
      status: 'COMPLETED',
      requestedAt: new Date(),
      completedAt: new Date(),
      pickupLat: -2.170 as any,
      pickupLng: -79.922 as any,
      dropoffLat: -2.190 as any,
      dropoffLng: -79.890 as any,
      distanceKm: 3.2 as any,
      durationMin: 10,
      costUsd: 3.75 as any,
      pricingSnapshot: { city: 'Guayaquil' } as any,
    }
  })

  await prisma.payment.create({
    data: {
      tripId: trip.id,
      amountUsd: 3.75 as any,
      status: 'PAID',
      method: 'CASH',
      provider: null,
      externalId: null,
    }
  })

  console.log('Trip created with CASH payment:', trip.id)

  // Verify payment flags
  const payment = await get(`/payments/${trip.id}`, rider.token)
  console.log('Payment GET:', payment)

  // Refund via ADMIN endpoint
  const refundResp = await post(`/payments/${trip.id}/refund`, admin.token, { reason: 'test_refund' })
  console.log('Refund admin resp:', refundResp)

  // Verify refunds list by trip
  const refundsByTrip = await get(`/payments/${trip.id}/refunds`, rider.token)
  console.log('Refunds by trip:', refundsByTrip)

  // Verify global refunds CSV
  const csv = await get(`/admin/refunds?format=csv&limit=5`, admin.token)
  console.log('Admin refunds CSV (first lines):', String(csv).split('\n').slice(0,2).join('\n'))

  // Receipt endpoint
  const receipt = await get(`/payments/${trip.id}/receipt`, rider.token)
  console.log('Receipt:', receipt)
}

main().catch((e) => {
  console.error('Smoke refund cash failed:', e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})

