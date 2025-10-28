// src/plugins/operation-ids.ts
import fp from 'fastify-plugin'

export default fp(async (app) => {
  const map: Array<{ method?: string; url: string; op: string }> = [
    { method: 'GET', url: '/trips/:id/sse', op: 'tripsSseById' },
    { method: 'POST', url: '/trips/request', op: 'tripsRequest' },
    { method: 'GET', url: '/trips/:id', op: 'tripsGetById' },
    { method: 'POST', url: '/trips/:id/accept', op: 'tripsAccept' },
    { method: 'POST', url: '/trips/:id/arrived', op: 'tripsArrived' },
    { method: 'POST', url: '/trips/:id/start', op: 'tripsStart' },
    { method: 'POST', url: '/trips/:id/complete', op: 'tripsComplete' },
    { method: 'POST', url: '/trips/:id/cancel', op: 'tripsCancel' },
    { method: 'POST', url: '/trips/:id/driver-cancel', op: 'tripsDriverCancel' },
    { method: 'GET', url: '/payments', op: 'paymentsList' },
    { method: 'POST', url: '/payments/:tripId/capture', op: 'paymentsCaptureByTrip' },
    { method: 'POST', url: '/payments/:tripId/refund', op: 'paymentsRefundByTrip' },
    { method: 'GET', url: '/payments/:tripId', op: 'paymentsGetByTrip' },
    { method: 'GET', url: '/payments/:tripId/refunds', op: 'paymentsRefundsByTrip' },
    { method: 'GET', url: '/admin/refunds', op: 'adminRefundsList' },
  ]

  app.addHook('onRoute', (route) => {
    const found = map.find(m => m.url === route.url && (!m.method || m.method.toUpperCase() === String(route.method).toUpperCase()))
    if (found) {
      route.schema = route.schema || {}
      // @ts-ignore add operationId if not present
      if (!(route.schema as any).operationId) {
        ;(route.schema as any).operationId = found.op
      }
    }
  })
})

