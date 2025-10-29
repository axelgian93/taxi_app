// src/modules/payments/stripe.webhook.routes.ts
import type { FastifyInstance } from 'fastify'

import prisma from '../../lib/prisma'
import { getStripe, getStripeWebhookSecret } from '../../services/stripe.service'

export default async function stripeWebhookRoutes(app: FastifyInstance) {
  const stripe = getStripe()
  const webhookSecret = getStripeWebhookSecret()
  if (!webhookSecret) {
    app.log.warn('Stripe webhook not configured; skipping /webhooks/stripe')
    return
  }

  // Assumes a raw-body parser is provided by a parent scope (webhooks-raw plugin)
  app.post('/stripe', { schema: { operationId: 'webhooksStripe', tags: ['payments'], summary: 'Stripe webhook', security: [] } }, async (req, reply) => {
      const sig = (req.headers['stripe-signature'] as string) || ''
      let event: any
      try {
        const rawBody = (req.body || Buffer.from('')) as Buffer
        if (!stripe) {
          // Stripe SDK not available: treat as invalid signature without processing
          return reply.code(400).send({ error: 'Invalid signature' })
        }
        event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
      } catch (e: any) {
        app.log.warn({ err: String(e), sigPresent: Boolean(sig) }, 'Stripe webhook signature verification failed')
        return reply.code(400).send({ error: 'Invalid signature' })
      }

      try {
        switch (event.type) {
          case 'payment_intent.succeeded': {
            const intent = event.data.object
            const tripId = intent.metadata?.tripId as string | undefined
            if (tripId) {
              await prisma.payment.update({ where: { tripId }, data: { status: 'PAID', externalId: intent.id } })
            }
            break
          }
          case 'payment_intent.payment_failed': {
            const intent = event.data.object
            const tripId = intent.metadata?.tripId as string | undefined
            if (tripId) {
              await prisma.payment.update({ where: { tripId }, data: { status: 'FAILED', externalId: intent.id } })
            }
            break
          }
        default:
          app.log.info({ type: event.type }, 'Stripe webhook received')
          break
      }
    } catch (e) {
      app.log.error({ err: String(e) }, 'Stripe webhook handling error')
      return reply.code(500).send({ received: true })
    }

      return reply.send({ received: true })
    })
}
