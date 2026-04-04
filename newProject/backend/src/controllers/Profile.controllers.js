// done
// syntax change hogya hai from new : true to returnDocument: "after"
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Profile from "../models/Profile.model.js";
import User from "../models/User.model.js";

const getProfileDetails = asyncHandler(async (req, res) => {

    // will provie the user details as well as profile details as well.

    const userId = req.user.id

    const foundUser = await User.findById(userId)
        .populate("additionalDetails")
        .exec()

    if (!foundUser)
        throw new ApiError(304, "User does not exists")

    res.status(200).json(new ApiResponse(200, "user Data fetched successfullly", {
        "user": foundUser
    }))
})


// jb login kr rhe thai then profile create kiye thai with null values
const updateProfile = asyncHandler(async (req, res) => {

    const {
        firstName,
        lastName,
        dateOfBirth,
        about,
        contactNumber,
        gender,
       
    } = req.body

    const userId = req.user.id

   
    //update firstName ,lastName from user model
    const userDetail = await User.findByIdAndUpdate(
        userId,
        {
            ...(firstName && { firstName }),
            ...(lastName && { lastName })
        },
        { returnDocument: "after" }
    )

    //find us specfic user ki profile , u will get the Profileid from user model ,kyuki usme refnrece hai.
    const profileDetails = await Profile.findByIdAndUpdate(
        userDetail.additionalDetails,
        {
            ...(dateOfBirth && { dateOfBirth }),
            ...(about && { about }),
            ...(contactNumber && { contactNumber }),
            ...(gender && { gender }),
        },
        { returnDocument: "after" }
    )

    res.status(200).json(new ApiResponse(200, "profile updated successfully", {
        "user": userDetail,
        "profile": profileDetails
    }))
})


const deleteProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id

    const user = await User.findById(userId)

    if (!user)
        throw new ApiError(400, "Invalid user")

    //delete the user and profile as well..
    await Profile.findByIdAndDelete({ _id: user.additionalDetails })

    await User.findByIdAndDelete({ _id: userId })

    res.status(200).json(new ApiResponse(200, "profile deleted successfully"))

})

const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec()

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

export {
    getProfileDetails,
    updateProfile,
    deleteProfile,
    getEnrolledCourses
}