/*
  Warnings:

  - You are about to drop the column `merchanId` on the `Balance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Balance" DROP CONSTRAINT "Balance_merchanId_fkey";

-- DropIndex
DROP INDEX "Balance_merchanId_key";

-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "merchanId";

-- CreateTable
CREATE TABLE "BalanceMerchant" (
    "id" SERIAL NOT NULL,
    "merchanId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "locked" INTEGER NOT NULL,

    CONSTRAINT "BalanceMerchant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BalanceMerchant_merchanId_key" ON "BalanceMerchant"("merchanId");

-- AddForeignKey
ALTER TABLE "BalanceMerchant" ADD CONSTRAINT "BalanceMerchant_merchanId_fkey" FOREIGN KEY ("merchanId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
