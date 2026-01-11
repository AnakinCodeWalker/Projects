import { Router } from "express";
import  {registerUserController,  verifyUserController,userLoginController , userLogOutController, resetPasswordController } from "../controllers/registerUser.Controller.js";
import userMiddleware from "../middleware/User.middleware.js"
const router =Router()

// work if there is only one verb on the route.

router.post("/registerUser",registerUserController)
router.get("/verify/:token",verifyUserController)  // this  token can be accessed from the req.params
router.post("/login",userLoginController)
router.post("/reset" ,userMiddleware,resetPasswordController)
router.post("/logout" ,userMiddleware,userLogOutController)

export default  router 