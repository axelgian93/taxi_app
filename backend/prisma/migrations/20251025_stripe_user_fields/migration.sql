ALTER TABLE "User"
  ADD COLUMN IF NOT EXISTS "stripeCustomerId" TEXT,
  ADD COLUMN IF NOT EXISTS "stripeDefaultPaymentMethodId" TEXT;

