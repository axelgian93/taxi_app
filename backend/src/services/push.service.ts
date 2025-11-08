// src/services/push.service.ts
import prisma from '../lib/prisma'
import fs from 'fs'
import path from 'path'

type TokenRecord = { userId: string, token: string, platform?: string, role?: string, updatedAt: string }

const TOKENS_PATH = path.join(process.cwd(), 'infra', 'push-tokens.json')

function readTokens(): TokenRecord[] {
  try {
    const s = fs.readFileSync(TOKENS_PATH, 'utf8')
    const arr = JSON.parse(s)
    return Array.isArray(arr) ? arr as TokenRecord[] : []
  } catch { return [] }
}

function writeTokens(list: TokenRecord[]) {
  try {
    fs.mkdirSync(path.dirname(TOKENS_PATH), { recursive: true })
    fs.writeFileSync(TOKENS_PATH, JSON.stringify(list, null, 2), 'utf8')
  } catch {}
}

export function registerPushToken(userId: string, token: string, platform?: string, role?: string) {
  const list = readTokens().filter(r => !(r.userId === userId && r.token === token))
  list.push({ userId, token, platform, role, updatedAt: new Date().toISOString() })
  writeTokens(list)
}

export function unregisterPushToken(userId: string, token: string) {
  const list = readTokens().filter(r => !(r.userId === userId && r.token === token))
  writeTokens(list)
}

export function getUserTokens(userId: string): TokenRecord[] {
  return readTokens().filter(r => r.userId === userId)
}

export async function sendPushToUser(userId: string, title: string, body: string, data?: Record<string, any>) {
  const tokens = getUserTokens(userId)
  if (tokens.length === 0) return
  const key = process.env.FCM_SERVER_KEY || ''
  if (!key) {
    console.log('[push] FCM_SERVER_KEY not set; would send', { userId, title, body, count: tokens.length })
    return
  }
  for (const t of tokens) {
    try {
      await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `key=${key}` },
        body: JSON.stringify({
          to: t.token,
          notification: { title, body },
          data: data || {},
          priority: 'high'
        })
      })
    } catch (e) {
      console.log('[push] send error', e)
    }
  }
}

export async function maybeNotifyOnTripEvent(tripId: string, ev: { type: string, status?: string }) {
  try {
    const t = await prisma.trip.findUnique({ where: { id: tripId }, select: { id: true, riderId: true, driverId: true, city: true } })
    if (!t) return
    const type = String(ev.type || '').toUpperCase()
    if (type === 'ASSIGNED' || type === 'REASSIGNED') {
      if (t.riderId) await sendPushToUser(t.riderId, 'Viaje asignado', `Tu viaje ha sido asignado`, { tripId: t.id, event: type })
      if (t.driverId) await sendPushToUser(t.driverId, 'Nuevo viaje', `Tienes un viaje asignado`, { tripId: t.id, event: type })
    }
    if (type === 'ARRIVED') {
      if (t.riderId) await sendPushToUser(t.riderId, 'Tu conductor ha llegado', 'Sal a tu punto de recogida', { tripId: t.id, event: type })
    }
    if (type === 'STARTED') {
      if (t.riderId) await sendPushToUser(t.riderId, 'Tu viaje ha iniciado', '¡Buen viaje!', { tripId: t.id, event: type })
    }
    if (type === 'COMPLETED') {
      if (t.riderId) await sendPushToUser(t.riderId, 'Viaje completado', 'Gracias por viajar con nosotros', { tripId: t.id, event: type })
    }
    if (type === 'CANCELED') {
      if (t.riderId) await sendPushToUser(t.riderId, 'Viaje cancelado', 'Tu viaje ha sido cancelado', { tripId: t.id, event: type })
      if (t.driverId) await sendPushToUser(t.driverId, 'Viaje cancelado', 'El viaje fue cancelado', { tripId: t.id, event: type })
    }
  } catch {}
}

export function listAllTokens(): TokenRecord[] { return readTokens() }

