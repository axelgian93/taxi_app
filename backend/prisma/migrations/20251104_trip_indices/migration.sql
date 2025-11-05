-- Trip indices for pagination and filters
CREATE INDEX IF NOT EXISTS "Trip_requestedAt_idx" ON "Trip" ("requestedAt" DESC);
CREATE INDEX IF NOT EXISTS "Trip_rider_requestedAt_idx" ON "Trip" ("riderId", "requestedAt" DESC);
CREATE INDEX IF NOT EXISTS "Trip_driver_requestedAt_idx" ON "Trip" ("driverId", "requestedAt" DESC);

