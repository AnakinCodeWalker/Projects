import { Router } from "express"
import { chats, room, signin, signup, slug } from "../controllers/User.controller"
import authMiddleware from "../utils/middleware"

const router:Router = Router()

router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/room").post(authMiddleware, room)
router.route("/chat/:roomId").post(chats)
router.route("/room/:slug").post(slug)


export default router