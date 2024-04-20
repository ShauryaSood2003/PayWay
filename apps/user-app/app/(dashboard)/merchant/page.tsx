import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";
import { MerchantTransactions } from "../../../components/MerchantTransaction";
async function getTrans() {
    const session=await getServerSession(authOptions);
    const trsx=await prisma.merchantTranactions.findMany({
        where:{
            fromId:Number(session?.user?.id)
        }
    })
    return trsx.map((t)=>({
        time:t.timestamp,
        amount:t.amount,
        id:t.toUserId.toString()
    }));
    
}
export default async function Home(){
    const trsx=await getTrans();
    return(
        <div className=" m-[3%]">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Merchant Transfer
            </div>
            <div className="flex justify-center items-center w-full">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-8 p-4">
                    <div className="lg:col-span-3">
                        <SendCard identity="Receiver Id"></SendCard>
                    </div>
                    <div className="lg:col-span-5">
                        <MerchantTransactions transactions={trsx}></MerchantTransactions>
                    </div>
                </div>
            </div>
        </div>
    )
}