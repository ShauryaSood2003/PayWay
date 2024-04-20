import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth";
import prisma from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
async function getUser() {
  const session = await getServerSession(authOptions);
  return session;
}
async function getBalance() {
  const session = await getServerSession(authOptions);
  if(!session){
    return {
      amount:  0,
      locked: 0
    }
  }
  const balance = await prisma.balanceMerchant.findFirst({
    where: {
        merchanId: Number(session?.user?.id)
    }
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0
  }
}
export default async function Home() {
  const session = await getUser();
  const balance=await getBalance();
  console.log("Sesseion: new "+JSON.stringify(session));
  
  return (
    <div className="flex justify-center w-full">
      <div className=" w-[90%] md:w-[50%] mt-10">
        <BalanceCard amount={balance.amount} locked={balance.locked}></BalanceCard>
      </div>
    </div>
  );
}