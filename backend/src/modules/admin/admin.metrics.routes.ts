// src/modules/admin/admin.metrics.routes.ts
import type { FastifyInstance } from 'fastify'

import { getMetricsText } from '../../services/metrics.prom'
import { env } from '../../config/env'

export default async function adminMetricsRoutes(app: FastifyInstance) {
  app.get(
    '/admin/metrics',
    { schema: { operationId: 'adminMetrics', tags: ['admin'], summary: 'Prometheus metrics', description: 'ExposiciÃ³n de mÃ©tricas en formato Prometheus. Protegido por rol ADMIN.' }, preHandler: app.auth.requireRole('ADMIN') },
    async (_req, reply) => {
      const text = await getMetricsText()
      reply.header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
      return reply.send(text)
    }
  )

  // Optional unauthenticated metrics endpoint for Prometheus scraping inside trusted networks.
  // If METRICS_TOKEN is set, it must be provided as header `x-metrics-token`.
  app.get(
    '/metrics',
    { schema: { operationId: 'metricsPublic', tags: ['admin'], summary: 'Prometheus metrics (public)', description: 'Endpoint para scraping por Prometheus. Requiere header x-metrics-token si METRICS_TOKEN estÃ¡ definido o si METRICS_PUBLIC=false.', security: [] } },
    async (req, reply) => {
      if (!env.metricsPublic || env.metricsToken) {
        const tokHeader = (req.headers['x-metrics-token'] as string) || ''
        const auth = (req.headers['authorization'] as string) || ''
        const bearer = auth.startsWith('Bearer ') ? auth.slice('Bearer '.length) : ''
        const provided = tokHeader || bearer
        if (!provided || (env.metricsToken && provided !== env.metricsToken)) {
          return reply.code(401).send('unauthorized')
        }
      }
      const text = await getMetricsText()
      reply.header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
      return reply.send(text)
    }
  )
}

