import express, { urlencoded }  from "express";
import cors , { CorsOptions } from "cors";
import cookieParser from "cookie-parser";

import dotenv from "dotenv"
import { env } from "./config/env.js";
dotenv.config()


const app =express();

app.use(express.json())

 const ORIGIN = env.ORIGIN

//  you have to use the CorsOptions here...
 const corsOptions : CorsOptions={      
    origin: ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

export {app}
