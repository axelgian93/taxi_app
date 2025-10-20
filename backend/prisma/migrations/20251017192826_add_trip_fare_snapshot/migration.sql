/*
  Warnings:

  - You are about to drop the column `fareAmountCents` on the `Trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "fareAmountCents",
ADD COLUMN     "cancelReason" TEXT,
ADD COLUMN     "canceledAt" TIMESTAMP(3),
ADD COLUMN     "city" TEXT,
ADD COLUMN     "fareBase" DECIMAL(8,2),
ADD COLUMN     "fareConfigId" TEXT,
ADD COLUMN     "fareMinApplied" BOOLEAN,
ADD COLUMN     "fareNightPct" INTEGER,
ADD COLUMN     "farePerKm" DECIMAL(8,2),
ADD COLUMN     "farePerMin" DECIMAL(8,2),
ADD COLUMN     "fareSubtotal" DECIMAL(8,2),
ADD COLUMN     "fareSurcharge" DECIMAL(8,2),
ADD COLUMN     "fareTotal" DECIMAL(8,2),
ADD COLUMN     "fareTotalCents" INTEGER,
ADD COLUMN     "fareWeekendPct" INTEGER;

-- CreateIndex
CREATE INDEX "Driver_isAvailable_idx" ON "Driver"("isAvailable");

-- CreateIndex
CREATE INDEX "FareConfig_city_active_activeFrom_idx" ON "FareConfig"("city", "active", "activeFrom");

-- CreateIndex
CREATE INDEX "Trip_status_requestedAt_idx" ON "Trip"("status", "requestedAt");

-- CreateIndex
CREATE INDEX "Trip_driverId_requestedAt_idx" ON "Trip"("driverId", "requestedAt");

-- CreateIndex
CREATE INDEX "Trip_riderId_requestedAt_idx" ON "Trip"("riderId", "requestedAt");

-- CreateIndex
CREATE INDEX "Trip_city_requestedAt_idx" ON "Trip"("city", "requestedAt");

-- CreateIndex
CREATE INDEX "Vehicle_plate_idx" ON "Vehicle"("plate");
