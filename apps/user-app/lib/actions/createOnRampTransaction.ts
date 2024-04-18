"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { PrismaClient } from "@repo/db/client";


export async function createOnRampTransaction(provider:string,amount:number){
    const session = await getServerSession(authOptions);
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    const token = (Math.random() * 1000).toString();
    const client=new PrismaClient();

    await client.onRampTransaction.create({
        data:{
            provider,
            status: "Processing",
            startTime: new Date(),
            token: token,
            userId: Number(session?.user?.id),
            amount: amount * 100
        }
    });
  
    return {
        message: "Done"
    }
}