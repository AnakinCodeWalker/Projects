import express, { urlencoded }  from "express";
import cors from "cors"
import { CorsOptions } from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config()

const app =express();

app.use(express.json())

 const ORIGIN = process.env.ORIGIN

//  you have to use the CorsOptions here...
 const corsOptions : CorsOptions={      
    origin: ORIGIN?ORIGIN: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['content-Type', 'Authorization'],
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

export {app}

// origin: process.env.ORIGIN ?? "http://localhost:3000"
// --> only works if the value is null or undefined..