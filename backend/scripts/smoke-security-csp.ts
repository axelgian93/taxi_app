// scripts/smoke-security-csp.ts
import fetch from 'node-fetch'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080'

async function main() {
  console.log('Security CSP @', BASE)
  const r = await fetch(BASE + '/docs')
  console.log('GET /docs status:', r.status)
  console.log('CSP:', r.headers.get('content-security-policy') || '(none)')
}

main().catch(e => { console.error(e); process.exit(1) })

