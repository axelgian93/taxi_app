CREATE TABLE IF NOT EXISTS "LoginAttempt" (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL,
  success BOOLEAN NOT NULL,
  ip TEXT,
  "userAgent" TEXT,
  reason TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "LoginAttempt_createdAt_idx" ON "LoginAttempt" ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS "LoginAttempt_email_createdAt_idx" ON "LoginAttempt" (email, "createdAt" DESC);

