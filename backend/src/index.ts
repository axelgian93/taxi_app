// src/index.ts
import 'dotenv/config'
import Fastify, { FastifyInstance } from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import helmet from '@fastify/helmet'          // 👈 este import es correcto
import rateLimit from '@fastify/rate-limit'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

// Rutas
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

// --- Construcción del servidor ---
async function buildServer(): Promise<FastifyInstance> {
  const app = Fastify({
    trustProxy: true,
    logger: NODE_ENV !== 'production'
      ? { transport: { target: 'pino-pretty' }, level: 'info' }
      : true
  }).withTypeProvider<ZodTypeProvider>()

  // CORS
  await app.register(cors, {
    origin: parseCorsOrigin(),
    credentials: true
  })

  // Seguridad básica
  await app.register(helmet, { global: true })

  // Rate limit
  await app.register(rateLimit, {
    max: RL_MAX,
    timeWindow: RL_WIN
  })

  // Swagger (OpenAPI)
  await app.register(swagger, {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'Taxi API',
        description: 'Backend de ejemplo (Fastify + Prisma)',
        version: '1.0.0'
      },
      servers: [{ url: `http://localhost:${PORT}` }],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
          }
        }
      }
    }
  })

  await app.register(swaggerUi, {
    routePrefix: '/docs',
    staticCSP: true
  })

  // Health
  app.get('/healthz', async () => ({
    ok: true,
    uptime: process.uptime(),
    env: NODE_ENV
  }))

  // Registrar módulos
  await app.register(authRoutes)
  await app.register(driverRoutes)
  await app.register(tripRoutes)
  await app.register(adminTripsRoutes)

  return app
}

// --- Arranque ---
async function main() {
  try {
    const app = await buildServer()
    await app.listen({ port: PORT, host: '0.0.0.0' })
    app.log.info(`🚀 Taxi API corriendo en http://localhost:${PORT}`)
    app.log.info(`📖 Swagger UI en    http://localhost:${PORT}/docs`)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('❌ Error al iniciar el servidor:', err)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}

export default buildServer
