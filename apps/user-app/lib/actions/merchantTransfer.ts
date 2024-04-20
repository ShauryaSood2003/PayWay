"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function merchantTransaction(to:string,amount:number){
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
        return {
            message: "Error while sending"
        }
    }
    const toUser = await prisma.merchant.findFirst({
        where: {
            id:Number(to)
        }
    });

    if (!toUser) {
        return {
            message: "User not found"
        }
    }
    await prisma.$transaction(async (tx) => {
        
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        await tx.$queryRaw`SELECT * FROM "BalanceMerchant" WHERE "merchanId" = ${Number(toUser.id)} FOR UPDATE`;

        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) },
          });
          if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds');
          }

          await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
          });
          
          await tx.balanceMerchant.update({
            where: { merchanId: toUser.id },
            data: { amount: { increment: amount } },
          });
          
          await tx.merchantTranactions.create({
            data:{
                fromId:Number(from),
                toUserId:toUser.id,
                timestamp:new Date(),
                amount
            }
          })
    });
}