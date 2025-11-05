// src/index.ts
import 'dotenv/config'
import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import helmet from '@fastify/helmet'
import rateLimit from '@fastify/rate-limit'

// 🔐 plugin JWT
import jwtPlugin from './plugins/jwt'
import metricsPlugin from './plugins/metrics'
import availabilityPlugin from './plugins/availability'
import driverPresencePlugin from './plugins/driver-presence'
import tripSupervisorPlugin from './plugins/trip-supervisor'
import sessionsSweepPlugin from './plugins/sessions-sweep'
import opIdsPlugin from './plugins/operation-ids'
import webhooksRawPlugin from './plugins/webhooks-raw'
import requestIdPlugin from './plugins/request-id'
import adminExportRateLimitPlugin from './plugins/admin-export-rate-limit'
import adminExportEtagPlugin from './plugins/admin-export-etag'
import httpsEnforcePlugin from './plugins/https-enforce'
import hppSanitizePlugin from './plugins/hpp-sanitize'
import swaggerCspPlugin from './plugins/swagger-csp'
import sseGuardPlugin from './plugins/sse-guard'
import adminAuditLogger from './plugins/admin-audit-logger'
import adminIpAllowlist from './plugins/admin-ip-allowlist'
import errorSchemasPlugin from './plugins/error-schemas'
// Rutas
import authRoutes from './modules/auth/auth2.routes'
import driverRoutes from './modules/drivers/driver.routes'
import tripRoutes from './modules/trips/trip.routes'
import adminTripsRoutes from './modules/admin/admin.trips.routes'
import adminDiagnosticsRoutes from './modules/admin/admin.diagnostics.routes'
import adminMetricsRoutes from './modules/admin/admin.metrics.routes'
import adminSecurityRoutes from './modules/admin/admin.security.routes'
import adminJwksRoutes from './modules/admin/admin.jwks.routes'
import adminSessionsRoutes from './modules/admin/admin.sessions.routes'
import adminTripsReportRoutes from './modules/admin/admin.trips.report.routes'
import adminAuditRoutes from './modules/admin/admin.audit.routes'
import adminUsersRoutes from './modules/admin/admin.users.routes'
import adminTripsDetailedRoutes from './modules/admin/admin.trips.detailed.routes'
import adminRevenueRoutes from './modules/admin/admin.revenue.routes'
import adminTariffRoutes from './modules/admin/admin.tariff.routes'
import adminMigrationsRoutes from './modules/admin/admin.migrations.routes'
import userRoutes from './modules/users/user.routes'
import riderRoutes from './modules/rider/rider.routes'
import paymentRoutes from './modules/payments/payment.routes.utf8'
import paymentAdminExtRoutes from './modules/payments/payment.admin.ext.routes'
import stripeWebhookRoutes from './modules/payments/stripe.webhook.routes'
import paymentSetupRoutes from './modules/payments/payment.setup.routes'
import prisma from './lib/prisma'
let Redis: any = null
try { Redis = require('ioredis') } catch {}

const PORT = Number(process.env.PORT || 8080)
const NODE_ENV = process.env.NODE_ENV || 'development'

function parseCorsOrigin(): true | string[] {
  const raw = (process.env.CORS_ORIGIN || '*').trim()
  const isProd = (NODE_ENV === 'production')
  if (raw === '*' || raw === 'true') {
    // In production, do not allow wildcard CORS; require explicit allowlist
    if (isProd) return []
    return true
  }
  const parts = raw.split(',').map(s => s.trim()).filter(Boolean)
  return parts.length ? parts : ['http://localhost:3000']
}

const RL_MAX = Number(process.env.RATE_LIMIT_MAX || 200)
const RL_WIN = process.env.RATE_LIMIT_TIME_WINDOW || '1 minute'

