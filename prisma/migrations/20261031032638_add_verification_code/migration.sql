ALTER TABLE "order" ADD COLUMN "verificationCode" TEXT;

UPDATE "order"
SET "verificationCode" = 'TEMP-' || "id";

ALTER TABLE "order" ALTER COLUMN "verificationCode" SET NOT NULL;
