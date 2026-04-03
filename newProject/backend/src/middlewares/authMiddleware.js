
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js"
import env from "../config/env.config.js";

const authMiddleware = asyncHandler(async (req, res, next) => {

    const token = req.cookies?.accessToken;

    if (!token) {
        return next(new ApiError(401, "Unauthorized: No token"));
    }

    try {
        const decode = jwt.verify(token, env.JWT_ACCESS_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        return next(new ApiError(401, "Invalid token"));
    }
});


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