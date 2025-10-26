"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = stripeWebhookRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const stripe_service_1 = require("../../services/stripe.service");
async function stripeWebhookRoutes(app) {
    const stripe = (0, stripe_service_1.getStripe)();
    const webhookSecret = (0, stripe_service_1.getStripeWebhookSecret)();
    if (!webhookSecret) {
        app.log.warn('Stripe webhook not configured; skipping /webhooks/stripe');
        return;
    }
    // Assumes a raw-body parser is provided by a parent scope (webhooks-raw plugin)
    app.post('/stripe', { schema: { tags: ['payments'], summary: 'Stripe webhook', security: [] } }, async (req, reply) => {
        const sig = req.headers['stripe-signature'] || '';
        let event;
        try {
            const rawBody = (req.body || Buffer.from(''));
            if (!stripe) {
                // Stripe SDK not available: treat as invalid signature without processing
                return reply.code(400).send({ error: 'Invalid signature' });
            }
            event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
        }
        catch (e) {
            app.log.warn({ err: String(e), sigPresent: Boolean(sig) }, 'Stripe webhook signature verification failed');
            return reply.code(400).send({ error: 'Invalid signature' });
        }
        try {
            switch (event.type) {
                case 'payment_intent.succeeded': {
                    const intent = event.data.object;
                    const tripId = intent.metadata?.tripId;
                    if (tripId) {
                        await prisma_1.default.payment.update({ where: { tripId }, data: { status: 'PAID', externalId: intent.id } });
                    }
                    break;
                }
                case 'payment_intent.payment_failed': {
                    const intent = event.data.object;
                    const tripId = intent.metadata?.tripId;
                    if (tripId) {
                        await prisma_1.default.payment.update({ where: { tripId }, data: { status: 'FAILED', externalId: intent.id } });
                    }
                    break;
                }
                default:
                    app.log.info({ type: event.type }, 'Stripe webhook received');
                    break;
            }
        }
        catch (e) {
            app.log.error({ err: String(e) }, 'Stripe webhook handling error');
            return reply.code(500).send({ received: true });
        }
        return reply.send({ received: true });
    });
}
//# sourceMappingURL=stripe.webhook.routes.js.map