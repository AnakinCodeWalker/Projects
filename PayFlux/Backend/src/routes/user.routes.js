import { Router } from "express";
import { signin, signup,refreshTokenController,changePassword, logout } from "../controllers/user.controller.js";
import userAuthMiddlware from "../middlewares/userAuth.middleware.js"
const router = Router()

router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/refresh-token").post(refreshTokenController)
router.route("/changePassword").post(userAuthMiddlware,changePassword)
router.route("/logout").post(userAuthMiddlware,logout)
export default router