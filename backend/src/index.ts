// src/index.ts
import 'dotenv/config'
import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import rateLimit from '@fastify/rate-limit'

import authRoutes from './modules/auth/auth.routes'
import driverRoutes from './modules/drivers/driver.routes'
import tripRoutes from './modules/trips/trip.routes'
import adminTripsRoutes from './modules/admin/admin.trips.routes'

const PORT = Number(process.env.PORT || 8080)
const NODE_ENV = process.env.NODE_ENV || 'development'

// --- Helpers de config ---
function parseCorsOrigin(): true | string[] {
  const raw = (process.env.CORS_ORIGIN || '*').trim()
  if (raw === '*' || raw === 'true') return true
  const parts = raw.split(',').map(s => s.trim()).filter(Boolean)
  return parts.length ? parts : ['http://localhost:3000']
}

const RL_MAX = Number(process.env.RATE_LIMIT_MAX || 200)
const RL_WIN = process.env.RATE_LIMIT_TIME_WINDOW || '1 minute'

// Construcción del servidor
async function buildServer(): Promise<FastifyInstance> {
  const app = Fastify({
    trustProxy: true,
    logger: {
      transport: NODE_ENV !== 'production'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined
    }
  })

  // CORS fino
  await app.register(cors, {
    origin: parseCorsOrigin(),
    credentials: true
  })

  // Rate limiting (excluye docs y healthz)
  await app.register(rateLimit, {
    max: RL_MAX,
    timeWindow: RL_WIN,
    allowList: (req) => {
      const url = req.raw.url || ''
      return url.startsWith('/healthz') || url.startsWith('/docs') || url.startsWith('/docs/json')
    },
    keyGenerator: (req) => req.ip,
    ban: 0,
    skipOnError: true
  })

  // Swagger (OpenAPI 3.1)
  await app.register(swagger, {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'Taxi API',
        description: 'Documentación de endpoints para la app de taxi',
        version: '1.0.0'
      },
      servers: [{ url: `http://localhost:${PORT}`, description: 'Local' }],
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
        }
      },
      security: [{ bearerAuth: [] }]
    }
  })

  // Swagger UI
  await app.register(swaggerUi, {
    routePrefix: '/docs',
    staticCSP: true,
    uiConfig: { docExpansion: 'list', deepLinking: false }
  })

  // Health
  app.get('/healthz', async () => ({ ok: true, uptime: process.uptime(), env: NODE_ENV }))

  // Rutas
  await app.register(authRoutes)
  await app.register(driverRoutes)
  await app.register(tripRoutes)
  await app.register(adminTripsRoutes)

  return app
}

// Boot
buildServer()
  .then(async (app) => {
    await app.listen({ port: PORT, host: '0.0.0.0' })
    app.log.info(`🚀 Taxi API corriendo en http://localhost:${PORT}`)
    app.log.info(`📖 Swagger UI en    http://localhost:${PORT}/docs`)
  })
  .catch((err) => {
    console.error('❌ Error al iniciar el servidor:', err)
    process.exit(1)
  })
