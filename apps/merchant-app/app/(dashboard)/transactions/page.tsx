import { getServerSession } from "next-auth";
import { Transactions } from "../../../components/Transactions";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";

async function getTransactions() {
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

export default async function (){
    const tsx=await getTransactions();
    return(
        <div className="w-full m-5 md:m-10">
            <Transactions transactions={tsx}></Transactions>
        </div>
    )
}