import { Router } from "express";
import {signupController, signinController , logoutController } from "../controllers/user.controller";
import { userAuthMiddleware } from "../middlewares/userAuth.middleware";
const router = Router()

router.post("/signup",signupController)
router.post("/signin", userAuthMiddleware,signinController)
router.post("/logut",userAuthMiddleware,logoutController)

export default router