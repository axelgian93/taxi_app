"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStripe = getStripe;
exports.hasStripe = hasStripe;
exports.getStripeWebhookSecret = getStripeWebhookSecret;
// src/services/stripe.service.ts
const env_1 = require("../config/env");
let stripe = null;
function getStripe() {
    if (stripe !== null)
        return stripe;
    const key = env_1.env.stripeSecretKey;
    if (!key)
        return (stripe = null);
    try {
        const Stripe = require('stripe');
        stripe = new Stripe(key, { apiVersion: '2024-06-20' });
    }
    catch {
        stripe = null;
    }
    return stripe;
}
function hasStripe() {
    return !!getStripe();
}
function getStripeWebhookSecret() {
    return env_1.env.stripeWebhookSecret || null;
}
//# sourceMappingURL=stripe.service.js.map