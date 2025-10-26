Stripe Payments (Test Mode)

Overview
- Server integrates with Stripe to create PaymentIntents when a trip is completed with method=CARD.
- Two flows:
  1) Server-confirmed: provide `paymentMethodId` in the complete call, backend confirms immediately.
  2) Client-confirmed: backend returns `clientSecret` and the client confirms via SDK.
- Webhook `/webhooks/stripe` updates Payment status on events.

Resiliency
- Idempotency keys: all critical Stripe calls (create/confirm/capture/refund/cancel, setup intents, customers) include a deterministic idempotency key based on tripId/userId and operation.
- Retry: transient errors (rate limit / connection) are retried once on the server.

Environment
- STRIPE_SECRET_KEY=sk_test_...
- STRIPE_WEBHOOK_SECRET=whsec_...

Endpoints
- POST `/trips/:id/complete` (DRIVER)
  - Body:
    - `{ method: 'CARD', paymentMethodId?: string }`
    - `{ method: 'CASH' }` or `{ method: 'TRANSFER' }`
  - Response includes `clientSecret` when a PaymentIntent is created without confirmation.
- POST `/webhooks/stripe` (public)
  - Configure your Stripe CLI or Dashboard to send events.
- GET `/payments/:tripId/receipt`
  - Returns a simple receipt for the payment associated to the trip.
  - `{ tripId, amountUsd, currency, method, status, provider, type, paidAt }` where `type` is `TRIP` or `CANCELLATION_FEE`.

Cancellation & Fees
- Endpoints:
  - Rider cancel: `POST /trips/:id/cancel` body `{ reason?: string }`.
  - Driver cancel: `POST /trips/:id/driver-cancel` body `{ reason?: string }`.
- Fees (server-side):
  - If status is `ARRIVED` → fee `cancellationFeeArrivedUsd`.
  - If status is `ACCEPTED` and grace exceeded → fee `cancellationFeeAcceptedUsd`.
  - Otherwise → no fee.
- City overrides via TariffRule:
  - `cancellationGraceSec`, `cancellationFeeAcceptedUsd`, `cancellationFeeArrivedUsd` when `TariffRule.active = true` for the trip city (read from `Trip.pricingSnapshot.city`).
  - Fallback to env when not present.
- Stripe charge:
  - If rider has `stripeCustomerId` + `stripeDefaultPaymentMethodId`, server creates+confirma un PaymentIntent (idempotente) por el fee.
  - El recibo reporta `type = CANCELLATION_FEE`.

Examples
```
POST /trips/trp_123/cancel
{
  "reason": "CHANGED_MIND"
}

GET /payments/trp_123/receipt
{
  "tripId": "trp_123",
  "amountUsd": 2.0,
  "currency": "USD",
  "method": "CARD",
  "status": "PAID",
  "provider": "Stripe",
  "type": "CANCELLATION_FEE",
  "paidAt": "2025-01-01T12:00:00.000Z"
}
```

Stripe CLI (local testing)
```
stripe listen --forward-to http://localhost:8080/webhooks/stripe
```

Confirmations
- Test payment methods: use `pm_card_visa` (always succeeds) or other test PMs.
- Client confirmation example (pseudo):
  - Flutter: `await stripe.confirmPayment(clientSecret, PaymentMethodParams.card())`

Data Model
- Payment row created on complete:
  - status: AUTHORIZED (or PAID for CASH)
  - method: 'CARD' | 'CASH' | 'TRANSFER'
  - provider: 'Stripe' if CARD
  - externalId: Stripe PaymentIntent id, when available
- Webhook transitions status -> PAID or FAILED.

Security
- Keep webhook endpoint public but verify signature with `STRIPE_WEBHOOK_SECRET`.
- Do not log full webhook body with PII.
