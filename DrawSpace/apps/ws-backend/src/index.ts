
import jwt, { JwtPayload } from "jsonwebtoken";
import { WebSocketServer, WebSocket } from "ws";
import { env } from "./config/env.config";

// in future use a map to iterate on the ws 

const wss = new WebSocketServer({ port: 8080 })

interface User {
    ws: WebSocket
    rooms: string[]
    userId: string
}

const users: User[] = []

function checkUser(token: string): null | string {

    //the result should be jwtpayload after u verify 
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET_KEY) as JwtPayload

        if (!decoded || !decoded.userId)
            return null

        return decoded.userId
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            return null
        }else
            return null
    }
}

wss.on('connection', (ws, request) => {

    const url = request.url

    if (!url)
        return

    // extracting the token from the params 
    const queryParams = new URLSearchParams(url.split('?')[1])

    const token = queryParams.get("token")




    if (!token) {

        console.log(`token is needed in ws backend`);
        return
    }

    const userId = checkUser(token)

    if (!userId) {
        ws.close()
        return
    }

    users.push({
        userId,
        rooms: [],
        ws
    })

    ws.on("message", (data) => {
        // lets  u convert string object into normal js  object  
        const parsedData = JSON.parse(data as unknown as string)

        if (parsedData.type == "join_room") {
            const currentUser = users.find(x => x.ws === ws)  // find the user in the global user array
            currentUser?.rooms.push(parsedData.roomId) // push the id into user room  room  [ roomid ]
        }

        if (parsedData.type == "leave_room") {
            const currentUser = users.find((x) => x.ws === ws)

            if (currentUser)
                currentUser.rooms = currentUser.rooms.filter((room) => room !== parsedData.roomId)

        }

        if (parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const message = parsedData.message

            users.forEach(user => {
                if (user.rooms.includes(roomId)) {

                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            });
        }

     
    })
})