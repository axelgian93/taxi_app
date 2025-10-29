// src/plugins/metrics.ts
import fp from 'fastify-plugin'

export default fp(async (app) => {
  let prom: any
  try {
     
    prom = require('prom-client')
  } catch {
    app.log.warn('prom-client not installed; HTTP metrics disabled')
    return
  }

  const APP_NAME = process.env.APP_NAME || process.env.SERVICE_NAME || 'taxi_api'
  const histogram = new prom.Histogram({
    name: 'app_http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['app','method', 'route', 'status'],
    // Buckets from 5ms to 10s
    buckets: [0.005,0.01,0.025,0.05,0.1,0.25,0.5,1,2.5,5,10],
  })
  prom.register.registerMetric(histogram)

  app.addHook('onRequest', async (req, _rep) => {
    ;(req as any)._ts_hr = process.hrtime.bigint()
  })

  app.addHook('onResponse', async (req, rep) => {
    const start: bigint | undefined = (req as any)._ts_hr
    if (!start) return
    const dur = Number(process.hrtime.bigint() - start) / 1e9
    const method = (req.method || 'GET').toUpperCase()
    const route = (req as any).routerPath || (req as any).routeOptions?.url || req.url.split('?')[0] || 'unknown'
    const status = String(rep.statusCode || 0)
    try {
      histogram.labels({ app: APP_NAME, method, route, status }).observe(dur)
    } catch {
      // ignore label errors
    }
  })
})
