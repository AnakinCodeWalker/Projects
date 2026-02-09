import { Hono } from "hono";
import { signin,signup,logout } from "../controllers/User.controller.js";
const userRouter = new  Hono()

userRouter.post("/singup",signup)
userRouter.post("/singin",signin)
userRouter.post("/logout",logout)


export default userRouter