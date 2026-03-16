// done

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mailsender from "../utils/mailSender.js";

const contactUsController = asyncHandler(async (req, res) => {

    const { email, ...userDetails } = req.body
    if (!email)
        throw new ApiError(400, "Email is required")

   

        await mailsender(email, "your data sent successfully", JSON.stringify(userDetails))
        res.status(200).json(new ApiResponse(200, " mail sent Successfully", {
            email,
            userDetails
        }))

   
})

export default contactUsController
