// src/modules/auth/refresh.service.ts
import crypto from 'crypto'
import prisma from '../../lib/prisma'

const DEFAULT_TTL_DAYS = Number(process.env.REFRESH_TOKEN_TTL_DAYS || 30)

export type RefreshMeta = {
  deviceId?: string | null
  deviceName?: string | null
  userAgent?: string | null
  ip?: string | null
}

function base64url(buf: Buffer): string {
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export function generateRefreshTokenString(): string {
  const buf = crypto.randomBytes(48)
  return base64url(buf)
}

export function hashToken(raw: string): string {
  return crypto.createHash('sha256').update(raw).digest('hex')
}

export async function issueRefreshToken(userId: string, ttlDays = DEFAULT_TTL_DAYS, meta: RefreshMeta = {}): Promise<{ token: string; expiresAt: Date }>
{
  const raw = generateRefreshTokenString()
  const tokenHash = hashToken(raw)
  const expiresAt = new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000)
  await (prisma as any).refreshToken.create({ data: {
    userId,
    tokenHash,
    expiresAt,
    deviceId: meta.deviceId || null,
    deviceName: meta.deviceName || null,
    userAgent: meta.userAgent || null,
    ip: meta.ip || null,
    lastUsedAt: new Date(),
  } })
  return { token: raw, expiresAt }
}

export async function rotateRefreshToken(oldRaw: string, meta: RefreshMeta = {}): Promise<{ userId: string; token: string; expiresAt: Date } | null> {
  const tokenHash = hashToken(oldRaw)
  const existing = await prisma.refreshToken.findFirst({ where: { tokenHash, revokedAt: null, expiresAt: { gt: new Date() } } })
  if (!existing) return null
  await prisma.refreshToken.update({ where: { id: existing.id }, data: { revokedAt: new Date() } })
  const { token, expiresAt } = await issueRefreshToken(existing.userId, DEFAULT_TTL_DAYS, {
    deviceId: meta.deviceId || (existing as any).deviceId || null,
    deviceName: meta.deviceName || (existing as any).deviceName || null,
    userAgent: meta.userAgent || null,
    ip: meta.ip || null,
  })
  return { userId: existing.userId, token, expiresAt }
}

export async function revokeRefreshToken(raw: string): Promise<boolean> {
  const tokenHash = hashToken(raw)
  const existing = await prisma.refreshToken.findFirst({ where: { tokenHash, revokedAt: null } })
  if (!existing) return false
  await prisma.refreshToken.update({ where: { id: existing.id }, data: { revokedAt: new Date() } })
  try { const { incCounter } = await import('../../services/metrics.service'); incCounter('session_revokes_total' as any) } catch {}
  return true
}

export async function revokeAllForUser(userId: string): Promise<number> {
  const res = await prisma.refreshToken.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } })
  if (res.count > 0) { try { const { incCounter } = await import('../../services/metrics.service'); for (let i=0;i<res.count;i++) incCounter('session_revokes_total' as any) } catch {} }
  return res.count
}
