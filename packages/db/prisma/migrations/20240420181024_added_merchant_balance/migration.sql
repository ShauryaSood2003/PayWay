/*
  Warnings:

  - A unique constraint covering the columns `[merchanId]` on the table `Balance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `merchanId` to the `Balance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Balance" ADD COLUMN     "merchanId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Balance_merchanId_key" ON "Balance"("merchanId");

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_merchanId_fkey" FOREIGN KEY ("merchanId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
