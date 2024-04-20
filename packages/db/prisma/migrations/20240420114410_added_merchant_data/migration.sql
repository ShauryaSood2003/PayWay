-- CreateTable
CREATE TABLE "MerchantTranactions" (
    "id" SERIAL NOT NULL,
    "fromId" INTEGER NOT NULL,
    "toUserId" INTEGER NOT NULL,

    CONSTRAINT "MerchantTranactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MerchantTranactions" ADD CONSTRAINT "MerchantTranactions_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MerchantTranactions" ADD CONSTRAINT "MerchantTranactions_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "Merchant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
