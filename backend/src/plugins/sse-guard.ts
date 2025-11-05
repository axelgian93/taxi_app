// src/plugins/sse-guard.ts
import fp from 'fastify-plugin'

type PreHandler = (req: any, reply: any, done: (err?: Error) => void) => void

export default fp(async function sseGuard(app) {
  const MAX_PER_USER = Number(process.env.SSE_MAX_PER_USER || 2)
  const MAX_PER_IP = Number(process.env.SSE_MAX_PER_IP || 5)
  const MAX_CONN_SEC = Number(process.env.SSE_MAX_CONN_SEC || 600)
  const g: any = globalThis as any
  g.__sseUser = g.__sseUser || new Map<string, number>()
  g.__sseIp = g.__sseIp || new Map<string, number>()

  function inc(userId: string | null, ip: string) {
    if (userId) g.__sseUser.set(userId, (g.__sseUser.get(userId) || 0) + 1)
    g.__sseIp.set(ip, (g.__sseIp.get(ip) || 0) + 1)
  }
  function dec(userId: string | null, ip: string) {
    if (userId) {
      const v = (g.__sseUser.get(userId) || 1) - 1
      if (v > 0) g.__sseUser.set(userId, v); else g.__sseUser.delete(userId)
    }
    const v2 = (g.__sseIp.get(ip) || 1) - 1
    if (v2 > 0) g.__sseIp.set(ip, v2); else g.__sseIp.delete(ip)
  }

  app.addHook('onRoute', (routeOptions: any) => {
    const url: string = routeOptions.url || routeOptions.path || ''
    const method = String(routeOptions.method || 'GET').toUpperCase()
    if (!(method === 'GET' && /\/trips\/:id\/sse$/.test(url))) return
    const orig = Array.isArray(routeOptions.preHandler) ? routeOptions.preHandler.slice() : (routeOptions.preHandler ? [routeOptions.preHandler] : [])
    const guard: PreHandler = (req, reply, done) => {
      try {
        const ip: string = req.ip || req.headers['x-forwarded-for'] || 'unknown'
        const uid: string | null = req.user?.id || null
        const curU = uid ? (g.__sseUser.get(uid) || 0) : 0
        const curI = (g.__sseIp.get(ip) || 0)
        if ((MAX_PER_USER > 0 && uid && curU >= MAX_PER_USER) || (MAX_PER_IP > 0 && curI >= MAX_PER_IP)) {
          reply.code(429).send({ error: 'Too many SSE connections' })
          return
        }
        inc(uid, ip)
        // Ensure counter drops when stream closes
        reply.raw.on('close', () => dec(uid, ip))
        if (MAX_CONN_SEC > 0) {
          setTimeout(() => { try { reply.raw.end() } catch {} }, MAX_CONN_SEC * 1000)
        }
      } catch {}
      done()
    }
    routeOptions.preHandler = [...orig, guard]
  })
})

