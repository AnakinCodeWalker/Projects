import { Router } from "express";
import { getStreamToken } from "../controllers/chat.controller.js";
import protectRoute from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/token").get(protectRoute,  getStreamToken)

export default router 