/*
  Smoke: PostGIS vs Haversine vs Idle matching path
  - Logs in as ADMIN
  - Fires N test requests to /admin/diagnostics/matching/test
  - Prints distribution of modes used and current metrics snapshot
*/
import 'dotenv/config'

type LoginResp = { token: string }

const BASE = process.env.BASE_URL || `http://localhost:${process.env.PORT || 8080}`
const RUNS = Number(process.env.MATCH_RUNS || 5)
const PICKUP_LAT = Number(process.env.MATCH_LAT || -2.17)
const PICKUP_LNG = Number(process.env.MATCH_LNG || -79.922)
const RADIUS_M = Number(process.env.MATCH_RADIUS_M || 5000)
const MAX_AGE_MIN = Number(process.env.MATCH_MAX_AGE_MIN || 60)
const METRICS_TOKEN = process.env.METRICS_TOKEN || ''

async function jsonFetch<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init)
  const text = await res.text()
  if (!res.ok) throw new Error(`${res.status} ${text}`)
  try { return JSON.parse(text) as T } catch { return text as unknown as T }
}

async function main() {
  const admin = await jsonFetch<LoginResp>(`${BASE}/auth/login`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'admin@taxi.local', password: '123456' })
  })

  const modes: Record<string, number> = { POSTGIS: 0, HAVERSINE: 0, IDLE: 0 }
  for (let i = 0; i < RUNS; i++) {
    const body = { pickupLat: PICKUP_LAT, pickupLng: PICKUP_LNG, radiusM: RADIUS_M, maxAgeMin: MAX_AGE_MIN }
    const r = await jsonFetch<any>(`${BASE}/admin/diagnostics/matching/test`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${admin.token}` },
      body: JSON.stringify(body)
    })
    modes[r.modeUsed] = (modes[r.modeUsed] || 0) + 1
    console.log(`#${i + 1}: mode=${r.modeUsed} postgis=${r.postgisAvailable} driverId=${r.driverId ?? '-'} meters=${r.meters ?? '-'} checked=${r.candidatesChecked ?? '-'}`)
  }
  console.log('Distribution:', modes)

  // Metrics snapshot
  const metrics = await fetch(`${BASE}/metrics`, {
    headers: METRICS_TOKEN
      ? { 'x-metrics-token': METRICS_TOKEN }
      : { authorization: `Bearer ${admin.token}` }
  }).then(r => r.text())
  const lines = metrics.split('\n').filter(l => l.includes('app_matching_') || l.includes('app_drivers_available_current'))
  console.log('Metrics snapshot:')
  for (const l of lines) console.log(l)
}

main().catch(e => {
  console.error('smoke-postgis-match failed:', e)
  process.exit(1)
})

