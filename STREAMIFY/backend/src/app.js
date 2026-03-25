import express from "express"
import cors from "cors"
const app = express()
import env from "./config/env.config.js"
import authRoutes from "./routes/auth.route.js"
import userRoutes from "./routes/User.route.js"
import errorMiddleware from "./middlewares/errorMiddleware.js"
import cookieParser from "cookie-parser"
import helmet from "helmet"
// app.use(express.static("public")) // in case u want to files data in server.

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


app.use(cors({
   origin: "http://localhost:5173", 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.static("public"))

// to access cookie and token which will stored in here.
// you can now access them into the req and res 
app.use(cookieParser())
app.use(helmet())
// http://localhost:3000/auth/v1/signup
// http://localhost:3000/api/v1/auth

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/user",userRoutes)

app.use(errorMiddleware)
export default app