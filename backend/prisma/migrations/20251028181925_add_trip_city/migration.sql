-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "city" TEXT;

-- CreateIndex
CREATE INDEX "Trip_city_idx" ON "Trip"("city");
