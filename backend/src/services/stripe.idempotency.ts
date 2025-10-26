// src/services/stripe.idempotency.ts
import type Stripe from 'stripe'

export function makeKey(parts: Array<string | number | undefined | null>): string {
  return parts.filter(Boolean).join(':')
}

export async function withRetry<T>(fn: () => Promise<T>): Promise<T> {
  try {
    return await fn()
  } catch (e: any) {
    const code = e?.type || e?.code || ''
    const retryable = [
      'RateLimitError',
      'APIConnectionError',
      'StripeConnectionError',
      'TimeoutError',
      'api_connection_error',
      'rate_limit'
    ]
    if (retryable.includes(code)) {
      await new Promise(r => setTimeout(r, 300))
      return await fn()
    }
    throw e
  }
}

export function reqOpts(idempotencyKey: string): Stripe.RequestOptions {
  return { idempotencyKey }
}

