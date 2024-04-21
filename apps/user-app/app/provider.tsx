"use client"
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

export function Provider({children}:{children:React.ReactNode}){
    return(
        <RecoilRoot>
            <SessionProvider>
                {children}
            </SessionProvider>
        </RecoilRoot>
    )
}