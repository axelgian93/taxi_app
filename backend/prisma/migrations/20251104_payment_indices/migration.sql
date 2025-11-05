-- Indices to speed up admin payments queries
CREATE INDEX IF NOT EXISTS "Payment_createdAt_idx" ON "Payment" ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS "Payment_status_createdAt_idx" ON "Payment" ("status", "createdAt" DESC);
CREATE INDEX IF NOT EXISTS "Payment_method_createdAt_idx" ON "Payment" ("method", "createdAt" DESC);

