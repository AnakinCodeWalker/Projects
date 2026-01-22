import { Router } from "express";
// import { userMiddleware } from "../middlewares/user.middleare.js";
import {signup, userVerification,signin,signout} from  "../controllers/user.controller.js"

import { createContent ,getContent } from "../controllers/course.controller.js";

import  {authMiddleware}  from  "../middlewares/user.middleare.js"
const userRoutes = Router()
const courseRoutes =Router()

userRoutes.post("/signup",signup)
userRoutes.post("/verify",userVerification)
userRoutes.post("/signin",signin)
userRoutes.post("/signout",signout)


courseRoutes.post("/create-content",authMiddleware,createContent)
courseRoutes.get("/get-content",authMiddleware ,getContent)

export {userRoutes ,courseRoutes}