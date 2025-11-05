// scripts/smoke-admin-extended.ts
import fetch from 'node-fetch'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080'

async function loginAdmin() {
  const res = await fetch(BASE + '/auth/login', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: 'admin@taxi.local', password: '123456' })
  })
  if (!res.ok) throw new Error('login admin failed ' + res.status)
  const j = await res.json() as any
  return j.token as string
}

async function main() {
  console.log('Smoke Admin Extended @', BASE)
  const token = await loginAdmin()
  // JSON request
  let r = await fetch(BASE + '/admin/payments/extended?limit=3', { headers: { authorization: 'Bearer ' + token } })
  const e1 = r.headers.get('etag') || ''
  console.log('JSON status', r.status, 'etag', e1)
  const j = await r.json().catch(() => ({}))
  console.log('items:', Array.isArray(j.items) ? j.items.length : 'n/a')
  // 304 check
  let r2 = await fetch(BASE + '/admin/payments/extended?limit=3', { headers: { authorization: 'Bearer ' + token, 'if-none-match': e1 } })
  console.log('JSON If-None-Match status', r2.status)
  // CSV request
  let r3 = await fetch(BASE + '/admin/payments/extended?limit=3&format=csv', { headers: { authorization: 'Bearer ' + token } })
  const e2 = r3.headers.get('etag') || ''
  console.log('CSV status', r3.status, 'etag', e2)
  const text = await r3.text()
  console.log('csv length', text.length)
  // CSV 304
  let r4 = await fetch(BASE + '/admin/payments/extended?limit=3&format=csv', { headers: { authorization: 'Bearer ' + token, 'if-none-match': e2 } })
  console.log('CSV If-None-Match status', r4.status)
}

main().catch(e => { console.error(e); process.exit(1) })

