"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { AppBar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export default function ApplicationBar(){
    const session=useSession();
    const router=useRouter();
    return(
        <AppBar user={session?.data?.user} onSignin={signIn} onSignout={async () => {
            console.log("Sign oUT");
            
            await signOut()
            router.push("/api/auth/signin")
        }}></AppBar>
    )
}