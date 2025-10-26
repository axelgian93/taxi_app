// scripts/smoke-cancel-fee.ts
import 'dotenv/config'

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
    method: 'POST', headers: { authorization: `Bearer ${token}`, ...(body ? { 'content-type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`POST ${url} -> ${res.status} ${await res.text()}`)
  return res.json()
}

async function get(url: string, token: string) {
  const res = await fetch(`${BASE}${url}`, {
    headers: { authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status} ${await res.text()}`)
  return res.json()
}

async function main() {
  const rider = await login('rider@taxi.local', '123456')
  const driver = await login('driver@taxi.local', '123456')

  // Prepare driver
  await post('/drivers/location', driver.token, { lat: -2.170, lng: -79.922 })
  await post('/drivers/status', driver.token, { status: 'IDLE' })

  // Request trip in Guayaquil
  const req = await post('/trips/request', rider.token, {
    city: 'Guayaquil',
    pickupLat: -2.170, pickupLng: -79.922,
    dropoffLat: -2.190, dropoffLng: -79.890,
    distanceKm: 3.0, durationMin: 10,
  }) as any
  const tripId = req.trip.id as string
  console.log('Trip:', tripId, req.trip.status)

  // Driver accepts and arrives (fee ARRIVED applies)
  await post(`/trips/${tripId}/accept`, driver.token)
  await post(`/trips/${tripId}/arrived`, driver.token)

  // Rider cancels
  await post(`/trips/${tripId}/cancel`, rider.token, { reason: 'CHANGED_MIND' })

  const receipt = await get(`/payments/${tripId}/receipt`, rider.token)
  console.log('Receipt:', JSON.stringify(receipt))
}

main().catch((e) => {
  console.error('Smoke cancel-fee failed:', e)
  process.exit(1)
})
