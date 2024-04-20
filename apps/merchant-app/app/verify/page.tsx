import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { redirect } from "next/navigation";

export default async function Home(){
    const session=await getServerSession(authOptions);
    if(!session){
        redirect('/signin')
    }
    const email=session.user?.email;
    if(!email){
        console.log("No emailId fount!");
        redirect("/verify/addEmail");
    }else{
        const user=await prisma.merchant.create({
            data:{
                name:session.user.name,
                email,
                auth_type:"Google",
            }
        })
    }
    redirect("/dashboard");
}