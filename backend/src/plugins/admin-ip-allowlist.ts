// src/plugins/admin-ip-allowlist.ts
import fp from 'fastify-plugin'

export default fp(async function adminIpAllowlist(app) {
  const raw = (process.env.ADMIN_IP_ALLOWLIST || '').trim()
  if (!raw) return
  const allowed = new Set(raw.split(',').map(s => s.trim()).filter(Boolean))
  app.addHook('onRequest', async (req: any, reply) => {
    const url = String((req.url || '').split('?')[0])
    if (!url.startsWith('/admin/')) return
    const ip = String(req.ip || req.headers['x-forwarded-for'] || '')
    if (!allowed.has(ip)) {
      return reply.code(403).send({ error: 'Forbidden' })
    }
  })
})

