import { Router } from "express";
import {
    signup,
    login,
    logout,
    onboard,
    me
} from "../controllers/auth.controller.js"

import protectRoute from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/signup").post(signup)
router.route("/login").post(login)

router.route("/logout").post(protectRoute,logout)

router.route("/onboarding").post(protectRoute, onboard)
router.route("/me").get(protectRoute, me)

export default router