import {WebSocketServer,WebSocket} from "ws"

// WebSocketServer -- to create server
// WebSocket -- type of socket

interface User{
        id: number,
        connectedAt: Date
}

interface CustomWebSocket extends WebSocket{
    user?: User|null
}
let count :number = 0

const port = 3000
const webSocket = new WebSocketServer({port})
console.log(`server started listening on ${port}`);

webSocket.on("connection",(socket:CustomWebSocket)=>{


    // clients contain all connected WebSocket clients

    webSocket.clients.forEach((client) => {
    
        // Kya ye client abhi connected + ready hai
        if (client.readyState === WebSocket.OPEN) {
        client.send("hi");
      }
    });

socket.user  = null;
console.log(`socket connected`);
count+=1;
console.log(`socket number ${count}`);

    
socket.on("message",(data)=>{
const msg =  JSON.parse(data.toString());

if(msg.type ==="USER_CONNECTED"){
    socket.user ={
        id: msg.userId,
        connectedAt: new Date(),
    }
}
    console.log(msg);
    // console.log(socket.user);
   
socket.send("hello from server")
})


socket.on("error",(error)=>{
    console.log("webSokcet error ",error);
})
socket.on("close",()=>{
    console.log(`connection closed`);
})
})

/* client stages ..
0 → CONNECTING
1 → OPEN
2 → CLOSING
3 → CLOSED

*/