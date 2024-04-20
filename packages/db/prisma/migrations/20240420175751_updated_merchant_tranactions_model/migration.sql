/*
  Warnings:

  - Added the required column `amount` to the `MerchantTranactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timestamp` to the `MerchantTranactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MerchantTranactions" ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL;
