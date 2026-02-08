import cookieParser from "cookie-parser"
import express, { urlencoded } from "express"
import env from "./config/env.js"
import cors from "cors"
import balanceRouter from "./routes/balance.routes.js"
import userRouter from "./routes/user.routes.js"
const app = express()

app.use(express.json({
    limit: "24kb"
}))

app.use(cookieParser())
app.use(urlencoded({
    extended: true
}))
app.use(express.static("public"))
app.use(cors({
    origin: env.ORIGIN,
    methods: env.METHODS,
    credentials: env.credentials,
    allowedHeaders: env.allowedHeaders

}))

app.use("/api/v1/users", userRouter)

app.use("/api/v1/account", balanceRouter)

export default app