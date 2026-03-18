import { Router } from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import{
    getRecommendedUser,
    getMyFriends,
    sendFriendRequest
} from "../controllers/User.controller.js"
const router  = Router()

router.use(protectRoute)

router.route("/").get(getRecommendedUser)
router.route("/friends").get(getMyFriends)
router.route("/friends-request/:id").post(sendFriendRequest)

export default router