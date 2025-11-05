-- Add device/session columns to RefreshToken
ALTER TABLE "RefreshToken" ADD COLUMN IF NOT EXISTS "deviceId" TEXT;
ALTER TABLE "RefreshToken" ADD COLUMN IF NOT EXISTS "deviceName" TEXT;
ALTER TABLE "RefreshToken" ADD COLUMN IF NOT EXISTS "userAgent" TEXT;
ALTER TABLE "RefreshToken" ADD COLUMN IF NOT EXISTS "ip" TEXT;
ALTER TABLE "RefreshToken" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW();
ALTER TABLE "RefreshToken" ADD COLUMN IF NOT EXISTS "lastUsedAt" TIMESTAMPTZ;
-- revokedAt may already exist; ensure column
ALTER TABLE "RefreshToken" ADD COLUMN IF NOT EXISTS "revokedAt" TIMESTAMPTZ;

-- Helpful indices
CREATE INDEX IF NOT EXISTS "RefreshToken_user_active_idx" ON "RefreshToken" ("userId") WHERE "revokedAt" IS NULL;
CREATE INDEX IF NOT EXISTS "RefreshToken_device_active_idx" ON "RefreshToken" ("deviceId") WHERE "revokedAt" IS NULL;
CREATE INDEX IF NOT EXISTS "RefreshToken_created_idx" ON "RefreshToken" ("createdAt" DESC);

