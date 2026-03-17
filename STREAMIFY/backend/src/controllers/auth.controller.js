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
  if(foundUser)
    throw new ApiError(400,"email already exists")

  const createduser = await User.create({
    fullName,
    email,
    password,
    /////////////////////////
  })
  res.status(201).json(new ApiResponse(201,"user created successfully",{
    user : createduser
  }))
})

const login = asyncHandler(async (req, res) => {

})

const logout = asyncHandler(async (req, res) => {

})

export {
  signup,
  login,
  logout
}