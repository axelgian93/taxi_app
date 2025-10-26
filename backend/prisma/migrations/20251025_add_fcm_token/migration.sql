-- Prisma Migration: add fcmToken to User
-- Applies to PostgreSQL

ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "fcmToken" TEXT;

