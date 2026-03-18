
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js"
import env from "../config/env.config.js";

const protectRoute = asyncHandler(async (req, res, next) => {

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

export default protectRoute