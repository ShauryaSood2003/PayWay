import { Button } from "./button";

interface AppBarProps {
    user?:{
        name?:string|null
    },
    onSignin:any ,
    onSignout:any
}

export const AppBar=({user,onSignin,onSignout}:AppBarProps)=>{
    return(
        <div className="flex justify-between border-b px-4">
            <div className="text-lg flex flex-col justify-center">
                PayTM
            </div>
            <div className="flex flex-col justify-center pt-2">
                <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    )
}