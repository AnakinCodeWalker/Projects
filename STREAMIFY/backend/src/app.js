import express from "express"
import cors from "cors"
import path, { dirname } from "path"

const app = express()
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/User.route.js"
import chatRoutes from "./routes/Chat.routes.js"

import errorMiddleware from "./middlewares/errorMiddleware.js"
import cookieParser from "cookie-parser"
// import helmet from "helmet"
import env from "./config/env.config.js"
// app.use(express.static("public")) // in case u want to files data in server.


const __dirname = path.resolve()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


app.use(cors({
   origin: ["http://localhost:5173" ] ,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.static("public"))

// to access cookie and token which will stored in here.
// you can now access them into the req and res 
app.use(cookieParser())
// app.use(helmet())
// http://localhost:3000/auth/v1/signup
// http://localhost:3000/api/v1/auth

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/users",userRoutes)
app.use("/api/v1/chat",chatRoutes)

app.use(errorMiddleware)

if(env.NODE_ENV="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
}

 app.use((req,res)=>{
res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
 })
export default app