// backend/scripts/smoke-login-rl.ts
// Verifica rate-limit por email en /auth/login
import 'dotenv/config'
import fetch from 'node-fetch'
import bcrypt from 'bcrypt'

import prisma from '../src/lib/prisma'

const BASE = process.env.BASE_URL || 'http://127.0.0.1:8080'

async function ensureUser(email: string) {
  const hash = await bcrypt.hash('123456', 10)
  let u = await prisma.user.findUnique({ where: { email } })
  if (!u) u = await prisma.user.create({ data: { email, passwordHash: hash, firstName: 'RL', lastName: 'Test', role: 'RIDER' as any } })
  return u
}

async function tryLogin(email: string, password: string) {
  const r = await fetch(BASE + '/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password }) })
  return r.status
}

async function main() {
  const email = 'smoke.rl@taxi.local'
  await ensureUser(email)
  const max = Number(process.env.RL_LOGIN_PER_EMAIL_MAX || 10)
  const attempts = max + 3
  const statuses: Record<number, number> = {}
  for (let i = 0; i < attempts; i++) {
    const st = await tryLogin(email, 'wrongpwd')
    statuses[st] = (statuses[st] || 0) + 1
  }
  console.log('login RL distribution:', statuses)
}

main().catch(e => { console.error(e); process.exit(1) })
