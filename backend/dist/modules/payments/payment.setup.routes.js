"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = paymentSetupRoutes;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const stripe_service_1 = require("../../services/stripe.service");
async function paymentSetupRoutes(app) {
    const stripe = (0, stripe_service_1.getStripe)();
    const { makeKey, withRetry, reqOpts } = require('../../services/stripe.idempotency');
    if (!stripe) {
        app.log.warn('Stripe not configured; skipping setup-intent routes');
        return;
    }
    // Create SetupIntent to save a card on file
    app.post('/payments/setup-intent', { schema: { tags: ['payments'], summary: 'Crear SetupIntent', description: 'Rider crea un SetupIntent para guardar una tarjeta. Devuelve client_secret.', response: { 200: { type: 'object', properties: { clientSecret: { type: 'string' } } }, 400: { type: 'object', properties: { error: { type: 'string' } } }, 404: { type: 'object', properties: { error: { type: 'string' } } } } }, preHandler: app.auth.verifyJWT }, async (req, reply) => {
        const userId = req.user?.id;
        const user = await prisma_1.default.user.findUnique({ where: { id: userId }, select: { email: true, stripeCustomerId: true } });
        if (!user)
            return reply.code(404).send({ error: 'User not found' });
        let customerId = user.stripeCustomerId;
        if (!customerId) {
            const customer = await withRetry(() => stripe.customers.create({ email: user.email }, reqOpts(makeKey(['cust_create', userId]))));
            customerId = customer.id;
            await prisma_1.default.user.update({ where: { id: userId }, data: { stripeCustomerId: customerId } });
        }
        const setup = await withRetry(() => stripe.setupIntents.create({ customer: customerId, usage: 'off_session', payment_method_types: ['card'] }, reqOpts(makeKey(['setup_intent', userId]))));
        return reply.send({ clientSecret: setup.client_secret });
    });
    // Set default payment method for customer
    app.post('/payments/set-default', { schema: { tags: ['payments'], summary: 'Definir PM por defecto', description: 'Guarda el paymentMethod como predeterminado en Stripe y DB.', body: { type: 'object', required: ['paymentMethodId'], properties: { paymentMethodId: { type: 'string', example: 'pm_123' } } }, response: { 200: { type: 'object', properties: { ok: { type: 'boolean' } } }, 400: { type: 'object', properties: { error: { type: 'string' } } } } }, preHandler: app.auth.verifyJWT }, async (req, reply) => {
        const userId = req.user?.id;
        const { paymentMethodId } = req.body;
        const u = await prisma_1.default.user.findUnique({ where: { id: userId }, select: { stripeCustomerId: true } });
        const custId = u?.stripeCustomerId;
        if (!custId)
            return reply.code(400).send({ error: 'No Stripe customer' });
        await withRetry(() => stripe.customers.update(custId, { invoice_settings: { default_payment_method: paymentMethodId } }, reqOpts(makeKey(['cust_set_default_pm', userId, paymentMethodId]))));
        await prisma_1.default.user.update({ where: { id: userId }, data: { stripeDefaultPaymentMethodId: paymentMethodId } });
        return reply.send({ ok: true });
    });
}
//# sourceMappingURL=payment.setup.routes.js.map