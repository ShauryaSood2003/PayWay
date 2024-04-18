import express from "express";
import prisma from "@repo/db/client";
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/hdfcWebhook",async(req,res)=>{
    const paymentInformation={
        token:req.body.token,
        userId: req.body.userId,
        amount: req.body.amount
    }
    console.log(paymentInformation);
    
    try{
        const client=prisma;
        await client.$transaction([
            client.balance.updateMany({
                where:{
                    userId: Number(paymentInformation.userId)
                },
                data:{
                    amount:{
                        increment:Number(paymentInformation.amount)
                    }
                }
            }),
            client.onRampTransaction.updateMany({
                where:{
                    token:paymentInformation.token
                },
                data:{
                    status:"Success"
                }
            })
        ]);
        res.status(200).json({
            message: "Captured"
        })
    }catch(e){
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(3003);