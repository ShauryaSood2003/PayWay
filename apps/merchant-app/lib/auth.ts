import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID  || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            allowDangerousEmailAccountLinking: true,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callback: {
        async session({ session,token }: any) {
            session.user.id = token.sub;
            return session;
        }
    },
    pages: {
        signIn: "/signin"
    }
};
