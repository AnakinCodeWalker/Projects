import { Hono } from "hono";
import { post ,changePost ,getPost,bulk } from "../controllers/Blog.controller.js"
const blogRouter =new Hono()

blogRouter.post("/post",post)
.put("/post",changePost)
.get("/post/:id",getPost)
.get("/bulk",bulk)

export default blogRouter