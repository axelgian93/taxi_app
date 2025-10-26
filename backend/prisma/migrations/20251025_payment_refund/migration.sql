CREATE TABLE IF NOT EXISTS "PaymentRefund" (
  "id" TEXT PRIMARY KEY,
  "paymentId" TEXT NOT NULL,
  "tripId" TEXT NOT NULL,
  "amountUsd" DECIMAL(10,2) NOT NULL,
  "reason" TEXT,
  "provider" TEXT,
  "externalId" TEXT,
  "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT fk_refund_payment FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE,
  CONSTRAINT fk_refund_trip FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS "idx_refund_payment" ON "PaymentRefund"("paymentId");
CREATE INDEX IF NOT EXISTS "idx_refund_trip_created" ON "PaymentRefund"("tripId", "createdAt" DESC);

