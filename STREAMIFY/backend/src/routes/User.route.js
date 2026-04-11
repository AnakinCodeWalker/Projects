import { Router } from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import{
    getRecommendedUser,
    getMyFriends,
    sendFriendRequest,
    getFriendRequest,
    acceptFriendRequest
} from "../controllers/User.controller.js"
const router  = Router()

router.use(protectRoute)

router.route("/").get(getRecommendedUser)
router.route("/friends").get(getMyFriends)

router.route("/friends-request/:id").post(sendFriendRequest)

router.route("/friends-request/:id/accept").put(acceptFriendRequest)

router.route("/friends-request").get(getFriendRequest)

router.route("/outgoing-friend-requests").get(getOutgoingFriendRequest)


// outgoing-friend-requests create this endpoint 
export default router

