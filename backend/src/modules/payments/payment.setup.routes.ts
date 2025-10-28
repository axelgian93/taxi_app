// src/modules/payments/payment.setup.routes.ts
import type { FastifyInstance } from 'fastify'
import prisma from '../../lib/prisma'
import { getStripe } from '../../services/stripe.service'

export default async function paymentSetupRoutes(app: FastifyInstance) {
  const stripe = getStripe()
  const { makeKey, withRetry, reqOpts } = require('../../services/stripe.idempotency')
  if (!stripe) {
    app.log.warn('Stripe not configured; skipping setup-intent routes')
    return
  }

  // Create SetupIntent to save a card on file
  app.post(
    '/payments/setup-intent',
    { schema: { operationId: 'paymentsCreateSetupIntent', tags: ['payments'], summary: 'Crear SetupIntent', description: 'Rider crea un SetupIntent para guardar una tarjeta. Devuelve client_secret.', response: { 200: { type: 'object', properties: { clientSecret: { type: 'string' } } }, 400: { type: 'object', properties: { error: { type: 'string' } } }, 404: { type: 'object', properties: { error: { type: 'string' } } } } }, preHandler: app.auth.verifyJWT },
    async (req: any, reply) => {
      const userId = req.user?.id as string
      const user = await prisma.user.findUnique({ where: { id: userId }, select: { email: true, stripeCustomerId: true } as any })
      if (!user) return reply.code(404).send({ error: 'User not found' })
      let customerId = (user as any).stripeCustomerId as string | undefined
      if (!customerId) {
        const customer = await withRetry(() => stripe.customers.create(
          { email: (user as any).email },
          reqOpts(makeKey(['cust_create', userId]))
        ))
        customerId = customer.id
        await prisma.user.update({ where: { id: userId }, data: { stripeCustomerId: customerId } as any })
      }
      const setup = await withRetry(() => stripe.setupIntents.create(
        { customer: customerId, usage: 'off_session', payment_method_types: ['card'] },
        reqOpts(makeKey(['setup_intent', userId]))
      ))
      return reply.send({ clientSecret: setup.client_secret })
    }
  )

  // Set default payment method for customer
  app.post(
    '/payments/set-default',
    { schema: { operationId: 'paymentsSetDefaultMethod', tags: ['payments'], summary: 'Definir PM por defecto', description: 'Guarda el paymentMethod como predeterminado en Stripe y DB.', body: { type: 'object', required: ['paymentMethodId'], properties: { paymentMethodId: { type: 'string', example: 'pm_123' } } }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } }, 400: { type: 'object', properties: { error: { type: 'string' } } } } }, preHandler: app.auth.verifyJWT },
    async (req: any, reply) => {
      const userId = req.user?.id as string
      const { paymentMethodId } = req.body as { paymentMethodId: string }
      const u = await prisma.user.findUnique({ where: { id: userId }, select: { stripeCustomerId: true } as any })
      const custId = (u as any)?.stripeCustomerId as string | undefined
      if (!custId) return reply.code(400).send({ error: 'No Stripe customer' })
      await withRetry(() => stripe.customers.update(
        custId,
        { invoice_settings: { default_payment_method: paymentMethodId } },
        reqOpts(makeKey(['cust_set_default_pm', userId, paymentMethodId]))
      ))
      await prisma.user.update({ where: { id: userId }, data: { stripeDefaultPaymentMethodId: paymentMethodId } as any })
      return reply.send({ ok: true })
    }
  )
}
