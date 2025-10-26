// scripts/smoke-trip-sse.ts
import 'dotenv/config'
import http from 'http'

const BASE = `http://localhost:${process.env.PORT || 8080}`

type LoginResponse = {
  token: string
  user: { id: string; email: string; role: 'ADMIN' | 'DRIVER' | 'RIDER' }
}

async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error(`Login failed ${res.status} ${await res.text()}`)
  return (await res.json()) as LoginResponse
}

async function post<T = any>(url: string, token: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${url}`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`POST ${url} -> ${res.status} ${await res.text()}`)
  return (await res.json()) as T
}

async function main() {
  const riderEmail = process.env.RIDER_EMAIL || 'rider@taxi.local'
  const driverEmail = process.env.DRIVER_EMAIL || 'driver@taxi.local'
  const password = process.env.SMOKE_PASSWORD || '123456'
  let tripId = process.env.TRIP_ID

  console.log('Login rider/driver...')
  const rider = await login(riderEmail, password)
  const driver = await login(driverEmail, password)

  if (!tripId) {
    console.log('Preparing driver location/status...')
    await post('/drivers/location', driver.token, { lat: -2.170, lng: -79.922 })
    await post('/drivers/status', driver.token, { status: 'IDLE' })

    console.log('Requesting a new trip...')
    const reqBody = { pickupLat: -2.170, pickupLng: -79.922, dropoffLat: -2.190, dropoffLng: -79.890, city: 'Guayaquil' }
    const created = await post<{ ok: boolean; trip: { id: string } }>(`/trips/request`, rider.token, reqBody)
    tripId = created.trip.id
    console.log('Trip created:', tripId)
  }

  console.log('Connecting SSE for trip', tripId)
  const url = new URL(`${BASE}/trips/${tripId}/sse`)
  const req = http.request(
    {
      method: 'GET',
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      headers: { Accept: 'text/event-stream', Authorization: `Bearer ${rider.token}` },
    },
    (res) => {
      res.setEncoding('utf8')
      let buffer = ''
      res.on('data', (chunk) => {
        buffer += chunk
        const parts = buffer.split('\n\n')
        buffer = parts.pop() || ''
        for (const part of parts) {
          const line = part.split('\n').find((l) => l.startsWith('data: '))
          if (line) {
            const json = line.slice(6)
            console.log('SSE:', json)
          }
        }
      })
    }
  )
  req.on('error', (e) => console.error('SSE error', e))
  req.end()

  // Keep open for 30s
  await new Promise((r) => setTimeout(r, Number(process.env.SSE_DURATION_MS || 30000)))
  req.destroy()
  console.log('SSE smoke finished')
}

main().catch((e) => {
  console.error('Smoke trip sse failed:', e)
  process.exit(1)
})

