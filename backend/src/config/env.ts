import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT || 8080),
  nodeEnv: process.env.NODE_ENV || 'development',
  dbUrl: process.env.DATABASE_URL ?? '',
  jwtSecret: process.env.JWT_SECRET || 'changeme-supersecret',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || '',
  // If false, disables CARD even if Stripe is present
  paymentsEnableCard: (process.env.PAYMENTS_ENABLE_CARD || 'true').toLowerCase() !== 'false',
  metricsPublic: (process.env.METRICS_PUBLIC || '').toLowerCase() === 'true',
  metricsToken: process.env.METRICS_TOKEN || '',
  acceptTimeoutSec: Number(process.env.ACCEPT_TIMEOUT_SEC || 120),
  arriveTimeoutSec: Number(process.env.ARRIVE_TIMEOUT_SEC || 300),
  reassignMaxTries: Number(process.env.REASSIGN_MAX_TRIES || 1),
  cancellationFeeAcceptedUsd: Number(process.env.CANCELLATION_FEE_USD_ACCEPTED || 1.0),
  cancellationFeeArrivedUsd: Number(process.env.CANCELLATION_FEE_USD_ARRIVED || 2.0),
  cancellationFeeGraceSec: Number(process.env.CANCELLATION_FEE_GRACE_SEC || 120),
};
