// import { getServerSession } from "next-auth";

// import { authOptions } from "../../../lib/auth";
// import prisma from "@repo/db/client";

// async function getTranaction(){
//     const session=await getServerSession(authOptions);
//     if(!session?.user){
//         throw new Error("User is not authenticated");
//     }
//     const merchant=await prisma.merchant.findFirst({
//         where:{
//             id:Number(session?.user?.name)
//         }
//     })
// }
export default function (){

    return(
        
        <h1>Trans</h1>
    )
}