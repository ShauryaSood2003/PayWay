import { OnRampTransactions } from "./OnRampTransaction";
import { P2PTransaction } from "./P2PTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import prisma from "@repo/db/client";

async function getP2PTransactions() {
    const session=await getServerSession(authOptions);
  
    const transactions=await prisma.p2pTransfer.findMany({
        where:{
            OR:[
                {fromUserId:Number(session?.user?.id)},
                {toUserId:Number(session?.user?.id)}
            ]
        }
    })
    return transactions.map(t => ({
        amount: t.amount,
        timestamp: t.timestamp,
        fromUserId: t.fromUserId,
        toUserId: t.toUserId,
        currentUser:Number(session?.user?.id)
    })).reverse();
    
}
async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    })).reverse()
}
export default async function Transactions(){
    const trsxP2p=await getP2PTransactions();
    const trsxOnRamp=await getOnRampTransactions();
    return(
        <div className="md:grid grid-cols-2 w-full gap-4 mr-2 md:mr-4">
            <OnRampTransactions transactions={trsxOnRamp}></OnRampTransactions>
            <P2PTransaction transactions={trsxP2p}></P2PTransaction>
        </div>
    )
}