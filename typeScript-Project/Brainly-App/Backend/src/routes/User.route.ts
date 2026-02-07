import { Router } from "express";
// import { userMiddleware } from "../middlewares/user.middleare.js";
import {signup, userVerification,signin,resetPassword,signout} from  "../controllers/user.controller.js"

import { createContent ,getContent ,deleteContent } from "../controllers/course.controller.js";

import  {authMiddleware}  from  "../middlewares/user.middleare.js"
import { share, shareLink } from "../controllers/brain.controller.js";

const userRoutes = Router()
const courseRoutes =Router()
const brainRoutes=Router()


userRoutes.post("/signup",signup)
userRoutes.post("/verify",userVerification)
userRoutes.post("/signin",authMiddleware,signin)
userRoutes.post("/resetPassword",authMiddleware,resetPassword)
userRoutes.post("/signout", authMiddleware,signout)


courseRoutes.post("/create-content",authMiddleware,createContent)
courseRoutes.get("/get-content",authMiddleware ,getContent)
courseRoutes.delete("/delete-content",authMiddleware ,deleteContent)


brainRoutes.post("/share",authMiddleware,share)
brainRoutes.get("/:shareLink",shareLink) // anyone can come and see so no , authmiddleware here.

export {
    userRoutes ,
    courseRoutes,
    brainRoutes
}