import User from "../models/User.model.js"
import jwt  from "jsonwebtoken"

import env from "../config/env.js"

import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

const signup =asyncHandler( async (req,res) => {
    
const { userName , password, firstName ,lastName }  = req.body 

  if(!userName||! password ||!firstName||!lastName)
    throw new ApiError(400,"All credentials are required")

 const existingUser = await User.findOne({userName})

 if(existingUser)
    throw new ApiError(409,"userName already Exists")

 const createdUser =  await User.create({
    userName,
    password,
    firstName,
    lastName,
 })

 if(!createdUser)
  throw new ApiError(500,"failed to create user")

  res.status(201).json(new ApiResponse(201,"user created",{
    id:createdUser._id,
    userName : createdUser.userName,
    firstName: createdUser.firstName,
    lastName : createdUser.lastName
  }))
})

const signin = asyncHandler(async (req,res) => {
    const {userName , password} = req.body

    if(!userName||!password)
      throw new ApiError(400,"All credentials are required")


const foundUser = await User.findOne({userName}).select("+password");

if(!foundUser){
  throw new ApiError(404,"user not found")
}

const isPasswordCorrect = await foundUser.isPasswordCorrect(password)

if(!isPasswordCorrect)
  throw new ApiError(400 ,"Invalid password")

//  create access and refresh token

const payload = {
  userId : foundUser._id
}
const token = jwt.sign(payload,env.JWT_ACCESS_TOKEN,{
  expiresIn:env.JWT_ACCESS_TOKEN_EXPIRY
}) 

const refreshToken = jwt.sign(payload,env.JWT_REFRESH_TOKEN,{
  expiresIn:env.JWT_REFRESH_TOKEN_EXPIRY
})

//  saving token in db

foundUser.refreshToken = refreshToken;
foundUser.refreshTokenExpiry = new Date(
  Date.now() + 7 * 24 * 60 * 60 * 1000
);

await foundUser.save({ validateBeforeSave: false });
// cookies  is the box which contains accesstoken and refresh token

const accessTokenCookieOptions ={
  httpOnly : true,
 secure: env.NODE_ENV === "production", // https in prod
   sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  maxAge :  15 * 60 * 1000
}

//  cehck cookie 

// //////// frontend mai 
//  axios.post(url, data, { withCredentials: true });

const refreshTokenCookieOptions={
   httpOnly : true,
   secure: env.NODE_ENV === "production", // https in prod
   sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  maxAge :   7 * 24 * 60 * 60 * 1000
}
//////////////////////////////////////////////////
res.status(200)
.cookie("accessToken",token,accessTokenCookieOptions)
.cookie("refreshToken",refreshToken,refreshTokenCookieOptions)
.json(new ApiResponse(200,"user logged in"))

})

const refreshTokenController = asyncHandler(async (req,res) => {
  
})

const updateDetails = asyncHandler(async (req,res) => {
  
})


const changePassword = asyncHandler(async (req,res) => {
    
})

const searchUsers = asyncHandler(async (req,res) => {

  
})

const logout = asyncHandler(async (req,res) => {
    
})

export {
    signup,
    signin,
    refreshTokenController,
    updateDetails,
    changePassword,
    searchUsers,
    logout
}


//  now only use try catch for external api fallback