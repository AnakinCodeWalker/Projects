import { generateStreamToken } from "../config/stream.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getStreamToken = asyncHandler(async (req, res) => {
    const token = generateStreamToken(req.user.id)

    if (!token)
        throw new ApiError(500, "Internal server error")

    res.status(200).json(new ApiResponse(200, "token generated", {
        token
    }))

})