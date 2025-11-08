// scripts/smoke-security-cors.ts
import fetch from 'node-fetch'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080'

async function main() {
  console.log('Security CORS @', BASE)
  // Preflight with disallowed origin
  let r = await fetch(BASE + '/auth/login', {
    method: 'OPTIONS',
    headers: {
      Origin: 'http://evil.example',
      'Access-Control-Request-Method': 'POST',
    } as any,
  })
  console.log('OPTIONS /auth/login (evil origin) status:', r.status)
  console.log('ACAO:', r.headers.get('access-control-allow-origin') || '(none)')

  // Simple GET with allowed localhost origin (dev)
  r = await fetch(BASE + '/live', { headers: { Origin: 'http://localhost:3000' } as any })
  console.log('GET /live (localhost origin) status:', r.status)
  console.log('ACAO:', r.headers.get('access-control-allow-origin') || '(none)')
}

main().catch(e => { console.error(e); process.exit(1) })

