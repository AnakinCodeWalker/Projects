//  move this into a constants file and extract it on both the backends 

import jwt, { JwtPayload }  from "jsonwebtoken";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (ws,request) => {

    const url = request.url

    if(!url)
        return
// extracting the token from the params 
    const queryParams = new URLSearchParams(url.split('?')[1])
    
    const token = queryParams.get("token") 
    
    const JWT_SECRET_KEY = "randomtoken"
    
    
    if(!token){

        console.log(`token is needed in ws backend`);
         return 
    }

    const decoded = jwt.verify(token,JWT_SECRET_KEY)
  
  if(!decoded || !(decoded as JwtPayload).userId){
    ws.close()
    return
  }
    ws.on("message", () => {
        ws.send("hi")
    })
})