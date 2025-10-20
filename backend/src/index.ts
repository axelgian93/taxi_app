import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'

import authRoutes from './modules/auth/auth.routes'
import driverRoutes from './modules/drivers/driver.routes'
import tripRoutes from './modules/trips/trip.routes'
import adminTripsRoutes from './modules/admin/admin.trips.routes'

const app = Fastify({
  logger: {
    transport: process.env.NODE_ENV === 'production' ? undefined : {
      target: 'pino-pretty',
      options: { translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l o', colorize: true }
    }
  }
})

async function bootstrap() {
  await app.register(cors, { origin: true })

  app.get('/health', async () => ({ ok: true, ts: new Date().toISOString() }))

  // Auth
  await app.register(authRoutes)

  // Resto de módulos
  await app.register(driverRoutes)
  await app.register(tripRoutes)
  await app.register(adminTripsRoutes)

  const port = Number(process.env.PORT ?? 8080)
  const host = process.env.HOST ?? '0.0.0.0'
  await app.listen({ port, host })
  app.log.info(`API listening on http://${host}:${port}`)
}

bootstrap().catch((err) => {
  app.log.error(err)
  process.exit(1)
})
