// src/modules/payments/payment.routes.utf8.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'

export default async function paymentRoutes(app: FastifyInstance) {
  const errorSchema = { type: 'object', properties: { error: { type: 'string' } } } as const

  const paymentSchema = {
    type: 'object',
    properties: {
      id: { type: 'string' }, tripId: { type: 'string' }, amountUsd: { type: 'number' },
      status: { type: 'string', enum: ['PENDING','AUTHORIZED','PAID','FAILED','REFUNDED'] },
      method: { type: 'string' }, provider: { type: 'string', nullable: true }, externalId: { type: 'string', nullable: true },
      createdAt: { type: 'string', format: 'date-time' }, updatedAt: { type: 'string', format: 'date-time' },
      isAuthorized: { type: 'boolean' }, isPaid: { type: 'boolean' }, isFailed: { type: 'boolean' }, providerDisplay: { type: 'string' }, capturable: { type: 'boolean' }
    },
    example: { id: 'pay_123', tripId: 'trp_123', amountUsd: 7.8, status: 'PAID', method: 'CASH', provider: null, externalId: null, isAuthorized: false, isPaid: true, isFailed: false, providerDisplay: 'Cash', capturable: false, createdAt: '2025-01-01T12:20:00.000Z', updatedAt: '2025-01-01T12:20:00.000Z' }
  } as const

  // GET /payments (ADMIN list)
  const listQuery = {
    type: 'object',
    properties: { userId: { type: 'string' }, status: { type: 'string', enum: ['PENDING','AUTHORIZED','PAID','FAILED','REFUNDED'] }, city: { type: 'string' }, from: { type: 'string', format: 'date-time' }, to: { type: 'string', format: 'date-time' }, limit: { type: 'integer', minimum: 1, maximum: 200, default: 50 }, cursor: { type: 'string' }, format: { type: 'string', enum: ['json','csv'], default: 'json' } },
    additionalProperties: false,
  } as const

  app.get('/payments', { schema: { operationId: 'paymentsList', tags: ['payments'], summary: 'Listar pagos (ADMIN)', description: 'Lista pagos con filtros y paginación. CSV con ?format=csv.', querystring: listQuery, response: { 200: { type: 'object', properties: { items: { type: 'array', items: paymentSchema }, nextCursor: { type: ['string','null'] } }, example: { items: [paymentSchema.example], nextCursor: null } } } }, preHandler: app.auth.requireRole('ADMIN') },
    async (req: any, reply) => {
      const { userId, status, city, from, to, limit = 50, cursor, format = 'json' } = req.query as any
      const where: any = {}
      if (status) where.status = status
      if (from || to) where.createdAt = { ...(from ? { gte: new Date(from) } : {}), ...(to ? { lte: new Date(to) } : {}) }
      if (userId) where.trip = { OR: [{ riderId: userId }, { driverId: userId }] }
      if (city) where.trip = { ...(where.trip || {}), pricingSnapshot: { path: ['city'], equals: city } as any }
      const items = await prisma.payment.findMany({ where, take: limit, ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}), orderBy: { createdAt: 'desc' } })
      const mapped = items.map((p: any) => {
        const isAuthorized = p.status === 'AUTHORIZED'; const isPaid = p.status === 'PAID'; const isFailed = p.status === 'FAILED'
        const providerDisplay = p.provider === 'Stripe' ? 'Stripe' : p.method === 'CASH' ? 'Cash' : p.method === 'TRANSFER' ? 'Bank' : (p.provider || 'Unknown')
        const capturable = p.provider === 'Stripe' && p.status === 'AUTHORIZED' && Boolean(p.externalId)
        return { ...p, isAuthorized, isPaid, isFailed, providerDisplay, capturable }
      })
      if (format === 'csv') {
        const header = ['id','tripId','amountUsd','status','method','provider','externalId','createdAt','updatedAt','isAuthorized','isPaid','isFailed','providerDisplay','capturable']
        const rows = mapped.map(p => [p.id,p.tripId,String(p.amountUsd ?? ''),p.status,p.method,p.provider ?? '',p.externalId ?? '',(p.createdAt as any)?.toISOString?.() || String(p.createdAt),(p.updatedAt as any)?.toISOString?.() || String(p.updatedAt),String(p.isAuthorized),String(p.isPaid),String(p.isFailed),p.providerDisplay,String(p.capturable)].map(v => `"${String(v).replace(/"/g,'""')}"`).join(','))
        const csv = [header.join(','), ...rows].join('\n') + '\n'
        reply.header('Content-Type','text/csv; charset=utf-8')
        return reply.send(csv)
      }
      const nextCursor = items.length === Number(limit) ? items[items.length - 1].id : null
      return reply.send({ items: mapped, nextCursor })
    }
  )

  // Admin reports
  const reportQuery = { type: 'object', properties: { groupBy: { type: 'string', enum: ['day','city','status','city_day','method'], default: 'day' }, from: { type: 'string', format: 'date-time' }, to: { type: 'string', format: 'date-time' }, format: { type: 'string', enum: ['json','csv'], default: 'json' } }, additionalProperties: false } as const

  app.get('/admin/payments/report', { schema: { operationId: 'adminPaymentsReport', tags: ['payments'], summary: 'Reporte de pagos (ADMIN)', description: 'Agrupación por día/ciudad/estado/método. CSV con ?format=csv.', querystring: reportQuery } , preHandler: app.auth.requireRole('ADMIN') },
    async (req: any, reply) => {
      const { groupBy = 'day', from, to, format = 'json' } = req.query as any
      const where: any = {}
      if (from || to) where.createdAt = { ...(from ? { gte: new Date(from) } : {}), ...(to ? { lte: new Date(to) } : {}) }
      const pays = await prisma.payment.findMany({ where, select: { amountUsd: true, status: true, method: true, createdAt: true, tripId: true }, orderBy: { createdAt: 'desc' }, take: 2000 })
      const trips = await prisma.trip.findMany({ where: { id: { in: pays.map(p => p.tripId).filter(Boolean) as any } }, select: { id: true, pricingSnapshot: true } })
      const cityByTrip = new Map(trips.map(t => [t.id, (t as any).pricingSnapshot?.city || null]))
      type Row = any
      const rows: Row[] = pays.map(p => ({ day: new Date(p.createdAt).toISOString().slice(0,10), city: cityByTrip.get(p.tripId) || null, status: p.status, method: p.method, amountUsd: Number(p.amountUsd || 0) }))
      let grouped: any[] = []
      if (groupBy === 'day') grouped = Object.values(rows.reduce((a:any,r:Row)=>{ const k=r.day; a[k]=(a[k]||{ day:r.day,count:0,amountUsd:0}); a[k].count++; a[k].amountUsd+=r.amountUsd; return a },{}))
      else if (groupBy === 'city') grouped = Object.values(rows.reduce((a:any,r:Row)=>{ const k=r.city||''; a[k]=(a[k]||{ city:r.city,count:0,amountUsd:0}); a[k].count++; a[k].amountUsd+=r.amountUsd; return a },{}))
      else if (groupBy === 'status') grouped = Object.values(rows.reduce((a:any,r:Row)=>{ const k=r.status; a[k]=(a[k]||{ status:r.status,count:0,amountUsd:0}); a[k].count++; a[k].amountUsd+=r.amountUsd; return a },{}))
      else if (groupBy === 'method') grouped = Object.values(rows.reduce((a:any,r:Row)=>{ const k=r.method; a[k]=(a[k]||{ method:r.method,count:0,amountUsd:0}); a[k].count++; a[k].amountUsd+=r.amountUsd; return a },{}))
      else if (groupBy === 'city_day') grouped = Object.values(rows.reduce((a:any,r:Row)=>{ const k=(r.city||'')+'_'+r.day; a[k]=(a[k]||{ city:r.city,day:r.day,count:0,amountUsd:0}); a[k].count++; a[k].amountUsd+=r.amountUsd; return a },{}))
      const totals: any = (grouped as any[]).reduce((t:any,g:any)=>({ count:(t.count||0)+(g.count||0), amountUsd:(t.amountUsd||0)+(g.amountUsd||0)}),{})
      if (format==='csv') {
        const keys = Object.keys(grouped[0] || { day: '', count: 0, amountUsd: 0 })
        const header = keys.join(',')
        const rowsCsv = grouped.map((g:any)=> keys.map(k=> String(g[k] ?? '')).join(',')).join('\n')
        const totalCsv = `TOTAL,,${totals.count||0},${(totals.amountUsd||0).toFixed(2)}`
        const csv = header+'\n'+rowsCsv+'\n'+totalCsv+'\n'
        reply.header('Content-Type','text/csv; charset=utf-8')
        return reply.send(csv)
      }
      return reply.send({ items: grouped, totals })
    }
  )

  // Top Drivers
  app.get('/admin/payments/top-drivers', { schema: { operationId: 'adminPaymentsTopDrivers', tags: ['payments'], summary: 'Top drivers por monto (ADMIN)', querystring: { type: 'object', properties: { limit: { type: 'integer', minimum: 1, maximum: 200, default: 50 }, from: { type: 'string', format: 'date-time' }, to: { type: 'string', format: 'date-time' }, format: { type: 'string', enum: ['json','csv'], default: 'json' } }, additionalProperties: false } }, preHandler: app.auth.requireRole('ADMIN') },
    async (req: any, reply) => {
      const { limit=50, from, to, format='json' } = req.query as any
      const where: any = { status: 'PAID' }
      if (from || to) where.createdAt = { ...(from?{ gte:new Date(from)}:{}), ...(to?{ lte:new Date(to)}:{}) }
      const pays = await prisma.payment.findMany({ where, select: { amountUsd:true, trip:{ select:{ driverId:true, driver:{ select:{ email:true, firstName:true, lastName:true } } } } } })
      const by: any = {}
      for (const p of pays) {
        const id = p.trip?.driverId || 'unknown'
        if (!by[id]) by[id] = { driverId: id, email: p.trip?.driver?.email || null, fullName: [p.trip?.driver?.firstName,p.trip?.driver?.lastName].filter(Boolean).join(' ') || null, trips: 0, amountUsd: 0 }
        by[id].trips += 1; by[id].amountUsd += Number(p.amountUsd||0)
      }
      const items = Object.values(by).sort((a:any,b:any)=> b.amountUsd - a.amountUsd).slice(0, Number(limit))
      if (format==='csv') {
        const header = 'driverId,email,fullName,trips,amountUsd\n'
        const body = (items as any[]).map(i=> [i.driverId,i.email||'',i.fullName||'',i.trips,(i.amountUsd||0).toFixed(2)].join(',')).join('\n')+'\n'
        reply.header('Content-Type','text/csv; charset=utf-8')
        return reply.send(header+body)
      }
      return reply.send({ items })
    }
  )

  // Top Riders
  app.get('/admin/payments/top-riders', { schema: { operationId: 'adminPaymentsTopRiders', tags: ['payments'], summary: 'Top riders por gasto (ADMIN)', querystring: { type: 'object', properties: { limit: { type: 'integer', minimum: 1, maximum: 200, default: 50 }, from: { type: 'string', format: 'date-time' }, to: { type: 'string', format: 'date-time' }, format: { type: 'string', enum: ['json','csv'], default: 'json' } }, additionalProperties: false } }, preHandler: app.auth.requireRole('ADMIN') },
    async (req: any, reply) => {
      const { limit=50, from, to, format='json' } = req.query as any
      const where: any = { status: 'PAID' }
      if (from || to) where.createdAt = { ...(from?{ gte:new Date(from)}:{}), ...(to?{ lte:new Date(to)}:{}) }
      const pays = await prisma.payment.findMany({ where, select: { amountUsd:true, trip:{ select:{ riderId:true, rider:{ select:{ email:true, firstName:true, lastName:true } } } } } })
      const by: any = {}
      for (const p of pays) {
        const id = p.trip?.riderId || 'unknown'
        if (!by[id]) by[id] = { riderId: id, email: p.trip?.rider?.email || null, fullName: [p.trip?.rider?.firstName,p.trip?.rider?.lastName].filter(Boolean).join(' ') || null, trips: 0, amountUsd: 0 }
        by[id].trips += 1; by[id].amountUsd += Number(p.amountUsd||0)
      }
      const items = Object.values(by).sort((a:any,b:any)=> b.amountUsd - a.amountUsd).slice(0, Number(limit))
      if (format==='csv') {
        const header = 'riderId,email,fullName,trips,amountUsd\n'
        const body = (items as any[]).map(i=> [i.riderId,i.email||'',i.fullName||'',i.trips,(i.amountUsd||0).toFixed(2)].join(',')).join('\n')+'\n'
        reply.header('Content-Type','text/csv; charset=utf-8')
        return reply.send(header+body)
      }
      return reply.send({ items })
    }
  )

  // Summary by status
  app.get('/admin/payments/summary-status', { schema: { operationId: 'adminPaymentsSummaryStatus', tags: ['payments'], summary: 'Resumen por estado (ADMIN)', querystring: { type: 'object', properties: { from: { type: 'string', format: 'date-time' }, to: { type: 'string', format: 'date-time' }, format: { type: 'string', enum: ['json','csv'], default: 'json' } }, additionalProperties: false } }, preHandler: app.auth.requireRole('ADMIN') },
    async (req: any, reply) => {
      const { from, to, format='json' } = req.query as any
      const where: any = {}
      if (from || to) where.createdAt = { ...(from?{ gte:new Date(from)}:{}), ...(to?{ lte:new Date(to)}:{}) }
      const pays = await prisma.payment.findMany({ where, select: { amountUsd:true, status:true } })
      const by: any = {}
      for (const p of pays) {
        const k = p.status
        if (!by[k]) by[k] = { status: k, count: 0, amountUsd: 0 }
        by[k].count += 1; by[k].amountUsd += Number(p.amountUsd||0)
      }
      const items = Object.values(by)
      const totals = (items as any[]).reduce((t:any,g:any)=>({ count:(t.count||0)+(g.count||0), amountUsd:(t.amountUsd||0)+(g.amountUsd||0)}),{}) as any
      if (format==='csv') {
        const header = 'status,count,amountUsd\n'
        const body = (items as any[]).map((i:any)=> [i.status,i.count,(i.amountUsd||0).toFixed(2)].join(',')).join('\n')+'\n'
        const totalCsv = `TOTAL,${(totals as any).count||0},${(((totals as any).amountUsd)||0).toFixed(2)}\n`
        reply.header('Content-Type','text/csv; charset=utf-8')
        return reply.send(header+body+totalCsv)
      }
      return reply.send({ items, totals })
    }
  )

  // Receipt by trip
  app.get('/payments/:tripId/receipt', { schema: { operationId: 'paymentsReceiptByTrip', tags: ['payments'], params: { type: 'object', properties: { tripId: { type: 'string' } }, required: ['tripId'] }, response: { 200: { type: 'object', additionalProperties: true }, 404: errorSchema } } },
    async (req: any, reply) => {
      const { tripId } = req.params as { tripId: string }
      const pay = await prisma.payment.findFirst({ where: { tripId }, orderBy: { createdAt: 'desc' } })
      const trip = await prisma.trip.findUnique({ where: { id: tripId } })
      if (!trip) return reply.code(404).send({ error: 'Trip not found' })
      const receipt = { type: (pay?.status === 'PAID' ? 'TRIP' : 'TRIP'), tripId, paymentId: pay?.id || null, status: pay?.status || null, amountUsd: pay?.amountUsd || trip.costUsd || null, method: pay?.method || null, currency: trip.currency || 'USD', createdAt: (pay?.createdAt || trip.completedAt || trip.requestedAt || new Date()).toISOString?.() || String(pay?.createdAt || trip.completedAt || trip.requestedAt || new Date()) }
      return reply.send(receipt)
    }
  )
}
