import express from "express"
import  { WebSocketServer } from "ws";
import cors from "cors";

const app=express();
const httpServer=app.listen(8080);


const wss = new WebSocketServer({server:httpServer});


// this connections map conatins all the merchants connections!
const connections = new Map();
interface Message {
    to:number,
    notify:string
}

app.use(express.json());
app.use(cors());
app.post("/",(req,res)=>{
    const message:Message=req.body;

    console.log(message.to);
    
    const ws=connections.get(Number(message.to));
    if(ws){
        ws.send(JSON.stringify(message.notify))
        return res.json({message:"Req send Successfully"});
    }
    console.log("Reciver is down right now!");
    return ;
})

wss.on("connection",function connection(ws,req:any){
    ws.on("error",console.error);

    
    const userId = req.url.split('?')[1].split('=')[1];
    console.log(userId);
    
    if(!userId) return;

    // add userId to connections Map
    connections.set(Number(userId), ws);

    ws.on('message',function message(data:any){
        console.log(data.toString());
    })
    ws.send("Connected to port 8080! PayWay")
})