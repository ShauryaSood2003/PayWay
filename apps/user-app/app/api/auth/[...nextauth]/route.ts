import NextAuth from "next-auth/next";
import { authOptions } from "../../../../lib/auth";

const handle=NextAuth(authOptions);

export {handle as GET,handle as POST}