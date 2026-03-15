//  add here other middleware like author , instructor..

import { Router } from "express";

import authMiddleware, { isInstructorMiddleware } from "../middlewares/authMiddleware.js"
import {
    createCourse,
    getAllCourse,
    getCourseDetails
} from "../controllers/Course.controllers.js"

const userRouter = Router()

// instructor protected route
userRouter.route("/create").post(authMiddleware, isInstructorMiddleware, createCourse)

userRouter.route("/allCourse").get(authMiddleware, getAllCourse)
userRouter.route("/courseDetails").post(authMiddleware, getCourseDetails)

export default userRouter