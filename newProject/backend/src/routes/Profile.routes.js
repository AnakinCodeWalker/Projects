//profile is already created , when we were creating user 
// so only update ,delete and get are present.

import {
    getProfileDetails,
        updateProfile,
        deleteProfile
} from "../controllers/Profile.controllers.js"

import authMiddleware from "../middlewares/authMiddleware.js"
import upload from "../config/multer.config.js"
import {Router} from "express"

const profileRouter =  Router()

profileRouter.route("/details").get(authMiddleware,getProfileDetails)

//user want to partiall update so patch
profileRouter.route("/update").patch(authMiddleware,updateProfile)

profileRouter.route("/delete").post(authMiddleware,deleteProfile)

export default profileRouter