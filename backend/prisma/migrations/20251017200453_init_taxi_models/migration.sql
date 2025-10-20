/*
  Warnings:

  - The values [PICKING_UP,ON_TRIP] on the enum `TripStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `city` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `destLat` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `destLng` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `fareBase` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `fareConfigId` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `fareMinApplied` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `fareNightPct` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `farePerKm` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `farePerMin` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `fareSubtotal` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `fareSurcharge` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `fareTotal` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `fareTotalCents` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `fareWeekendPct` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `originLat` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `originLng` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `active` on the `Vehicle` table. All the data in the column will be lost.
  - You are about to drop the `Driver` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `FareConfig` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rider` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dropoffLat` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dropoffLng` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLat` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupLng` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Made the column `driverId` on table `Vehicle` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "DriverStatus" AS ENUM ('OFFLINE', 'IDLE', 'ON_TRIP', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'AUTHORIZED', 'PAID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('SEDAN', 'SUV', 'VAN', 'MOTORCYCLE', 'TRUCK');

-- AlterEnum
BEGIN;
CREATE TYPE "TripStatus_new" AS ENUM ('REQUESTED', 'ASSIGNED', 'ACCEPTED', 'ARRIVED', 'STARTED', 'COMPLETED', 'CANCELED');
ALTER TABLE "taxi_app"."Trip" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Trip" ALTER COLUMN "status" TYPE "TripStatus_new" USING ("status"::text::"TripStatus_new");
ALTER TYPE "TripStatus" RENAME TO "TripStatus_old";
ALTER TYPE "TripStatus_new" RENAME TO "TripStatus";
DROP TYPE "taxi_app"."TripStatus_old";
ALTER TABLE "Trip" ALTER COLUMN "status" SET DEFAULT 'REQUESTED';
COMMIT;

-- DropForeignKey
ALTER TABLE "taxi_app"."Driver" DROP CONSTRAINT "Driver_userId_fkey";

-- DropForeignKey
ALTER TABLE "taxi_app"."Rider" DROP CONSTRAINT "Rider_userId_fkey";

-- DropForeignKey
ALTER TABLE "taxi_app"."Trip" DROP CONSTRAINT "Trip_driverId_fkey";

-- DropForeignKey
ALTER TABLE "taxi_app"."Trip" DROP CONSTRAINT "Trip_riderId_fkey";

-- DropForeignKey
ALTER TABLE "taxi_app"."Vehicle" DROP CONSTRAINT "Vehicle_driverId_fkey";

-- DropIndex
DROP INDEX "taxi_app"."Trip_city_requestedAt_idx";

-- DropIndex
DROP INDEX "taxi_app"."Trip_driverId_requestedAt_idx";

-- DropIndex
DROP INDEX "taxi_app"."Trip_riderId_requestedAt_idx";

-- DropIndex
DROP INDEX "taxi_app"."Vehicle_plate_idx";

-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "city",
DROP COLUMN "destLat",
DROP COLUMN "destLng",
DROP COLUMN "fareBase",
DROP COLUMN "fareConfigId",
DROP COLUMN "fareMinApplied",
DROP COLUMN "fareNightPct",
DROP COLUMN "farePerKm",
DROP COLUMN "farePerMin",
DROP COLUMN "fareSubtotal",
DROP COLUMN "fareSurcharge",
DROP COLUMN "fareTotal",
DROP COLUMN "fareTotalCents",
DROP COLUMN "fareWeekendPct",
DROP COLUMN "originLat",
DROP COLUMN "originLng",
ADD COLUMN     "arrivedAt" TIMESTAMP(3),
ADD COLUMN     "assignedAt" TIMESTAMP(3),
ADD COLUMN     "costUsd" DECIMAL(10,2),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dropoffAddress" TEXT,
ADD COLUMN     "dropoffLat" DECIMAL(9,6) NOT NULL,
ADD COLUMN     "dropoffLng" DECIMAL(9,6) NOT NULL,
ADD COLUMN     "pickupAddress" TEXT,
ADD COLUMN     "pickupLat" DECIMAL(9,6) NOT NULL,
ADD COLUMN     "pickupLng" DECIMAL(9,6) NOT NULL,
ADD COLUMN     "pricingSnapshot" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "distanceKm" SET DATA TYPE DECIMAL(10,3);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fullName",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" DROP COLUMN "active",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "seats" INTEGER NOT NULL DEFAULT 4,
ADD COLUMN     "type" "VehicleType" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "driverId" SET NOT NULL;

-- DropTable
DROP TABLE "taxi_app"."Driver";

-- DropTable
DROP TABLE "taxi_app"."FareConfig";

-- DropTable
DROP TABLE "taxi_app"."Rider";

-- CreateTable
CREATE TABLE "RiderProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "defaultPaymentMethodId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RiderProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "licenseExpiresAt" TIMESTAMP(3),
    "status" "DriverStatus" NOT NULL DEFAULT 'OFFLINE',
    "currentLat" DECIMAL(9,6),
    "currentLng" DECIMAL(9,6),
    "locationUpdatedAt" TIMESTAMP(3),
    "rating" DECIMAL(3,2),
    "totalTrips" INTEGER NOT NULL DEFAULT 0,
    "documents" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriverProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "amountUsd" DECIMAL(10,2) NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "method" TEXT NOT NULL,
    "provider" TEXT,
    "externalId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TariffRule" (
    "id" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "baseFareUsd" DECIMAL(10,2) NOT NULL,
    "perKmUsd" DECIMAL(10,2) NOT NULL,
    "perMinUsd" DECIMAL(10,2) NOT NULL,
    "minFareUsd" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "nightMultiplier" DECIMAL(4,2) NOT NULL DEFAULT 1.00,
    "weekendMultiplier" DECIMAL(4,2) NOT NULL DEFAULT 1.00,
    "surgeMultiplier" DECIMAL(4,2) NOT NULL DEFAULT 1.00,
    "nightStartHour" INTEGER,
    "nightEndHour" INTEGER,
    "validFrom" TIMESTAMP(3),
    "validTo" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TariffRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DriverLocationHistory" (
    "id" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "lat" DECIMAL(9,6) NOT NULL,
    "lng" DECIMAL(9,6) NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DriverLocationHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RiderProfile_userId_key" ON "RiderProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DriverProfile_userId_key" ON "DriverProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DriverProfile_licenseNumber_key" ON "DriverProfile"("licenseNumber");

-- CreateIndex
CREATE INDEX "DriverProfile_status_idx" ON "DriverProfile"("status");

-- CreateIndex
CREATE INDEX "DriverProfile_locationUpdatedAt_idx" ON "DriverProfile"("locationUpdatedAt");

-- CreateIndex
CREATE INDEX "DriverProfile_currentLat_currentLng_idx" ON "DriverProfile"("currentLat", "currentLng");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_tripId_key" ON "Payment"("tripId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "TariffRule_city_active_idx" ON "TariffRule"("city", "active");

-- CreateIndex
CREATE INDEX "DriverLocationHistory_driverId_recordedAt_idx" ON "DriverLocationHistory"("driverId", "recordedAt" DESC);

-- CreateIndex
CREATE INDEX "Trip_driverId_idx" ON "Trip"("driverId");

-- CreateIndex
CREATE INDEX "Trip_riderId_idx" ON "Trip"("riderId");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_isActive_idx" ON "User"("isActive");

-- AddForeignKey
ALTER TABLE "RiderProfile" ADD CONSTRAINT "RiderProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverProfile" ADD CONSTRAINT "DriverProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "DriverProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_riderId_fkey" FOREIGN KEY ("riderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DriverLocationHistory" ADD CONSTRAINT "DriverLocationHistory_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "DriverProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
