// done

import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Profile from "../models/Profile.model.js";
import User from "../models/User.model.js";


const getProfileDetails = asyncHandler(async (req, res) => {

    // will provie the user details as well as profile details as well.
    
    const userId = req.body.id
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
        firstName="",
        lastName="",
        dateOfBirth = "",
        about = "",
        contactNumber ="",
        gender =""
    } = req.body

    const userId = req.user.id

    //update firstName ,lastName from user model
    const userDetail = await User.findByIdAndUpdate(userId,{
firstName,
lastName
    },{new:true})

    //find us specfic user ki profile , u will get the Profileid from user model ,kyuki usme refnrece hai.
    const profileDetails = await Profile.findById(userDetail.additionalDetails) // this contains the id

    profileDetails.dateOfBirth = dateOfBirth,
        profileDetails.about = about,
        profileDetails.contactNumber = contactNumber,
        profileDetails.gender = gender

    await profileDetails.save()

    res.status(200).json(new ApiResponse(200, "profile updated successfully", {
        "user" :userDetail,
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

export {
    getProfileDetails,
    updateProfile,
    deleteProfile
}