CREATE TABLE IF NOT EXISTS "TariffAudit" (
  id BIGSERIAL PRIMARY KEY,
  adminUserId TEXT,
  action TEXT NOT NULL,
  "tariffRuleId" TEXT,
  before JSONB,
  after JSONB,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "TariffAudit_createdAt_idx" ON "TariffAudit" ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS "TariffAudit_tariff_idx" ON "TariffAudit" ("tariffRuleId");

CREATE TABLE IF NOT EXISTS "UserRoleAudit" (
  id BIGSERIAL PRIMARY KEY,
  adminUserId TEXT,
  targetUserId TEXT NOT NULL,
  beforeRole TEXT,
  afterRole TEXT,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "UserRoleAudit_createdAt_idx" ON "UserRoleAudit" ("createdAt" DESC);
CREATE INDEX IF NOT EXISTS "UserRoleAudit_target_idx" ON "UserRoleAudit" ("targetUserId");

