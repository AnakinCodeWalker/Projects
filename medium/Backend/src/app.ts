import express, { urlencoded } from "express";
import env from "./config/env.config.js";
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.routes.js";
import blogRouter from "./routes/blog.routes.js";

import cors from "cors"

import { CorsOptions } from "cors";
import helmet from "helmet";
import {errorHandler} from "./middleware/error.middleware.js";
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

// protects from browserbased attacks.
// like  xss clickjacking

app.use(helmet())

const corsOptions: CorsOptions = {
    origin: env.ORIGIN,
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: "Authorization , Content-Type",
    credentials: true,
}

app.use(cors(corsOptions))

app.use("/api/v1/users",userRouter)
app.use("/api/v1/blog",blogRouter)

app.use(errorHandler)
export default app


// when verbal import is on jo v js mai nhi hota hai usko import krte time u have to put import type {} from " "


/*
Client Request
      ↓
app.ts
      ↓
cors middleware
      ↓
blogRouter
      ↓
authMiddleware
      ↓
createBlog (asyncHandler)
      ↓
   SUCCESS ? ───────► res.json() → Client
      │
      └── ERROR
             ↓
        asyncHandler  -- error forward krta hai
             ↓
         next(error)
             ↓
        errorHandler (global)  -- error client ko bhejta hai .
             ↓
         JSON error → Client
*/

//  if we dont have errorHandler then it will go to default express handle it will handle all the things
// Express 5 me  — async error automatically global handler tak jata hai.
// api response -- direct express response 