import { Hono } from "hono";
import userRouter from "../src/routes/User.routes.js"
import blogRouter from "../src/routes/Blog.routes.js"
const app = new Hono()

app.route("/api/v1/user",userRouter)
app.route("/api/v1/blog",blogRouter)

