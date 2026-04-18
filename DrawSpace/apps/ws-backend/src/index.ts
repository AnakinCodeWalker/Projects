//  move this into a constants file and extract it on both the backends 

import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocketServer } from "ws";
import { env } from "./config/env.config";

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', (ws, request) => {

    const url = request.url

    if (!url)
        return
    // extracting the token from the params 
    const queryParams = new URLSearchParams(url.split('?')[1])

    const token = queryParams.get("token")

    const JWT_SECRET_KEY = env.JWT_SECRET_KEY


    if (!token) {

        console.log(`token is needed in ws backend`);
        return
    }

//     the result should be jwtpayload after u verify 
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload

   

    if (!decoded || !decoded.userId) {
        ws.close()
        return
    }
    ws.on("message", () => {
        ws.send("hi")
    })
})