// src/plugins/admin-audit-logger.ts
import fp from 'fastify-plugin'

export default fp(async function adminAuditLogger(app) {
  app.addHook('onRoute', (routeOptions: any) => {
    const url: string = routeOptions.url || routeOptions.path || ''
    if (!url.startsWith('/admin/')) return
    const orig = routeOptions.preHandler
    routeOptions.preHandler = async function (req: any, reply: any) {
      // Call original preHandler(s) first if present
      if (Array.isArray(orig)) {
        for (const h of orig) { await (h as any)(req, reply) }
      } else if (typeof orig === 'function') {
        await (orig as any)(req, reply)
      }
      const user = req.user || {}
      req.log.info({ requestId: req.id, userId: user.id, email: user.email, method: req.method, url: req.url }, 'ADMIN action')
    }
  })
})

