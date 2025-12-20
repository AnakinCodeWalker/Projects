import express from "express";

//to get cookies
import cookieParser from "cookie-parser";

import cors from 'cors'
import dotenv from "dotenv";
dotenv.config()

const BASE_URL=process.env.BASE_URL

const app = express()

app.use(express.json({
    limit:"18kb"
}))

//to handle form data 
app.use(
    express.urlencoded({
    extended:true,
    limit:'16kb'
})
)

app.use(cors({
    origin:BASE_URL,
    methods:['OPTIONS','DELETE','PATCH','GET','POST','PUT'],
    credentials:true,
    allowedHeaders:['content-type','Authorization']
}))

app.use(cookieParser())

//  Makes Express serve static files (HTML, CSS, JS, images) from the "public" folder automatically.
app.use(express.static("public"))

export {app}