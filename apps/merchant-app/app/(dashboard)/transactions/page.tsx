"use client"
import { getTransactions } from "../../../lib/actions/getTransactions";
import { Transactions } from "../../../components/Transactions";
import { useEffect, useState } from "react";
import useWebhook from "../../../lib/hooks/Webhooks";
import { useSession } from "next-auth/react";


export default function (){
    const [trsx,setTrsx]=useState(null);

    const session:any=useSession();
    const userId=session.data?.user?.id;
    
    const ws=useWebhook(`ws://localhost:8080?userId=${userId}`);

    // for first trsx get call 
    useEffect(()=>{
        async function callMe() {
            const tsx:any=(await getTransactions()).reverse();
            setTrsx(tsx);
        }
        callMe()
    },[]);

    // This add a event listner to the ws to listen to every incoming messages!
    useEffect(()=>{
        if(ws){
            const handleIncomingMessage = async(event:any) => {
                const receivedMessage = event.data;
                console.log("Received:", receivedMessage);
                const tsx:any=(await getTransactions()).reverse();
                setTrsx(tsx);
            };

            ws.addEventListener("message", handleIncomingMessage);
  
            return () => {
            // Cleanup: remove event listener when component unmounts
            ws.removeEventListener("message", handleIncomingMessage);
            };
        }
        
    },[ws]);

    if(!trsx){
        return <div>Loaddder....</div>
    }
    return(
        <div className="w-full m-5 md:m-10">
            <Transactions transactions={trsx}></Transactions>
        </div>
    )
}