async function buildServer(): Promise<FastifyInstance> {
  const MAX_BODY = Number(process.env.MAX_BODY_BYTES || 1024 * 1024)
  const app = Fastify({
    ajv: { customOptions: { keywords: ['example'], strict: false } },
    trustProxy: true,
    bodyLimit: MAX_BODY,
    logger: NODE_ENV !== 'production'
      ? { transport: { target: 'pino-pretty', options: { colorize: true } } }
      : true
  })

  await app.register(cors, { origin: parseCorsOrigin(), credentials: true })
  await app.register(swagger, {
    openapi: {
      openapi: '3.0.3',
      info: { title: 'Taxi API', description: 'API de Taxi', version: '1.0.0' },
      servers: [{ url: `http://localhost:${PORT}` }],
      components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } } },
      security: [{ bearerAuth: [] }]
    }
  })
  // Optionally protect /docs in production unless DOCS_PUBLIC=true
  const DOCS_PUBLIC = (process.env.DOCS_PUBLIC || '').toLowerCase() === 'true'
  if (NODE_ENV === 'production' && !DOCS_PUBLIC) {
    app.addHook('onRequest', async (req: any, reply) => {
      const url = (req.url || '').split('?')[0]
      if (url === '/docs' || url.startsWith('/docs/')) {
        try { await req.jwtVerify() } catch { return reply.code(401).send({ error: 'Unauthorized' }) }
        if (req.user?.role !== 'ADMIN') return reply.code(403).send({ error: 'Forbidden' })
      }
    })
  }
  await app.register(swaggerUi, { routePrefix: '/docs', uiConfig: { docExpansion: 'list', deepLinking: true } })
  await app.register(swaggerCspPlugin)
  await app.register(requestIdPlugin)
  await app.register(helmet, { contentSecurityPolicy: false, hsts: NODE_ENV === 'production' })
  await app.register(rateLimit, { max: RL_MAX, timeWindow: RL_WIN })
  await app.register(hppSanitizePlugin)
  await app.register(httpsEnforcePlugin)
  await app.register(metricsPlugin)
  await app.register(sseGuardPlugin)
  await app.register(adminAuditLogger)
  await app.register(adminIpAllowlist)
  await app.register(availabilityPlugin)
  await app.register(driverPresencePlugin)
  // Ensure operationId mapping is applied as routes are registered
  await app.register(opIdsPlugin)
  // Inject default error response schemas (401/403/409/429) if missing
  await app.register(errorSchemasPlugin)
  // Default rate-limit for admin export endpoints (applies on route registration)
  await app.register(adminExportRateLimitPlugin)
  // ETag/Cache-Control for admin export endpoints (applies onSend)
  await app.register(adminExportEtagPlugin)
  await app.register(tripSupervisorPlugin)
  await app.register(sessionsSweepPlugin)

  app.get('/healthz', { schema: { operationId: 'healthz', security: [] } }, async () => ({ ok: true, uptime: process.uptime(), env: NODE_ENV }))
  app.get('/healthz/extended', { schema: { operationId: 'healthzExtended', security: [] } }, async (_req, reply) => {
    const version = process.env.APP_VERSION || process.env.npm_package_version || 'unknown'
    let dbOk = false
    try { await prisma.$queryRaw`SELECT 1`; dbOk = true } catch {}
    let redisOk = false
    try {
      if (process.env.EVENTS_USE_REDIS === '1' && Redis) {
        const r = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', { lazyConnect: true })
        await r.connect()
        await r.ping()
        await r.quit()
        redisOk = true
      }
    } catch {}
    const mem = process.memoryUsage()
    return reply.send({ ok: true, env: NODE_ENV, version, uptime: process.uptime(), now: new Date().toISOString(), pid: process.pid, memory: { rss: mem.rss, heapUsed: mem.heapUsed, heapTotal: mem.heapTotal }, deps: { db: dbOk, redis: redisOk } })
  })

  // Liveness probe (process is up)
  app.get('/live', { schema: { operationId: 'live', security: [] } }, async (_req, reply) => {
    return reply.send({ ok: true, now: new Date().toISOString() })
  })

  // Readiness probe (deps available)
  app.get('/ready', { schema: { operationId: 'ready', security: [] } }, async (_req, reply) => {
    let dbOk = false
    try { await prisma.$queryRaw`SELECT 1`; dbOk = true } catch {}
    let redisOk = false
    try {
      if (process.env.EVENTS_USE_REDIS === '1' && Redis) {
        const r = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', { lazyConnect: true })
        await r.connect()
        await r.ping()
        await r.quit()
        redisOk = true
      }
    } catch {}
    const requireRedis = (process.env.EVENTS_USE_REDIS === '1')
    const ok = dbOk && (!requireRedis || redisOk)
    return ok
      ? reply.send({ ok: true, deps: { db: dbOk, redis: redisOk } })
      : reply.code(503).send({ ok: false, deps: { db: dbOk, redis: redisOk } })
  })

  // Global error handler with request id in response
  app.setErrorHandler((err, req, reply) => {
    const code = (err as any).statusCode || 500
    const payload: any = { error: err.name || 'Error', requestId: req.id }
    if (code >= 500 && NODE_ENV === 'production') {
      payload.message = 'Internal Server Error'
    } else {
      payload.message = err.message
    }
    app.log.error({ err, reqId: req.id }, 'Unhandled error')
    reply.code(code).send(payload)
  })

  // 🔐 JWT ANTES de registrar rutas
  await app.register(jwtPlugin)

  // Rutas
  await app.register(authRoutes)
  await app.register(driverRoutes)
  await app.register(tripRoutes)
  await app.register(adminTripsRoutes)
  await app.register(adminDiagnosticsRoutes)
  await app.register(adminMetricsRoutes)
  await app.register(adminSecurityRoutes)
  await app.register(adminJwksRoutes)
  await app.register(adminSessionsRoutes)
  await app.register(adminTripsReportRoutes)
  await app.register(adminAuditRoutes)
  await app.register(adminUsersRoutes)
  await app.register(adminTripsDetailedRoutes)
  await app.register(adminRevenueRoutes)
  await app.register(adminTariffRoutes)
  await app.register(adminMigrationsRoutes)
  await app.register(userRoutes)
  await app.register(riderRoutes)
  await app.register(paymentRoutes)
  await app.register(paymentAdminExtRoutes)
  // Raw body for all /webhooks/* (e.g., Stripe)
  await app.register(webhooksRawPlugin)
  await app.register(stripeWebhookRoutes, { prefix: '/webhooks' })
  await app.register(paymentSetupRoutes)

  return app
}

async function main() {
  const app = await buildServer()
  await app.listen({ port: PORT, host: '0.0.0.0' })
  app.log.info(`🚀 Taxi API corriendo en http://localhost:${PORT}`)
  app.log.info(`📖 Swagger UI en    http://localhost:${PORT}/docs`)
}

main().catch(err => {
  console.error('❌ Error al iniciar el servidor:', err)
  process.exit(1)
})



