// src/services/push.service.ts
import prisma from '../lib/prisma'
import fetch from 'node-fetch'

type PushData = Record<string, string | number | boolean | null | undefined>

export async function sendPushToUser(userId: string, opts: { title: string; body: string; data?: PushData }) {
  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { fcmToken: true, email: true } as any })
    const token = (user as any)?.fcmToken as string | undefined
    if (!token) {
      console.warn(`[push] No FCM token for user=${userId}`)
      return false
    }
    const serverKey = process.env.FCM_SERVER_KEY
    if (!serverKey) {
      console.warn('[push] Missing FCM_SERVER_KEY; skipping push')
      return false
    }

    const res = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${serverKey}`,
      },
      body: JSON.stringify({
        to: token,
        notification: { title: opts.title, body: opts.body },
        data: opts.data ?? {},
      }),
    })
    if (!res.ok) {
      const txt = await res.text().catch(() => '')
      console.error('[push] FCM error:', res.status, txt)
      return false
    }
    return true
  } catch (e) {
    console.error('[push] Unexpected error:', e)
    return false
  }
}
