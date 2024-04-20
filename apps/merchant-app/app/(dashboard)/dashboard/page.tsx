import { getServerSession } from "next-auth"
import { authOptions } from "../../../lib/auth";
async function getUser() {
  const session = await getServerSession(authOptions);
  return session;
}

export default async function Home() {
  const session = await getUser();
  console.log("Sesseion: "+session);
  
  return (
    <div>
      {JSON.stringify(session?.user?.name)}
    </div>
  );
}