// scripts/smoke-security-hpp.ts
import fetch from 'node-fetch'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080'

async function loginAdmin() {
  const res = await fetch(BASE + '/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: 'admin@taxi.local', password: '123456' }) })
  const j = await res.json().catch(() => ({} as any)) as any
  return { status: res.status, token: j.token as string }
}

async function main() {
  console.log('Security HPP @', BASE)
  const admin = await loginAdmin()
  if (!admin.token) { console.log('admin login failed:', admin.status); return }
  const hdr = { authorization: 'Bearer ' + admin.token }
  // Repeated limit param beyond default HPP_MAX_REPEATED
  let url = '/admin/trips/detailed?limit=5&limit=10&limit=15&limit=20&limit=25&limit=30'
  let r = await fetch(BASE + url, { headers: hdr })
  const j = await r.json().catch(() => ({} as any)) as any
  console.log('admin/trips/detailed repeated limit ->', r.status, 'items:', Array.isArray(j.items) ? j.items.length : 'n/a')
  // Repeated groupBy for payments report
  url = '/admin/payments/report?groupBy=day&groupBy=city&groupBy=status&groupBy=method&groupBy=city_day'
  r = await fetch(BASE + url, { headers: hdr })
  console.log('admin/payments/report repeated groupBy ->', r.status)
}

main().catch(e => { console.error(e); process.exit(1) })

