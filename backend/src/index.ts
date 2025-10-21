// src/index.ts
import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

// 👇 Usa exactamente los archivos que existen en tu repo
import authRoutes from './modules/auth/auth.routes'
import driverRoutes from './modules/drivers/driver.routes'
import tripRoutes from './modules/trips/trip.routes'
import adminTripsRoutes from './modules/admin/admin.trips.routes'

const PORT = Number(process.env.PORT || 8080)

async function buildServer() {
  const app = Fastify({
    logger: {
      transport: process.env.NODE_ENV !== 'production'
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
    },
  })

  // CORS
  await app.register(cors, {
    origin: true,
    credentials: true,
  })

  // Swagger (OpenAPI 3.1)
  await app.register(swagger, {
    openapi: {
      openapi: '3.1.0',
      info: {
        title: 'Taxi API',
        description: 'Documentación de endpoints para la app de taxi',
        version: '1.0.0',
      },
      servers: [{ url: `http://localhost:${PORT}`, description: 'Local' }],
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  })

  // Swagger UI en /docs
  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'list', deepLinking: false },
    staticCSP: true,
  })

  // Healthcheck
  app.get('/healthz', async () => ({ ok: true, uptime: process.uptime() }))

  // Rutas de la app
  await app.register(authRoutes)
  await app.register(driverRoutes)
  await app.register(tripRoutes)
  await app.register(adminTripsRoutes)

  return app
}

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
