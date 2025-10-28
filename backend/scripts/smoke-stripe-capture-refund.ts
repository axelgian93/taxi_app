// scripts/smoke-stripe-capture-refund.ts
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
  const stripeKey = process.env.STRIPE_SECRET_KEY || ''
  if (!stripeKey) {
    console.log('STRIPE_SECRET_KEY no definido; omitiendo smoke Stripe.')
    return
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const Stripe = require('stripe')
  const stripe = new Stripe(stripeKey, { apiVersion: '2024-06-20' })

  const admin = await login('admin@taxi.local', '123456')
  const riderUser = await prisma.user.findUnique({ where: { email: 'rider@taxi.local' } })
  if (!riderUser) throw new Error('seed rider missing')

  // Create a Trip
  const trip = await prisma.trip.create({
    data: {
      riderId: riderUser.id,
      status: 'ACCEPTED',
      requestedAt: new Date(),
      acceptedAt: new Date(),
      pickupLat: -2.170 as any,
      pickupLng: -79.922 as any,
      dropoffLat: -2.190 as any,
      dropoffLng: -79.890 as any,
      distanceKm: 2.1 as any,
      durationMin: 7,
      costUsd: 5.00 as any,
      pricingSnapshot: { city: 'Guayaquil' } as any,
    }
  })

  // Create a manual-capture PaymentIntent and confirm it using a test payment method
  const amountCents = 500
  const intent = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: 'usd',
    capture_method: 'manual',
    payment_method: 'pm_card_visa',
    confirm: true,
    metadata: { tripId: trip.id },
  })

  // Insert Payment as AUTHORIZED linked to the Trip
  await prisma.payment.create({
    data: {
      tripId: trip.id,
      amountUsd: (amountCents / 100) as any,
      status: 'AUTHORIZED',
      method: 'CARD',
      provider: 'Stripe',
      externalId: intent.id,
    }
  })

  console.log('Created AUTHORIZED Stripe intent:', intent.id, 'for trip:', trip.id)

  // Capture via ADMIN endpoint
  const cap = await post(`/payments/${trip.id}/capture`, admin.token)
  console.log('Capture resp:', cap)

  // After capture, attempt refund via ADMIN endpoint
  const refund = await post(`/payments/${trip.id}/refund`, admin.token, { reason: 'smoke_refund' })
  console.log('Refund resp:', refund)

  // Verify refunds by trip
  const refundsByTrip = await get(`/payments/${trip.id}/refunds`, admin.token)
  console.log('Refunds by trip:', refundsByTrip)
}

main().catch((e) => {
  console.error('Smoke stripe capture+refund failed:', e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})

