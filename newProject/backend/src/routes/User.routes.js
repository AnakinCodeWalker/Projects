import { Router } from "express";
import {
   sendOtp,   
   signupController,
   signinController,
   refreshAccessToken,
   changePassword,
   resetpasswordToken,
   resetpassword,
   logoutUser
} from "../controllers/Auth.controllers.js";

import authMiddleware from "../middlewares/authMiddleware.js"


const userRouter = Router()

console.log({
  sendOtp,
  signupController,
  signinController,
  refreshAccessToken
})

userRouter.route("/sendOtp").post(sendOtp)
userRouter.route("/signup").post(signupController)
userRouter.route("/signin").post(signinController)

userRouter.route("/refreshAccessToken").post(refreshAccessToken)

userRouter.route("/changePassword").post(authMiddleware,changePassword)
userRouter.route("/resetPassword").post(resetpasswordToken)
userRouter.route("/confirmResetPassword").post(resetpassword)

userRouter.route("/logout").post(authMiddleware, logoutUser)



export default userRouter