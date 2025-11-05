// src/plugins/https-enforce.ts
import fp from 'fastify-plugin'

export default fp(async function httpsEnforce(app) {
  const enabled = (process.env.ENFORCE_HTTPS || '').toLowerCase() === 'true'
  if (!enabled) return
  const EXEMPT = new Set<string>([
    '/live', '/ready', '/healthz', '/healthz/extended', '/metrics', '/docs',
  ])
  app.addHook('onRequest', async (req: any, reply) => {
    try {
      const url = String((req.url || '').split('?')[0])
      if (url.startsWith('/docs/')) return
      if (EXEMPT.has(url)) return
      const xfproto = String(req.headers['x-forwarded-proto'] || '').toLowerCase()
      // If behind proxy and not https, redirect
      if (xfproto && xfproto !== 'https') {
        const host = req.headers['host']
        const location = `https://${host}${req.url}`
        return reply.code(301).header('Location', location).send()
      }
    } catch {}
  })
})

