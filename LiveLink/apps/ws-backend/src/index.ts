import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 })
wss.on("connection", (ws) => {


    ws.send("you are connected to server")

    ws.on("message", (message) => {
        console.log("received from client", message.toString());
        ws.send(`You said: ${message}`);
    })

    ws.on("close",()=>{
        console.log("disconnected from client")
    })



})