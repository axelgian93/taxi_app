// src/modules/admin/admin.ops.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import fs from 'fs'
import path from 'path'
import { incCounter, incCurrentSse, decCurrentSse } from '../../services/metrics.service'

export default async function adminOpsRoutes(app: FastifyInstance) {
  let cachedCities: any[] | null = null
  function loadCities(): any[] {
    if (cachedCities) return cachedCities
    try {
      const p = path.join(process.cwd(), 'infra', 'cities.json')
      const raw = fs.readFileSync(p, 'utf8')
      const json = JSON.parse(raw)
      const items = Array.isArray(json?.items) ? json.items : []
      cachedCities = items.filter((c: any) => c && c.center && typeof c.center.lat === 'number' && typeof c.center.lng === 'number')
      return cachedCities
    } catch {
      cachedCities = []
      return cachedCities
    }
  }
  function saveCities(list: any[]) {
    try {
      const p = path.join(process.cwd(), 'infra', 'cities.json')
      const payload = { items: list }
      fs.writeFileSync(p, JSON.stringify(payload, null, 2), 'utf8')
      cachedCities = list
      return true
    } catch {
      return false
    }
  }
  // GET /admin/ops/active-trips - list active (non-final) trips
  app.get('/admin/ops/active-trips', {
    schema: {
      operationId: 'adminOpsActiveTrips',
      tags: ['admin'],
      summary: 'Active trips',
      description: 'Lista viajes con estado no finalizado para visualización operativa.',
      querystring: {
        type: 'object',
        properties: {
          city: { type: 'string' },
          limit: { type: 'integer', minimum: 1, maximum: 1000, default: 300 },
        },
        additionalProperties: false,
      },
      response: {
        200: {
          type: 'object',
          properties: {
            items: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  status: { type: 'string' },
                  city: { type: 'string', nullable: true },
                  driverId: { type: 'string', nullable: true },
                  pickupLat: { type: 'number', nullable: true },
                  pickupLng: { type: 'number', nullable: true },
                  dropoffLat: { type: 'number', nullable: true },
                  dropoffLng: { type: 'number', nullable: true },
                  updatedAt: { type: 'string', format: 'date-time' },
                  origin: { type: 'object', properties: { lat: { type: 'number' }, lng: { type: 'number' } }, nullable: true },
                  destination: { type: 'object', properties: { lat: { type: 'number' }, lng: { type: 'number' } }, nullable: true },
                }
              }
            }
          }
        }
      }
    },
    preHandler: app.auth.requireRole('ADMIN'),
  }, async (req, reply) => {
    const { city, limit = 300 } = (req.query || {}) as any
    const items = await prisma.trip.findMany({
      where: {
        status: { notIn: ['COMPLETED' as any, 'CANCELED' as any] },
        ...(city ? { city: String(city) } : {}),
      },
      select: {
        id: true, status: true, city: true, driverId: true,
        pickupLat: true, pickupLng: true, dropoffLat: true, dropoffLng: true,
        updatedAt: true,
      },
      orderBy: { updatedAt: 'desc' },
      take: Number(limit),
    })
    const mapped = items.map((t: any) => ({
      ...t,
      pickupLat: t.pickupLat != null ? Number(t.pickupLat) : null,
      pickupLng: t.pickupLng != null ? Number(t.pickupLng) : null,
      dropoffLat: t.dropoffLat != null ? Number(t.dropoffLat) : null,
      dropoffLng: t.dropoffLng != null ? Number(t.dropoffLng) : null,
      origin: t.pickupLat != null && t.pickupLng != null ? { lat: Number(t.pickupLat), lng: Number(t.pickupLng) } : null,
      destination: t.dropoffLat != null && t.dropoffLng != null ? { lat: Number(t.dropoffLat), lng: Number(t.dropoffLng) } : null,
    }))
    return reply.send({ items: mapped })
  })

  // GET /admin/ops/active-drivers - list drivers recently online with last location
  app.get('/admin/ops/active-drivers', {
    schema: {
      operationId: 'adminOpsActiveDrivers',
      tags: ['admin'],
      summary: 'Active drivers with location',
      description: 'Conductores con ubicación reciente (no OFFLINE) para visualización operativa.',
      querystring: {
        type: 'object',
        properties: {
          maxAgeMin: { type: 'integer', minimum: 1, maximum: 1440, default: 10 },
          status: { type: 'string' },
          limit: { type: 'integer', minimum: 1, maximum: 5000, default: 2000 },
        },
        additionalProperties: false,
      },
      response: {
        200: {
          type: 'object',
          properties: {
            items: {
              type: 'array', items: {
                type: 'object', properties: {
                  userId: { type: 'string' },
                  status: { type: 'string' },
                  lat: { type: 'number', nullable: true },
                  lng: { type: 'number', nullable: true },
                  locationUpdatedAt: { type: 'string', format: 'date-time', nullable: true },
                }
              }
            }
          }
        }
      }
    },
    preHandler: app.auth.requireRole('ADMIN'),
  }, async (req, reply) => {
    const { maxAgeMin = 10, status, limit = 2000 } = (req.query || {}) as any
    const cutoff = new Date(Date.now() - Number(maxAgeMin) * 60 * 1000)
    const items = await prisma.driverProfile.findMany({
      where: {
        locationUpdatedAt: { gte: cutoff },
        ...(status ? { status: String(status) as any } : { status: { not: 'OFFLINE' as any } }),
      },
      select: { userId: true, status: true, currentLat: true, currentLng: true, locationUpdatedAt: true },
      orderBy: { locationUpdatedAt: 'desc' },
      take: Number(limit),
    })
    const mapped = items.map((d: any) => ({
      userId: d.userId,
      status: d.status,
      lat: d.currentLat != null ? Number(d.currentLat) : null,
      lng: d.currentLng != null ? Number(d.currentLng) : null,
      locationUpdatedAt: d.locationUpdatedAt,
    }))
    return reply.send({ items: mapped })
  })

  // GET /admin/ops/cities - known city centers/bounds for maps
  app.get('/admin/ops/cities', {
    schema: {
      operationId: 'adminOpsCities',
      tags: ['admin'],
      summary: 'Known cities (centers for maps)',
      description: 'Lista de ciudades conocidas con centro y zoom sugerido para centrar mapas.',
      response: {
        200: {
          type: 'object',
          properties: {
            items: { type: 'array', items: { type: 'object', properties: { key: { type: 'string' }, name: { type: 'string' }, center: { type: 'object', properties: { lat: { type: 'number' }, lng: { type: 'number' } } }, zoom: { type: 'integer', nullable: true } } } }
          }
        }
      }
    },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (_req, reply) => {
    const items = loadCities()
    return reply.send({ items })
  })

  app.post('/admin/ops/cities', {
    schema: {
      operationId: 'adminOpsCitiesCreate',
      tags: ['admin'],
      summary: 'Create city',
      body: {
        type: 'object',
        required: ['key','name','center'],
        properties: {
          key: { type: 'string', minLength: 2 },
          name: { type: 'string', minLength: 2 },
          center: { type: 'object', required: ['lat','lng'], properties: { lat: { type: 'number', minimum: -90, maximum: 90 }, lng: { type: 'number', minimum: -180, maximum: 180 } } },
          zoom: { type: 'integer', minimum: 1, maximum: 20, nullable: true },
          bounds: {
            type: 'object',
            nullable: true,
            properties: {
              sw: { type: 'object', properties: { lat: { type: 'number', minimum: -90, maximum: 90 }, lng: { type: 'number', minimum: -180, maximum: 180 } } },
              ne: { type: 'object', properties: { lat: { type: 'number', minimum: -90, maximum: 90 }, lng: { type: 'number', minimum: -180, maximum: 180 } } }
            }
          }
        },
        additionalProperties: false,
      },
      response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } } }
    },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (req: any, reply) => {
    const b = (req.body || {}) as any
    const key = String(b.key || '').trim()
    const name = String(b.name || '').trim()
    const center = b.center || {}
    if (!key || !name || typeof center.lat !== 'number' || typeof center.lng !== 'number') {
      return reply.code(400).send({ error: 'Invalid payload' })
    }
    const items = loadCities()
    if (items.find(c => (c.key || '').toLowerCase() === key.toLowerCase())) {
      return reply.code(409).send({ error: 'City key exists' })
    }
    if (center.lat < -90 || center.lat > 90 || center.lng < -180 || center.lng > 180) return reply.code(400).send({ error: 'Invalid center range' })
    if (b.zoom != null && (Number(b.zoom) < 1 || Number(b.zoom) > 20)) return reply.code(400).send({ error: 'Invalid zoom range' })
    let bounds = null
    if (b.bounds && b.bounds.sw && b.bounds.ne) {
      const sw = b.bounds.sw, ne = b.bounds.ne
      if (typeof sw.lat !== 'number' || typeof sw.lng !== 'number' || typeof ne.lat !== 'number' || typeof ne.lng !== 'number') return reply.code(400).send({ error: 'Invalid bounds' })
      if (sw.lat < -90 || sw.lat > 90 || sw.lng < -180 || sw.lng > 180 || ne.lat < -90 || ne.lat > 90 || ne.lng < -180 || ne.lng > 180) return reply.code(400).send({ error: 'Invalid bounds range' })
      bounds = { sw: { lat: Number(sw.lat), lng: Number(sw.lng) }, ne: { lat: Number(ne.lat), lng: Number(ne.lng) } }
    }
    const list = items.concat([{ key, name, center: { lat: Number(center.lat), lng: Number(center.lng) }, zoom: b.zoom ?? null, ...(bounds ? { bounds } : {}) }])
    if (!saveCities(list)) return reply.code(500).send({ error: 'Persist failed' })
    return reply.send({ ok: true })
  })

  app.patch('/admin/ops/cities/:key', {
    schema: {
      operationId: 'adminOpsCitiesUpdate',
      tags: ['admin'],
      summary: 'Update city',
      params: { type: 'object', required: ['key'], properties: { key: { type: 'string' } } },
      body: { type: 'object', properties: {
        name: { type: 'string' },
        center: { type: 'object', properties: { lat: { type: 'number', minimum: -90, maximum: 90 }, lng: { type: 'number', minimum: -180, maximum: 180 } } },
        zoom: { type: 'integer', minimum: 1, maximum: 20, nullable: true },
        bounds: {
          type: 'object',
          nullable: true,
          properties: {
            sw: { type: 'object', properties: { lat: { type: 'number', minimum: -90, maximum: 90 }, lng: { type: 'number', minimum: -180, maximum: 180 } } },
            ne: { type: 'object', properties: { lat: { type: 'number', minimum: -90, maximum: 90 }, lng: { type: 'number', minimum: -180, maximum: 180 } } }
          }
        }
      }, additionalProperties: false },
      response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } }, 404: { type: 'object', properties: { error: { type: 'string' } } } }
    },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (req: any, reply) => {
    const key = String((req.params || {}).key || '')
    const items = loadCities()
    const idx = items.findIndex((c: any) => (c.key || '').toLowerCase() === key.toLowerCase())
    if (idx === -1) return reply.code(404).send({ error: 'Not found' })
    const b = (req.body || {}) as any
    const next = items.slice()
    const cur = { ...next[idx] }
    if (b.name) cur.name = String(b.name)
    if (b.center && typeof b.center.lat === 'number' && typeof b.center.lng === 'number') {
      if (b.center.lat < -90 || b.center.lat > 90 || b.center.lng < -180 || b.center.lng > 180) return reply.code(400).send({ error: 'Invalid center range' })
      cur.center = { lat: Number(b.center.lat), lng: Number(b.center.lng) }
    }
    if (b.zoom != null) {
      if (Number(b.zoom) < 1 || Number(b.zoom) > 20) return reply.code(400).send({ error: 'Invalid zoom range' })
      cur.zoom = Number(b.zoom)
    }
    if (b.bounds) {
      if (b.bounds.sw && b.bounds.ne) {
        const sw = b.bounds.sw, ne = b.bounds.ne
        if (typeof sw.lat !== 'number' || typeof sw.lng !== 'number' || typeof ne.lat !== 'number' || typeof ne.lng !== 'number') return reply.code(400).send({ error: 'Invalid bounds' })
        if (sw.lat < -90 || sw.lat > 90 || sw.lng < -180 || sw.lng > 180 || ne.lat < -90 || ne.lat > 90 || ne.lng < -180 || ne.lng > 180) return reply.code(400).send({ error: 'Invalid bounds range' })
        cur.bounds = { sw: { lat: Number(sw.lat), lng: Number(sw.lng) }, ne: { lat: Number(ne.lat), lng: Number(ne.lng) } }
      } else if (b.bounds === null) {
        delete cur.bounds
      }
    }
    next[idx] = cur
    if (!saveCities(next)) return reply.code(500).send({ error: 'Persist failed' })
    return reply.send({ ok: true })
  })

  app.delete('/admin/ops/cities/:key', {
    schema: {
      operationId: 'adminOpsCitiesDelete',
      tags: ['admin'],
      summary: 'Delete city',
      params: { type: 'object', required: ['key'], properties: { key: { type: 'string' } } },
      response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } }, 404: { type: 'object', properties: { error: { type: 'string' } } } }
    },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (req: any, reply) => {
    const key = String((req.params || {}).key || '')
    const items = loadCities()
    const next = items.filter((c: any) => (c.key || '').toLowerCase() !== key.toLowerCase())
    if (next.length === items.length) return reply.code(404).send({ error: 'Not found' })
    if (!saveCities(next)) return reply.code(500).send({ error: 'Persist failed' })
    return reply.send({ ok: true })
  })

  // GET /admin/ops/sse - periodic snapshots for ops dashboard
  app.get('/admin/ops/sse', {
    schema: {
      operationId: 'adminOpsSse',
      tags: ['admin'],
      summary: 'Ops live snapshots (SSE)',
      description: 'Stream Server-Sent Events con snapshots periódicos de active-trips y active-drivers.',
      produces: ['text/event-stream'],
      querystring: {
        type: 'object',
        properties: { city: { type: 'string' }, intervalSec: { type: 'integer', minimum: 2, maximum: 60, default: 10 } },
        additionalProperties: false,
      },
      response: { 200: { description: 'text/event-stream' } },
    },
    preHandler: app.auth.requireRole('ADMIN')
  }, async (req: any, reply) => {
    const { city, intervalSec = 10 } = (req.query || {}) as any

    reply.raw.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    reply.raw.setHeader('Cache-Control', 'no-cache, no-transform')
    reply.raw.setHeader('Connection', 'keep-alive')
    reply.raw.setHeader('X-Accel-Buffering', 'no')
    // @ts-ignore
    if (typeof reply.raw.flushHeaders === 'function') reply.raw.flushHeaders()

    const write = (chunk: string) => { try { reply.raw.write(chunk) } catch {} }

    incCounter('sse_connections')
    incCurrentSse()

    const sendSnapshot = async () => {
      try {
        const [trips, drivers] = await Promise.all([
          prisma.trip.findMany({
            where: { status: { notIn: ['COMPLETED' as any, 'CANCELED' as any] }, ...(city ? { city: String(city) } : {}) },
            select: { id: true, status: true, city: true, driverId: true, pickupLat: true, pickupLng: true, dropoffLat: true, dropoffLng: true, updatedAt: true },
            orderBy: { updatedAt: 'desc' },
            take: 300,
          }),
          (async () => {
            const cutoff = new Date(Date.now() - 10 * 60 * 1000)
            return prisma.driverProfile.findMany({ where: { locationUpdatedAt: { gte: cutoff }, status: { not: 'OFFLINE' as any } }, select: { userId: true, status: true, currentLat: true, currentLng: true, locationUpdatedAt: true }, orderBy: { locationUpdatedAt: 'desc' }, take: 2000 })
          })(),
        ])
        const payload = {
          trips: trips.map((t: any) => ({ id: t.id, status: t.status, city: t.city, driverId: t.driverId, origin: t.pickupLat != null && t.pickupLng != null ? { lat: Number(t.pickupLat), lng: Number(t.pickupLng) } : null, destination: t.dropoffLat != null && t.dropoffLng != null ? { lat: Number(t.dropoffLat), lng: Number(t.dropoffLng) } : null })),
          drivers: drivers.map((d: any) => ({ id: d.userId, status: d.status, lat: d.currentLat != null ? Number(d.currentLat) : null, lng: d.currentLng != null ? Number(d.currentLng) : null, at: d.locationUpdatedAt })),
        }
        write('event: SNAPSHOT\n')
        write('data: ' + JSON.stringify(payload) + '\n\n')
      } catch {}
    }

    // Initial snapshot
    await sendSnapshot()
    const keep = setInterval(() => write(': ping ' + Date.now() + '\n\n'), Math.max(5, Number(process.env.SSE_KEEPALIVE_SEC || 15)) * 1000)
    const timer = setInterval(sendSnapshot, Math.max(2, Math.min(60, Number(intervalSec))) * 1000)

    req.raw.on('close', () => {
      clearInterval(timer)
      clearInterval(keep)
      decCurrentSse()
      try { reply.raw.end() } catch {}
    })

    return reply.hijack()
  })
}
