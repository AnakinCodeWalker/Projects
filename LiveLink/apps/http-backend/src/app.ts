import  express, { urlencoded }  from "express";

import cors , { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";

const app = express()


const corsOptions:CorsOptions ={
    origin:env.ORIGIN,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods:["GET","PUT","POST","PATCH","DELETE","OPTIONS"],
    credentials:true,
}

app.use(express.json({
    limit:"24kb"
}))

app.use(urlencoded({
    extended:true
}))

app.use(cors(corsOptions))

app.use(cookieParser())

export {app}