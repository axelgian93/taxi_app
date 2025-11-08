// scripts/smoke-security-sse.ts
import fetch, { RequestInit } from 'node-fetch'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080'
const OPEN = Number(process.env.SSE_OPEN_COUNT || 4) // open this many to try to exceed limits

async function login(email: string, password: string) {
  const res = await fetch(BASE + '/auth/login', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const j = await res.json().catch(() => ({} as any)) as any
  return { status: res.status, token: j.token as string }
}

async function requestTrip(token: string) {
  // Minimal valid body
  const body = {
    city: 'TEST',
    pickupLat: -12.05,
    pickupLng: -77.04,
    dropoffLat: -12.06,
    dropoffLng: -77.05,
    distanceKm: 3.2,
    durationMin: 10,
  }
  const res = await fetch(BASE + '/trips/request', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: 'Bearer ' + token },
    body: JSON.stringify(body)
  })
  const j = await res.json().catch(() => ({} as any)) as any
  if (!res.ok || !j?.trip?.id) throw new Error('requestTrip failed ' + res.status)
  return j.trip.id as string
}

async function openSse(url: string, headers: Record<string,string>) {
  const ctrl = new AbortController()
  const init: RequestInit = { method: 'GET', headers, signal: ctrl.signal as any }
  const res = await fetch(url, init)
  return { res, ctrl }
}

async function main() {
  console.log('Security SSE @', BASE)
  const rider = await login('rider@taxi.local', '123456')
  if (!rider.token) throw new Error('rider login failed ' + rider.status)
  const tripId = await requestTrip(rider.token)
  console.log('Trip id:', tripId)
  const url = `${BASE}/trips/${tripId}/sse`
  const headers = { authorization: 'Bearer ' + rider.token }

  const conns: Array<{res: any, ctrl: AbortController}> = []
  for (let i=0;i<OPEN;i++) {
    try {
      const { res, ctrl } = await openSse(url, headers)
      conns.push({ res, ctrl })
      console.log(`SSE ${i+1} -> status`, res.status)
      // Expect first 1-2 connections to be 200, and later ones to be 429 if limits apply
      // Do not consume the body; keep open briefly
    } catch (e:any) {
      console.log(`SSE ${i+1} error:`, e?.message || String(e))
    }
  }
  // Close all after short delay
  await new Promise(r => setTimeout(r, 1500))
  for (const c of conns) { try { c.ctrl.abort() } catch {} }
  console.log('Closed', conns.length, 'connections')
}

main().catch(e => { console.error(e); process.exit(1) })

