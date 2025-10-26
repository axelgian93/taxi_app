ALTER TABLE "TariffRule"
  ADD COLUMN IF NOT EXISTS "cancellationGraceSec" INTEGER,
  ADD COLUMN IF NOT EXISTS "cancellationFeeAcceptedUsd" DECIMAL(10,2),
  ADD COLUMN IF NOT EXISTS "cancellationFeeArrivedUsd" DECIMAL(10,2);
