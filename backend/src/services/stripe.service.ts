// src/services/stripe.service.ts
import { env } from '../config/env'

type StripeType = any
let stripe: StripeType | null = null

export function getStripe(): StripeType | null {
  if (stripe !== null) return stripe
  const key = env.stripeSecretKey
  if (!key) return (stripe = null)
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Stripe = require('stripe')
    stripe = new Stripe(key, { apiVersion: '2024-06-20' })
  } catch {
    stripe = null
  }
  return stripe
}

export function hasStripe(): boolean {
  return !!getStripe()
}

export function getStripeWebhookSecret(): string | null {
  return env.stripeWebhookSecret || null
}

