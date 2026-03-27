// done

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mailsender from "../utils/mailSender.js";
import env from "../config/env.config.js";
const contactUsController = asyncHandler(async (req, res) => {

    const { email, userQuery } = req.body
    if (!email)
        throw new ApiError(400, "Email is required")



    await mailsender(env.email, "your data sent successfully", JSON.stringify(userQuery))
    res.status(200).json(new ApiResponse(200, " mail sent Successfully", {
        email,
        userQuery
    }))


})

export default contactUsController
