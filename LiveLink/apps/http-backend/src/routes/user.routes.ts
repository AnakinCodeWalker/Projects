import {Router} from "express";
import {signin, signup , room,logout } from "../controllers/user.controller.js";
import { userAuthMiddleware } from "../middlewares/userAuth.middleware.js";

// this need to be annotated when you are pnpm in normal this works perfectlly
const router :Router = Router()

router.route("/signup").post(signup)
router.route("/signin").post( signin)
router.route("/logut").post(userAuthMiddleware,logout)

router.route("/room").post(userAuthMiddleware,room)

export default router