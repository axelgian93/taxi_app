// scripts/smoke-e2e.ts
import 'dotenv/config'

const BASE = `http://localhost:${process.env.PORT || 8080}`

type LoginResponse = {
  token: string
  user: { id: string; email: string; role: 'ADMIN' | 'DRIVER' | 'RIDER' }
}

type TripResponse = {
  ok: boolean
  trip: { id: string; status: string }
  pricing?: unknown
}

async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) {
    throw new Error(`Login failed for ${email}: ${res.status} ${await res.text()}`)
  }
  return (await res.json()) as LoginResponse
}

async function post<T = any>(url: string, token: string, body?: unknown): Promise<T> {
  const hasBody = body !== undefined
  const res = await fetch(`${BASE}${url}`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      ...(hasBody ? { 'content-type': 'application/json' } : {}),
    },
    body: hasBody ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    throw new Error(`POST ${url} -> ${res.status} ${await res.text()}`)
  }
  return (await res.json()) as T
}

async function main() {
  console.log('🔐 Logins...')
  const rider = await login('rider@taxi.local', '123456')
  const driver = await login('driver@taxi.local', '123456')

  console.log('📍 Driver reporta ubicación y queda IDLE...')
  await post('/drivers/location', driver.token, { lat: -2.170, lng: -79.922 })
  await post('/drivers/status', driver.token, { status: 'IDLE' })

  console.log('🚕 Rider solicita viaje...')
  const reqBody = {
    city: 'Guayaquil',
    pickupLat: -2.170,
    pickupLng: -79.922,
    pickupAddress: 'Centro',
    dropoffLat: -2.190,
    dropoffLng: -79.890,
    dropoffAddress: 'Norte',
    distanceKm: 6.5,
    durationMin: 18,
  }
  const requested = await post<TripResponse>('/trips/request', rider.token, reqBody)
  console.log('✅ Trip ASSIGNED:', requested.trip.id, requested.trip.status)

  const tripId = requested.trip.id

  console.log('👍 DRIVER acepta...')
  await post(`/trips/${tripId}/accept`, driver.token) // sin body

  console.log('🛬 DRIVER llegó...')
  await post(`/trips/${tripId}/arrived`, driver.token) // sin body

  console.log('▶️ DRIVER inicia viaje...')
  await post(`/trips/${tripId}/start`, driver.token) // sin body

  console.log('🏁 DRIVER completa...')
  const completed = await post<TripResponse>(`/trips/${tripId}/complete`, driver.token) // sin body

  console.log('🎉 Trip finalizado:', completed.trip.id, completed.trip.status)
  console.log('🏁 E2E OK ✅')
}

main().catch((e) => {
  console.error('❌ E2E failed:', e)
  process.exit(1)
})
