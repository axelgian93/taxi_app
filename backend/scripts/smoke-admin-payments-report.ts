// scripts/smoke-admin-payments-report.ts
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

async function check(path: string) {
  const token = await loginAdmin()
  // JSON
  let r = await fetch(BASE + path, { headers: { authorization: 'Bearer ' + token } })
  const e1 = r.headers.get('etag') || ''
  console.log(path, 'JSON status', r.status, 'etag', e1)
  await r.text()
  let r2 = await fetch(BASE + path, { headers: { authorization: 'Bearer ' + token, 'if-none-match': e1 } })
  console.log(path, 'JSON If-None-Match status', r2.status)
  // CSV
  let r3 = await fetch(BASE + path + (path.includes('?') ? '&' : '?') + 'format=csv', { headers: { authorization: 'Bearer ' + token } })
  const e2 = r3.headers.get('etag') || ''
  console.log(path, 'CSV status', r3.status, 'etag', e2)
  await r3.text()
  let r4 = await fetch(BASE + path + (path.includes('?') ? '&' : '?') + 'format=csv', { headers: { authorization: 'Bearer ' + token, 'if-none-match': e2 } })
  console.log(path, 'CSV If-None-Match status', r4.status)
}

async function main() {
  console.log('Smoke Admin Payments Report @', BASE)
  await check('/admin/payments/report?groupBy=day')
  await check('/admin/payments/top-drivers?limit=5')
  await check('/admin/payments/top-riders?limit=5')
}

main().catch(e => { console.error(e); process.exit(1) })

