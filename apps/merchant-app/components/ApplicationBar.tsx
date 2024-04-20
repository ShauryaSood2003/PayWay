"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { AppBar } from "@repo/ui/appbar";

import { useRouter } from "next/navigation";
export function ApplicationBar() {
  const session = useSession();
  const route=useRouter();
  if(!session.data){
    route.push("/signin")
  }
  return (
   <div>
      <AppBar onSignin={signIn} onSignout={async () => {
        await signOut();
      }} user={session.data?.user} />
   </div>
  );
}
