import express, { urlencoded } from 'express'
import cors from 'cors'
import env from "../public/temp/config/env.config.js"
import cookieParser from 'cookie-parser'
import userRouter from "../public/temp/routes/User.route.js"
import helmet from 'helmet'

const app = express()
app.use(express.static("public")) // in case u want to files data in server.
app.use(express.json())
app.use(urlencoded({
    extended: true
}))

app.use(cors({
    origin: env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['content-Type', 'Authorization'],
    credentials: true
}))

app.use(express.static("public"))

// to access cookie and token which will stored in here.
// you can now access them into the req and res 
app.use(cookieParser())
app.use(helmet())
app.use("/api/v1/users", userRouter)


export default app 