import { Router } from "express"
import { room, signin, signup } from "../controllers/User.controller"
import authMiddleware from "../utils/middleware"

const router = Router()

router.route("/").post(signup)
router.route("/signin").post(signin)
router.route("/room").post(authMiddleware, room)
