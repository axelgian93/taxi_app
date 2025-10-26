// src/index.ts
import 'dotenv/config'
import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'

// ðŸ” plugin JWT
import jwtPlugin from './plugins/jwt'
import metricsPlugin from './plugins/metrics'
import availabilityPlugin from './plugins/availability'
import tripSupervisorPlugin from './plugins/trip-supervisor'
import webhooksRawPlugin from './plugins/webhooks-raw'

// Rutas
import authRoutes from './modules/auth/auth.routes'
import driverRoutes from './modules/drivers/driver.routes'
import tripRoutes from './modules/trips/trip.routes'
import adminTripsRoutes from './modules/admin/admin.trips.routes'
import adminDiagnosticsRoutes from './modules/admin/admin.diagnostics.routes'
import adminMetricsRoutes from './modules/admin/admin.metrics.routes'
import userRoutes from './modules/users/user.routes'
import paymentRoutes from './modules/payments/payment.routes'
import stripeWebhookRoutes from './modules/payments/stripe.webhook.routes'
import paymentSetupRoutes from './modules/payments/payment.setup.routes'

const PORT = Number(process.env.PORT || 8080)
const NODE_ENV = process.env.NODE_ENV || 'development'

function parseCorsOrigin(): true | string[] {
  const raw = (process.env.CORS_ORIGIN || '*').trim()
  if (raw === '*' || raw === 'true') return true
  const parts = raw.split(',').map(s => s.trim()).filter(Boolean)
  return parts.length ? parts : ['http://localhost:3000']
}

const RL_MAX = Number(process.env.RATE_LIMIT_MAX || 200)
const RL_WIN = process.env.RATE_LIMIT_TIME_WINDOW || '1 minute'

async function buildServer(): Promise<FastifyInstance> {
  const app = Fastify({
    ajv: { customOptions: { keywords: ['example'], strict: false } },
    trustProxy: true,
    logger: NODE_ENV !== 'production'
      ? { transport: { target: 'pino-pretty', options: { colorize: true } } }
      : true
  })

  await app.register(cors, { origin: parseCorsOrigin(), credentials: true })
  await app.register(swagger, {
    openapi: {
      openapi: '3.1.0',
      info: { title: 'Taxi API', description: 'API de Taxi', version: '1.0.0' },
      servers: [{ url: `http://localhost:${PORT}` }],
      components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } } },
      security: [{ bearerAuth: [] }]
    }
  })
  await app.register(swaggerUi, { routePrefix: '/docs', uiConfig: { docExpansion: 'list', deepLinking: true } })
  await app.register(helmet, { contentSecurityPolicy: false })
  await app.register(rateLimit, { max: RL_MAX, timeWindow: RL_WIN })
  await app.register(metricsPlugin)
  await app.register(availabilityPlugin)
  await app.register(tripSupervisorPlugin)

  app.get('/healthz', { schema: { security: [] } }, async () => ({ ok: true, uptime: process.uptime(), env: NODE_ENV }))

  // ðŸ” JWT ANTES de registrar rutas
  await app.register(jwtPlugin)

  // Rutas
  await app.register(authRoutes)
  await app.register(driverRoutes)
  await app.register(tripRoutes)
  await app.register(adminTripsRoutes)
  await app.register(adminDiagnosticsRoutes)
  await app.register(adminMetricsRoutes)
  await app.register(userRoutes)
  await app.register(paymentRoutes)
  // Raw body for all /webhooks/* (e.g., Stripe)
  await app.register(webhooksRawPlugin)
  await app.register(stripeWebhookRoutes, { prefix: '/webhooks' })
  await app.register(paymentSetupRoutes)

  return app
}

async function main() {
  const app = await buildServer()
  await app.listen({ port: PORT, host: '0.0.0.0' })
  app.log.info(`ðŸš€ Taxi API corriendo en http://localhost:${PORT}`)
  app.log.info(`ðŸ“– Swagger UI en    http://localhost:${PORT}/docs`)
}

main().catch(err => {
  console.error('âŒ Error al iniciar el servidor:', err)
  process.exit(1)
})
