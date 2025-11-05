// src/plugins/admin-export-rate-limit.ts
import fp from 'fastify-plugin'

export default fp(async function adminExportRateLimit(app) {
  const max = Number(process.env.RL_ADMIN_EXPORT_MAX || 30)
  const win = process.env.RL_ADMIN_EXPORT_WIN || '1 minute'
  app.addHook('onRoute', (routeOptions: any) => {
    const url: string = routeOptions.url || routeOptions.path || ''
    const method = String((routeOptions.method || 'GET')).toUpperCase()
    // Apply defaults only to admin listing/report/export endpoints and only if not explicitly set
    const isAdminExport = method === 'GET' && /^(\/admin\/(payments|trips))/.test(url)
    if (!isAdminExport) return
    routeOptions.config = routeOptions.config || {}
    if (!routeOptions.config.rateLimit) {
      routeOptions.config.rateLimit = {
        max,
        timeWindow: win,
        keyGenerator: (req: any) => `admexp:${req.user?.id || req.ip}`,
      }
    }
  })
})

