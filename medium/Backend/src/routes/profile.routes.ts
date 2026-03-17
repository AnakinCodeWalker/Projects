import { Router } from "express";
import {upload} from "../middleware/multer.middleware.js"
import { deleteProfile, getUserProfile, updateProfile } from "../controllers/profile.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const profileRouter = Router()

profileRouter.route("/details").get(authMiddleware,getUserProfile)
profileRouter.route("/update").patch(authMiddleware,updateProfile)
profileRouter.route("/delete").delete(authMiddleware,deleteProfile)

export default profileRouter