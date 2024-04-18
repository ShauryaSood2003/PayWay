import { getServerSession } from "next-auth";
import { P2PTransaction } from "../../../components/P2PTransaction";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../../lib/auth";
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
export default async function(){
    const trsx=await getP2PTransactions();
    return(
        <div className=" m-[3%]">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                P2P Transfer
            </div>
            <div className="flex justify-center items-center w-full">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-8 p-4">
                    <div className="lg:col-span-3">
                        <SendCard></SendCard>
                    </div>
                    <div className="lg:col-span-5">
                        <P2PTransaction transactions={trsx}></P2PTransaction>
                    </div>
                </div>
            </div>
        </div>
        
        
    );
}