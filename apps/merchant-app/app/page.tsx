"use client"

import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);
  
  return (
    <div>
      {JSON.stringify(session.data?.user)}
    </div>
  );
}
