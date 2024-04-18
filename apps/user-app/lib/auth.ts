import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { PrismaClient } from "@repo/db/client";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name:"Number",
            credentials:{
                phone: { label: "Phone number", type: "text", placeholder: "" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any){
                const db=new PrismaClient();
                const hashedPassword=await bcrypt.hash(credentials.password,10);
                const existUser=await db.user.findFirst({
                    where:{
                        number:credentials.phone
                    }
                });
                if(existUser){
                    const check=await bcrypt.compare(credentials.password,existUser.password);
                    if(check){
                        return {
                            id: existUser.id.toString(),
                            name: existUser.name,
                            email: existUser.number
                        }
                    }
                    return null;
                }
                try{
                    const user=await db.user.create({
                        data:{
                            number:credentials.phone,
                            password:hashedPassword
                        }
                    });
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }
                }catch(e){
                    console.error(e);
                }
                return null;
            }
        }),
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
}