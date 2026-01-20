import { Router } from "express";
// import { userMiddleware } from "../middlewares/user.middleare.js";
import {signup, userVerification,signin} from  "../controllers/user.controller.js"
const userRoutes = Router()

userRoutes.post("/signup",signup)
userRoutes.post("/verify",userVerification)
userRoutes.post("/signin",signin)

export {userRoutes}