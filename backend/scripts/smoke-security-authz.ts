// scripts/smoke-security-authz.ts
import fetch from 'node-fetch'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080'

async function login(email: string, password: string) {
  const res = await fetch(BASE + '/auth/login', {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const j = await res.json().catch(() => ({} as any)) as any
  return { status: res.status, token: j.token as string }
}

async function main() {
  console.log('Security AuthZ @', BASE)
  // 1) No token -> 401
  let r = await fetch(BASE + '/admin/trips/detailed?limit=1')
  console.log('admin/trips/detailed no token:', r.status)

  // 2) Rider token -> 403
  const rider = await login('rider@taxi.local', '123456')
  if (rider.token) {
    r = await fetch(BASE + '/admin/trips/detailed?limit=1', { headers: { authorization: 'Bearer ' + rider.token } })
    console.log('admin/trips/detailed rider token:', r.status)
  } else {
    console.log('rider login failed:', rider.status)
  }

  // 3) Admin token -> 200
  const admin = await login('admin@taxi.local', '123456')
  if (admin.token) {
    r = await fetch(BASE + '/admin/trips/detailed?limit=1', { headers: { authorization: 'Bearer ' + admin.token } })
    console.log('admin/trips/detailed admin token:', r.status)
  } else {
    console.log('admin login failed:', admin.status)
  }

  // 4) users/me/push-token without token -> 401
  r = await fetch(BASE + '/users/me/push-token', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ fcmToken: 'abc' }) })
  console.log('users/me/push-token no token:', r.status)
}

main().catch(e => { console.error(e); process.exit(1) })

