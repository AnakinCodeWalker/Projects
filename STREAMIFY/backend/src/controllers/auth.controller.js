import asyncHandler from "../utils/asyncHandler.js"

import { signupInput, signupInput } from "../validations/User.validation.js"

import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

import User from "../models/User.model.js"

const signup = asyncHandler(async (req, res) => {

  const result = signupInput.safeParse(req.body)

  if (!result.success)
    throw new ApiError(400, "Incorrect Inputs")

  const { fullName, email, password } = result.data

  const foundUser = await User.findOne({
    email
  })
  if (foundUser)
    throw new ApiError(400, "email already exists")

  const createduser = await User.create({
    fullName,
    email,
    password,
    /////////////////////////
  })
  res.status(201).json(new ApiResponse(201, "user created successfully", {
    user: createduser
  }))
})

const login = asyncHandler(async (req, res) => {

})

const logout = asyncHandler(async (req, res) => {

})

const onboard = asyncHandler(async (req, res) => {

  const userId = req.user.id
  if (!userId)
    throw new ApiError(400, "Invalid user id")

  const result = onboardInput.safeParse(req.body)
  const {
    fullName,
    bio,
    nativeLanguage,
    learningLanguage,
    location
  } = result.data

  if (!result.success)
    throw new ApiError(400, "Incorrect Inputs")

  const updatedUser = await User.findByIdAndUpdate(userId, {
    ...(fullName && { fullName }),
    ...(bio && { bio }),
    ...(nativeLanguage && { nativeLanguage }),
    ...(learningLanguage && { learningLanguage }),
    ...(location && { location }),

    isOnboarded: true,

  }, { new: true })

  if (!updatedUser)
    throw new ApiError(400, "can not updated User")

  // update the infromation into stream


  res.status(200).json(new ApiResponse(200, "User updated Successfully", {
    user: updatedUser
  }))


})

const me = asyncHandler(async (req, res) => {

  const userId = req.user.id

  if (!userId)
    throw new ApiError(400, "Invalid user Id")

  const foundUser = await User.findById(userId)

  if (!foundUser)
    throw new ApiError(400, "Can not get User")

  res.status(200).json(new ApiResponse(200, "User updated Successfully", {
    user: foundUser
  }))
})

export {
  signup,
  login,
  logout,
  onboard,
  me
}