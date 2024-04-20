import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";
import prisma from "@repo/db/client";

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID  || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        jwt: async ({ user, token }: any) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
            },
      session: async({ session, token, user }: any) => {
          if (session.user) {
              session.user.id = token.uid
          }
          let existsUser=await prisma.merchant.findFirst({
            where:{
                email:session.user.email
            }
          })
          if(!existsUser){
                existsUser=await prisma.merchant.create({
                    data:{
                        name:session.user.name,
                        email:session.user.email,
                        auth_type:"Google"
                    }
                }) 
                await prisma.balanceMerchant.create({
                    data:{
                        merchanId:Number(existsUser.id),
                        amount:0,
                        locked:0
                    }
                })
        }
        session.user.id=existsUser?.id
          return session
      }
    },
    pages: {
        signIn: "/signin"
    }
};
