import express, { urlencoded } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()

app.use(express.json())
app.use(urlencoded({
    extended: true
}))

app.use(cors({
    origin: process.env.ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['content-Type', 'Authorization'],
    credentials: true
}))

app.use(express.static("public"))
app.use(cookieParser())


export { app }