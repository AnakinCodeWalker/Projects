import { Router } from "express";
import {
     signupController,
    signinController,
    logoutUser
 } from "../controllers/user.controllers.js";

const userRouter = Router()

userRouter.route("/signup").post(signupController)
userRouter.route("/signin").post(signinController)
userRouter.route("/logout").post(logoutUser)


export default userRouter