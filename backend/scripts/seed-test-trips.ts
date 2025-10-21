// scripts/seed-test-trips.ts
import 'dotenv/config'

// Usa fetch nativo de Node 22
const BASE = `http://localhost:${process.env.PORT || 8080}`

type LoginResponse = {
  token: string
  user: { id: string; email: string; role: 'ADMIN' | 'DRIVER' | 'RIDER' }
}
type TripResp = { ok: boolean; trip: { id: string; status: string } }

const center = { lat: -2.170, lng: -79.922 } // GYE centro aproximado

function deg2rad(d: number) { return d * Math.PI / 180 }
function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371
  const dLat = deg2rad(b.lat - a.lat)
  const dLng = deg2rad(b.lng - a.lng)
  const la1 = deg2rad(a.lat), la2 = deg2rad(b.lat)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}
function randBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}
function jitterCoord(base: { lat: number; lng: number }, maxKm: number) {
  // ~1 km ~ 0.009 deg lat; lon ajusta por cos(lat)
  const latOff = randBetween(-maxKm, maxKm) * 0.009
  const lonOff = randBetween(-maxKm, maxKm) * 0.009 / Math.cos(deg2rad(base.lat))
  return { lat: Number((base.lat + latOff).toFixed(6)), lng: Number((base.lng + lonOff).toFixed(6)) }
}

async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error(`Login ${email} -> ${res.status} ${await res.text()}`)
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
  if (!res.ok) throw new Error(`POST ${url} -> ${res.status} ${await res.text()}`)
  return (await res.json()) as T
}

async function seedTrips(total: number) {
  console.log(`🚀 Sembrando ${total} viajes demo...`)
  const rider = await login('rider@taxi.local', '123456')
  const driver = await login('driver@taxi.local', '123456')

  for (let i = 1; i <= total; i++) {
    // Ubicación del driver (cerca del centro)
    const driverPos = jitterCoord(center, 1.0)
    await post('/drivers/location', driver.token, driverPos)
    await post('/drivers/status', driver.token, { status: 'IDLE' })

    // Pickup (cerca del driver) y dropoff (algo más lejos)
    const pickup = jitterCoord(driverPos, 0.6)
    const dropoff = jitterCoord(center, randBetween(2.5, 6.0)) // 2.5 a 6 km del centro aprox

    const distanceKm = Number(haversineKm(pickup, dropoff).toFixed(2))
    // Duración estimada (min): 3.2–4.5 min/km + ruido
    const durationMin = Math.max(7, Math.round(distanceKm * randBetween(3.2, 4.5) + randBetween(-1, 3)))

    // Request trip
    const body = {
      city: 'Guayaquil',
      pickupLat: pickup.lat,
      pickupLng: pickup.lng,
      pickupAddress: `Pickup ${i}`,
      dropoffLat: dropoff.lat,
      dropoffLng: dropoff.lng,
      dropoffAddress: `Dropoff ${i}`,
      distanceKm,
      durationMin,
    }

    const requested = await post<TripResp>('/trips/request', rider.token, body)
    const tripId = requested.trip.id
    console.log(`🟡 [${i}/${total}] ASSIGNED → ${tripId} | ${distanceKm} km, ${durationMin} min`)

    // Driver flow
    await post(`/trips/${tripId}/accept`, driver.token)
    await post(`/trips/${tripId}/arrived`, driver.token)
    await post(`/trips/${tripId}/start`, driver.token)
    await post(`/trips/${tripId}/complete`, driver.token)

    console.log(`✅ [${i}/${total}] COMPLETED → ${tripId}`)
  }

  console.log('🎉 Seed demo trips: OK')
}

const countArg = Number(process.argv[2] || process.env.SEED_TRIPS || 10)
seedTrips(Number.isFinite(countArg) && countArg > 0 ? countArg : 10).catch((e) => {
  console.error('❌ Seed failed:', e)
  process.exit(1)
})
