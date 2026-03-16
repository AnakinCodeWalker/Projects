
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js"
import env from "../config/env.config.js";
const authMiddleware = asyncHandler(async (req, res, next) => {

    // get the token .
    const token = req.cookies?.accessToken
        ?? req.headers["authorization"]?.replace("Bearer ", "")
        ?? req.body?.accessToken
    if (!token)
        return next(new ApiError(401, "Invalid token"))

    const decode = jwt.verify(token, env.JWT_ACCESS_SECRET)

    // decode has 3 thigns id  ,email and role 
    req.user = decode

    next()
})


//  role wise middleware

export const isStudentMiddleware = asyncHandler(async (req, res, next) => {
    if (req.user.role !== "Student")
        return next(new ApiError(401, "Student protected route only"))

    next()

})


export const isInstructorMiddleware = asyncHandler(async (req, res, next) => {
    if (req.user.role !== "Instructor")
        return next(new ApiError(401, "Instructor protected route only"))

    next()

})

export const isAdminMiddleware = asyncHandler(async (req, res, next) => {
    if (req.user.role !== "Admin")
        return next(new ApiError(401, "Admin protected route only"))

    next()

})

export default authMiddleware