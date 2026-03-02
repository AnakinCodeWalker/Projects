import Otp from "../models/otp.model.js"
import User from " ../models/User.model.js"
import Profile from "../models/Profile.model.js"
import asyncHandler from "../utils/asyncHandler/js"

import { signupInput, signinInput } from "../validation/zodValidation.js"

import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

import otpGenerator from "otp-generator"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"

import env from "../config/env.config.js"


const sendOtp = asyncHandler(async (req, res) => {

   const { email } = req.body

   if (!email)
      throw new ApiError(304, "Invalid input")

   const findUser = await User.findOne({ email })
   if (findUser)
      throw new ApiError(409, "User already exists")

   const generatedOtp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
   })

   if (!generatedOtp)
      throw new ApiError(500, "can not create otp")

   console.log("Otp generated : " + generatedOtp);

   const sentOtp = await Otp.create({
      email,
      otp: generatedOtp
   })

   if (!sentOtp)
      throw new ApiError(500, "can not create otp")


   return res.status(200)
      .json(new ApiResponse(200,
         "Opt sent successfully",
         {
            sentOtp
         }))

})


const signupController = asyncHandler(async (req, res) => {

   const result = signupInput.safeParse(req.body)
   const { otp, contactNumber } = req.body

   if (!result.success)
      throw new ApiError(403, "Validation failed")


   if (password !== confirmPassword) {
      throw new ApiError(304, "password and confrimPassword does not match")
   }


   const existingUser = await User.findOne({
      email
   })

   if (existingUser)
      throw new ApiError(304, "user already exists ..")

   const recentOtp = await Otp.find({ email })
      .sort({ createdAt: -1 })
      .limit(1)

   if (!recentOtp || otp !== recentOtp.otp)
      throw new ApiError(403, "Invalid otp")

   //  password hashing kai liye pre hook likha hua hai 

   const additionalDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      contactNumber: null,
      about: null
   })

   const newUser = await User.create({
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      password: result.password,
      contactNumber,
      role,
      additionalDetails: additionalDetails._id, // object id
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}` // providing default image to every user
   })

   if (!newUser) {

      console.log(` error in userSignup`);
      throw new ApiError(403, "can not created user")

   }

   return res.status(201)
      .json(
         new ApiResponse(201,
            "user signup succesfully",
            {
               user: newUser
            }))

})


const signinController = asyncHandler(async (req, res) => {

   const result = signinInput.safeParse(req.body)

   if (!result.success)
      throw new ApiError(403, "Validation failed")

   const existingUser = await User.findOne({

      email: result.email

   })

   if (!existingUser)
      throw new ApiError(304, "signup first ..")

   
   
   // do the password check
   
    if (!existingUser)
         throw new ApiError(304, "Invalid password ..")
   
   const payload = {
      id : existingUser._id,
      role : existingUser.role,
      email : existingUser.email
   }
   
   const accessToken = jwt.sign(payload,env.JWT_ACCESS_SECRET,{
      expiresIn : env.JWT_ACCESS_EXPIRES
   })
    
   const refreshToken = jwt.sign(payload,env.JWT_REFRESH_SECRET,{
      expiresIn : env.JWT_REFRESH_EXPIRES
   })

 //  saving token in db

existingUser.refreshToken = refreshToken;
existingUser.refreshTokenExpiry = new Date(
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

//  check cookie 

// //////// frontend mai 
//  axios.post(url, data, { withCredentials: true });

const refreshTokenCookieOptions={
   httpOnly : true,
   secure: env.NODE_ENV === "production", // https in prod
   sameSite: env.NODE_ENV === "production" ? "none" : "lax",
  maxAge :   7 * 24 * 60 * 60 * 1000
}

res.status(200)
.cookie("accessToken",accessToken,accessTokenCookieOptions)
.cookie("refreshToken",refreshToken,refreshTokenCookieOptions)
.json(new ApiResponse(200,"user logged in"))

})

const changePassword = asyncHandler(async (req,res) => {
   

})

const resetpasswordToken = asyncHandler(async (req,res) => {
   
})

const resetpassword = asyncHandler(async (req,res) => {
   
})

const logoutUser = asyncHandler(async (req, res) => {

   return res.status(200).json(new ApiResponse(200, "user logged out succesfully", {
      user
   }))
})

export {
   sendOtp,
   signupController,
   signinController,
   changePassword,
   resetpasswordToken,
   resetpassword,
   logoutUser
}

