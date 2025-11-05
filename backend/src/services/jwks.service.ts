// src/services/jwks.service.ts
import prisma from '../lib/prisma'
import jwt from 'jsonwebtoken'

type KeyRow = { kid: string; secret: string; active: boolean; createdAt: Date }

let cache: { keys: KeyRow[]; loadedAt: number } = { keys: [], loadedAt: 0 }

export async function loadKeys(): Promise<void> {
  try {
    const rows = await prisma.$queryRawUnsafe<KeyRow[]>(
      'SELECT kid, secret, active, "createdAt" FROM "JwtKey" ORDER BY "createdAt" DESC'
    )
    cache = { keys: rows, loadedAt: Date.now() }
  } catch (e) {
    // Table may not exist yet (migrations pending); fall back to empty cache
    cache = { keys: [], loadedAt: Date.now() }
  }
}

export async function ensureBootstrapFromEnv(): Promise<void> {
  if (!cache.keys.length) await loadKeys()
  if (cache.keys.length === 0) {
    const envSecret = process.env.JWT_SECRET || 'dev-secret'
    const kid = 'default'
    try {
      await prisma.$executeRawUnsafe(
        'INSERT INTO "JwtKey" (kid, secret, active) VALUES ($1, $2, true) ON CONFLICT (kid) DO NOTHING',
        kid, envSecret
      )
      await loadKeys()
    } catch {
      // If table is missing, set in-memory active key so server can start
      cache = { keys: [{ kid, secret: envSecret, active: true, createdAt: new Date() }], loadedAt: Date.now() }
    }
  }
}

export function listKeyMeta(): Array<{ kid: string; active: boolean; createdAt: string }>{
  return cache.keys.map(k => ({ kid: k.kid, active: k.active, createdAt: k.createdAt.toISOString() }))
}

export function getActive(): KeyRow | undefined {
  return cache.keys.find(k => k.active)
}

export function findByKid(kid?: string | null): KeyRow | undefined {
  if (!kid) return getActive()
  return cache.keys.find(k => k.kid === kid) || getActive()
}

export async function rotateKey(newKid: string, newSecret: string): Promise<void> {
  await prisma.$executeRawUnsafe('UPDATE "JwtKey" SET active = false WHERE active = true')
  await prisma.$executeRawUnsafe('INSERT INTO "JwtKey" (kid, secret, active) VALUES ($1, $2, true)', newKid, newSecret)
  await loadKeys()
}

export function signAccessToken(payload: any): string {
  const active = getActive()
  const secret = active?.secret || (process.env.JWT_SECRET || 'dev-secret')
  const kid = active?.kid || 'default'
  const exp = process.env.JWT_EXPIRES_IN || '7d'
  return jwt.sign(payload, secret, { expiresIn: exp as any, keyid: kid })
}
