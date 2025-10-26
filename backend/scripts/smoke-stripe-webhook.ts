// scripts/smoke-stripe-webhook.ts
import 'dotenv/config'

const BASE = `http://localhost:${process.env.PORT || 8080}/webhooks`

async function main() {
  const payload = Buffer.from(JSON.stringify({ test: true }))
  const res = await fetch(`${BASE}/stripe`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'stripe-signature': 't=0,v1=bogus',
    },
    body: payload,
  })

  const text = await res.text()
  if (res.status === 404) {
    console.log('Stripe webhook route not configured; skipping (OK).')
    return
  }
  if (res.status === 400 && text.includes('Invalid signature')) {
    console.log('Stripe webhook invalid signature -> 400 OK')
    return
  }
  throw new Error(`Unexpected response: ${res.status} ${text}`)
}

main().catch((e) => {
  console.error('Smoke stripe-webhook failed:', e)
  process.exit(1)
})

