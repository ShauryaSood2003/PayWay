"use client"
import { signIn, useSession } from "next-auth/react";
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { redirect } from "next/navigation";

export default function(){
    
    const session=useSession();

    if(session.data){
        redirect("/dashboard");
    }
    return(
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center bg-slate-800 space-y-5 rounded-md p-10">
                <h1 className="text-4xl font-bold text-center text-white">Sign In</h1><hr></hr>
                <button className="rounded-md py-4 px-10  text-black bg-white" onClick={
                    async() => {
                        await signIn('google');
                    }
                    }><GoogleIcon style={{fontSize:"20px",marginRight:10}}/>  Sign in with Google</button>
                <button className="rounded-md py-4 px-10 text-white bg-slate-600" onClick={
                    async() => {
                        await signIn('github');
                    }
                    }><GitHubIcon style={{fontSize:"20px",marginRight:10}}/> Sign in with GitHub</button>
            </div>
        </div>
    )
}