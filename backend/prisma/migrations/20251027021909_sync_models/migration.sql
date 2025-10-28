/*
  Warnings:

  - You are about to drop the column `defaultPaymentMethodId` on the `RiderProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "taxi_app"."PaymentRefund" DROP CONSTRAINT "fk_refund_payment";

-- DropForeignKey
ALTER TABLE "taxi_app"."PaymentRefund" DROP CONSTRAINT "fk_refund_trip";

-- AlterTable
ALTER TABLE "PaymentRefund" ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "RiderProfile" DROP COLUMN "defaultPaymentMethodId";

-- AddForeignKey
ALTER TABLE "PaymentRefund" ADD CONSTRAINT "PaymentRefund_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentRefund" ADD CONSTRAINT "PaymentRefund_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "idx_refund_payment" RENAME TO "PaymentRefund_paymentId_idx";

-- RenameIndex
ALTER INDEX "idx_refund_trip_created" RENAME TO "PaymentRefund_tripId_createdAt_idx";
