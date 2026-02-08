import { Router } from "express";
import { signin, signup,refreshTokenController, updateDetails ,searchUsers ,changePassword, logout } from "../controllers/user.controller.js";
import userAuthMiddlware from "../middlewares/userAuth.middleware.js"
const router = Router()

router.route("/signup").post(signup)
router.route("/signin").post(signin)

router.route("/refresh-token").post(refreshTokenController)

router.route("/update-details").patch(userAuthMiddlware,updateDetails)
router.route("/change-password").patch(userAuthMiddlware,changePassword)

router.route("/bulk").post(userAuthMiddlware,searchUsers)

router.route("/logout").post(userAuthMiddlware,logout)
export default router