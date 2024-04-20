"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../lib/actions/p2pTransfer";
import { merchantTransaction } from "../lib/actions/merchantTransfer";

export function SendCard({identity}:{identity:string}) {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");

    return <div className="lg:h-[90vh]">
       
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={identity} label={identity} onChange={(value) => {
                        setNumber(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async() => {
                            if(identity==="Number"){
                                await p2pTransfer(number, Number(amount) * 100)
                            }else{
                                await merchantTransaction(number,Number(amount)*100);
                            }
                        }}>Send</Button>
                    </div>
                </div>
            </Card>
       
    </div>
}