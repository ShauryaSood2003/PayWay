"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

export async function getTransactions() {
    const session=await getServerSession(authOptions);
    const transaction=await prisma.merchantTranactions.findMany({
        where:{
            toUserId:Number(session?.user?.id)
        }
    });
    return transaction.map((t) => ({
        time: t.timestamp,
        amount: t.amount,
        status: "Done",
        provider: t.fromId.toString()
    }));
    
}
