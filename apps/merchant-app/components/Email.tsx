"use client"

import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import prisma from "@repo/db/client";

export default function Email() {
  const [value, setValue] = useState("");
  const session = useSession();
  const router = useRouter();

  async function handleClick() {
    const updatedUserData = { ...session.data?.user, email: value };
    await signIn('credentials', { user: updatedUserData });

    await prisma.merchant.create({
      data: {
        name: session.data?.user?.name,
        email: session.data?.user?.email || "",
        auth_type: "Github",
      }
    });

    router.push("/dashboard");
  }

  return (
    <div>
      <div>
        <label>Email Id</label>
        <input onChange={(e) => { setValue(e.target.value) }} placeholder="abc@xyz.com" type="email"></input>
        <button onClick={handleClick}>Submit</button>
      </div>
    </div>
  );
}
