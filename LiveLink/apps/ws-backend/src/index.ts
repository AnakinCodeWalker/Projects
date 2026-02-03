import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 })
// as websocker start from http , they have access to request object
wss.on("connection", (ws ,request) => {
const url = request.url; // contains path and query string

if(!url){
    // in normal case the url will be present always 
  ws.close(1011, "Invalid request");
    return 

}

//    "token=abc123&roomId=42&mode=edit"   internally is trh ho jyega yeh ...
const queryParam = new URLSearchParams(url.split('?')[1])

const token = queryParam.get('token')  // it will search for token and return it.
                 // if room if v hota usme 
                   //    const roomId = queryParam.get("roomId");  // "42"
if(!token){
  ws.close(1008,"Token missing")
    return 
}

    ws.send("you are connected to server")

    ws.on("message", (message) => {
        console.log("received from client", message.toString());
        ws.send(`You said: ${message}`);
    })

    ws.on("close",()=>{
        console.log("disconnected from client")
    })



})

//  ? -> extra infromation

//  /: -> params necessary information