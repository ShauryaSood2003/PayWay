
import { SendCard } from "../../../components/SendCard";
import { MerchantTransactions } from "../../../components/MerchantTransaction";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";

async function getTrans() {
    const session=await getServerSession(authOptions);
    const trsx=await prisma.merchantTranactions.findMany({
        where:{
            fromId:Number(session?.user?.id)
        }
    })
    return trsx.map((t)=>({ 
        amount:t.amount,
        time:t.timestamp,
        toUserId:t.toUserId,
        currentUser:session?.user?.id
    }));
    
}


export default async function Home(){
   const trsx=await getTrans();
   const session=await getServerSession(authOptions);
    return(
        <div className=" m-[3%]">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Merchant Transfer
            </div>
            <div className="flex justify-center items-center w-full">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-8 p-4">
                    <div className="lg:col-span-3">
                        <SendCard identity="Receiver Id" userId={session?.user?.id}></SendCard>
                    </div>
                    <div className="lg:col-span-5">
                        <MerchantTransactions transactions={trsx.reverse()} ></MerchantTransactions>
                    </div>
                </div>
            </div>
        </div>
    )
}