// scripts/smoke-push-token.ts
import 'dotenv/config'

const BASE = `http://localhost:${process.env.PORT || 8080}`

type LoginResponse = {
  token: string
  user: { id: string; email: string; role: 'ADMIN' | 'DRIVER' | 'RIDER' }
}

async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error(`Login failed ${res.status} ${await res.text()}`)
  return (await res.json()) as LoginResponse
}

async function post(url: string, token: string, body: unknown) {
  const res = await fetch(`${BASE}${url}`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
    body: JSON.stringify(body),
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`POST ${url} -> ${res.status} ${text}`)
  return text
}

async function del(url: string, token: string) {
  const res = await fetch(`${BASE}${url}`, {
    method: 'DELETE',
    headers: { authorization: `Bearer ${token}` },
  })
  const text = await res.text()
  if (!res.ok) throw new Error(`DELETE ${url} -> ${res.status} ${text}`)
  return text
}

async function main() {
  const email = process.env.SMOKE_EMAIL || 'rider@taxi.local'
  const password = process.env.SMOKE_PASSWORD || '123456'
  const tokenSample = process.env.SMOKE_FCM_TOKEN || 'd5x...:APA91bHExampleToken'

  console.log('Login as', email)
  const { token } = await login(email, password)

  console.log('Register FCM token')
  const r1 = await post('/users/me/push-token', token, { fcmToken: tokenSample })
  console.log('Response:', r1)

  console.log('Delete FCM token')
  const r2 = await del('/users/me/push-token', token)
  console.log('Response:', r2)

  console.log('Smoke push-token OK')
}

main().catch((e) => {
  console.error('Smoke push-token failed:', e)
  process.exit(1)
})

