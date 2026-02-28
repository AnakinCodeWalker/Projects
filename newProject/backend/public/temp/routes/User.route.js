import { Router } from "express";

import {
     signupController,
    signinController,
    logoutUser
 } from "../controllers/user.controllers.js";

 import authMiddleware from "../middlewares/authMiddleware.js"


 const userRouter = Router()

userRouter.route("/signup").post(signupController)
userRouter.route("/signin").post(signinController)
userRouter.route("/logout").post(authMiddleware,logoutUser)


export default userRouter