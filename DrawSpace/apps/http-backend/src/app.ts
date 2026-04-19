import express, { Express, urlencoded } from "express"
import cors , { CorsOptions } from "cors"
import cookieParser from "cookie-parser"
import { env } from "./config/env.config"
import userRoutes from "./routes/User.route"
const app: Express = express()



app.use(
    urlencoded({
    extended:true,
    limit:'16kb'
})
)

app.use(express.json({
    limit:"18kb"
}))

app.use(cors({
    origin: env.origin,  // change this to the fe url 
    methods:['OPTIONS','DELETE','PATCH','GET','POST','PUT'],
    credentials:true,
    allowedHeaders:['content-type','Authorization']
}))


app.use(cookieParser())

app.use("/api/v1/users",userRoutes)
export default app
