import 'dotenv/config'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080'

async function login(email: string, password: string): Promise<string> {
  const r = await fetch(`${BASE}/auth/login`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!r.ok) throw new Error(`login ${r.status} ${await r.text()}`)
  const j: any = await r.json()
  return j.token as string
}

async function requestTrip(token: string) {
  const body = {
    city: 'Guayaquil',
    pickupLat: -2.17, pickupLng: -79.92,
    dropoffLat: -2.19, dropoffLng: -79.89,
    distanceKm: 5.4, durationMin: 14,
  }
  const r = await fetch(`${BASE}/trips/request`, {
    method: 'POST', headers: { 'content-type': 'application/json', 'authorization': `Bearer ${token}` },
    body: JSON.stringify(body)
  })
  if (!r.ok) throw new Error(`requestTrip ${r.status} ${await r.text()}`)
  const j: any = await r.json()
  return j.trip?.id as string
}

async function riderMyTrips(token: string) {
  const r = await fetch(`${BASE}/rider/my-trips`, {
    headers: { 'authorization': `Bearer ${token}` }
  })
  if (!r.ok) throw new Error(`my-trips ${r.status} ${await r.text()}`)
  return r.json()
}

async function main() {
  console.log('Smoke Rider My Trips @', BASE)
  const token = await login('rider@taxi.local', '123456')
  console.log('Logged in rider')
  const tripId = await requestTrip(token)
  console.log('Requested trip:', tripId)
  const my = await riderMyTrips(token)
  console.log('My trips count:', (my.items || []).length)
  if ((my.items || []).length) {
    console.log('First:', my.items[0])
  }
}

main().catch((e) => { console.error('smoke-rider-my-trips failed:', e); process.exit(1) })

