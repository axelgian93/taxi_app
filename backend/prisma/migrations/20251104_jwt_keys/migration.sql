CREATE TABLE IF NOT EXISTS "JwtKey" (
  kid TEXT PRIMARY KEY,
  secret TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Ensure only one active key
CREATE UNIQUE INDEX IF NOT EXISTS "JwtKey_active_unique" ON "JwtKey" (active) WHERE active = true;

