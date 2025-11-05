-- Indices to support admin trips queries
CREATE INDEX IF NOT EXISTS "Trip_city_requestedAt_idx" ON "Trip" ("city", "requestedAt" DESC);
CREATE INDEX IF NOT EXISTS "Trip_status_requestedAt_idx" ON "Trip" ("status", "requestedAt" DESC);

