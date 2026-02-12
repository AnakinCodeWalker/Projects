import express, { urlencoded } from "express";
import env from "./config/env.config.js";
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";

import cors from "cors"

import { CorsOptions } from "cors";
const app = express()

app.use(express.static("public"))
app.use(express.json({
    limit:"18kb"
}))
app.use(cookieParser())

app.use(urlencoded({
    extended: true,
    limit:"18kb"
}))

const corsOptions: CorsOptions = {
    origin: env.ORIGIN,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: "Authorization , Content-Type",
    credentials: true,
}

app.use(cors(corsOptions))

app.use("/api/v1/users",userRouter)
app.use("/api/v1/blog",blogRouter)

export default app


// when verbal import is on jo v js mai nhi hota hai usko import krte time u have to put import type {} from " "
