// scripts/smoke-security-login-rl.ts
import fetch from 'node-fetch'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080'
const ATTEMPTS = Number(process.env.RL_LOGIN_ATTEMPTS || 15)

async function main() {
  console.log('Security Login Rate-Limit @', BASE)
  const email = 'rider@taxi.local'
  let s401 = 0, s429 = 0, other: Record<number, number> = {}
  for (let i=0;i<ATTEMPTS;i++) {
    const res = await fetch(BASE + '/auth/login', {
      method: 'POST', headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password: 'wrong-password' })
    })
    if (res.status === 401) s401++
    else if (res.status === 429) s429++
    else other[res.status] = (other[res.status] || 0) + 1
    if (i === 0) {
      const ra = res.headers.get('retry-after')
      if (ra) console.log('Retry-After first attempt:', ra)
    }
  }
  console.log('Summary:', { '401': s401, '429': s429, other })
}

main().catch(e => { console.error(e); process.exit(1) })

