// refreshtoken controller remaining.

// prehook for mail wull be called written in the user model

import Otp from "../models/otp.model.js"
import User from "../models/User.model.js"
import Profile from "../models/Profile.model.js"
import asyncHandler from "../utils/asyncHandler.js"

import { signupInput, signinInput, changePasswordInput } from "../validation/User.ZodValidation.js"

import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

import otpGenerator from "otp-generator"
import jwt from "jsonwebtoken"

import env from "../config/env.config.js"
import mailsender from "../utils/mailSender.js"
import bcrypt from "bcrypt"

import crypto from "crypto"

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

   console.log(`email sent to :${email}`);

   return res.status(200)
      .json(new ApiResponse(200,
         "Opt sent successfully",
         {
            sentOtp
         }))

})




const signupController = asyncHandler(async (req, res) => {


   const result = signupInput.safeParse(req.body)

   if (!result.success) {
      console.error(result.error.issues)
      throw new ApiError(400, "Validation failed")

   }


   if (result.data.password !== result.data.confirmPassword) {
      throw new ApiError(400, "password and confirmPassword does not match")
   }


   const existingUser = await User.findOne({
      email: result.data.email
   })

   if (existingUser)
      throw new ApiError(400, "user already exists ..")


   // // find most recent otp based on email
   // const recentOtp = await Otp.find({ email: result.data.email })
   //    .sort({ createdAt: -1 })
   //    .limit(1)

   // // find returns an array... so sort the array and take the first one.
   // if (!recentOtp.length || result.data.otp !== recentOtp[0].otp)
   //    throw new ApiError(403, "Invalid otp")



   //  password hashing kai liye pre hook likha hua hai 

   const additionalDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      contactNumber: result.data.contactNumber,
      about: null
   })


   console.log("checking");
   const randomAvatar = `https://robohash.org/${Math.random()}`;

   const newUser = await User.create({
      firstName: result.data.firstName,
      lastName: result.data.lastName,
      email: result.data.email,
      password: result.data.password,
      contactNumber: result.data.contactNumber,
      role: result.data.role,
      additionalDetails: additionalDetails._id, // object id
      image: randomAvatar, // providing default image to every user
      // otp: "123456"
   })

   console.log("checking");

   if (!newUser) {

      console.log(` error in userSignup`);
      throw new ApiError(403, "can not create user")

   }

   console.log("user sign up successfully");
   console.log(newUser);
   res.status(201)
      .json(
         new ApiResponse(201,
            "user signup succesfully",
            {
               user: newUser
            }))

})






const signinController = asyncHandler(async (req, res) => {

   const result = signinInput.safeParse(req.body)


   if (!result.success) {
      console.error(result.error.issues)
      throw new ApiError(400, "Validation failed")

   }

   const existingUser = await User.findOne({

      email: result.data.email

   })

   if (!existingUser) {
      console.error(result.error.issues)
      throw new ApiError(401, "signup first ..")
   }


   // do the password check //////////////////
   const isPasswordValid = await existingUser.isPasswordCorrect(result.data.password)

   if (!isPasswordValid)
      throw new ApiError(401, "Invalid password")


   const payload = {
      id: existingUser._id,
      role: existingUser.role,
      email: existingUser.email
   }

   console.log(payload)

   const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
      expiresIn: env.JWT_ACCESS_EXPIRES
   })

   const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: env.JWT_REFRESH_EXPIRES
   })

   //  saving token in db

   existingUser.refreshToken = refreshToken;
   existingUser.refreshTokenExpiry = new Date(
      Date.now() + env.JWT_REFRESH_EXPIRES
   );

   await existingUser.save({ validateBeforeSave: false });

   // cookies  is the box which contains accesstoken and refresh token

   const accessTokenCookieOptions = {
      httpOnly: true,
      secure: env.NODE_ENV === "production", // https in prod
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 15 * 60 * 1000
   }

   //  check cookie 

   // //////// frontend mai 
   //  axios.post(url, data, { withCredentials: true });

   const refreshTokenCookieOptions = {
      httpOnly: true,
      secure: env.NODE_ENV === "production", // https in prod
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
   }

   console.log(`login successfully ${result.data.email}`);

   res.status(200)
      .cookie("accessToken", accessToken, accessTokenCookieOptions)
      .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
      .json(
         new ApiResponse(200, {
            // token: accessToken,   // i am extracting things from the localstorage i will fix them in future 
            user: existingUser
         }, "user logged in")
      );


})



const refreshAccessToken = asyncHandler(async (req, res) => {

})



const changePassword = asyncHandler(async (req, res) => {
   /*
   get data from req body
   get old password newPassword  confirmNewPassword 
   validation

   update pwd in the db 
   send email password is updated 
   return response 
   */

   const result = changePasswordInput.safeParse(req.body)

   if (!result.success)
      throw new ApiError(403, "Incorrect Inputs")

   const foundUser = await User.findOne({ email: result.data.email })

   if (!foundUser)
      throw new ApiError(400, "Invalid User")

   //  check the previous password is correct or not ?
   const isPasswordValid = await foundUser.isPasswordCorrect(result.data.oldPassword)

   console.log(isPasswordValid);

   console.log(foundUser.password)

   if (!isPasswordValid)
      throw new ApiError(401, "Invalid password")

   if (result.data.newPassword !== result.data.confirmNewPassword)
      throw new ApiError(401, "Password and confirm Password does not match")


   try {
      foundUser.password = result.data.newPassword
      await foundUser.save()
      await mailsender(result.data.email, "Password update", "Password updated Successfully")

   } catch (error) {
      console.log(`error in sending mail ${error.message}`);
   }

   console.log("password updated successfully");

   res.status(200).json(new ApiResponse(200, "Password updated SuccessFully", {
      "user": foundUser
   }))

})


const resetpasswordToken = asyncHandler(async (req, res) => {
   //  fetch email 
   //  check user for this email 
   // genrate token and expiration time save to db  
   // genrate link
   // send this to email

   const { email } = req.body
   const existingUser = await User.findOne({ email })

   if (!existingUser)
      throw new ApiError(403, "Invalid email")

   //genrate random token

   const token = crypto.randomUUID()
   const hashedToken = crypto.createHash("sha256").update(token).digest("hex")
   //save the token and expiry into db

   console.log(`reset password token : ${token}`);

   existingUser.resetPasswordToken = hashedToken;
   existingUser.resetPasswordTokenExpiry = new Date(Date.now() + 5 * 60 * 1000)
   await existingUser.save({ validateBeforeSave: false })

   // send this to the frontend mail 

   // maybe i have to change this one 
   const url = `http://localhost:5173/update-password/${token}`
   try {
      await mailsender(email, "Reset password link", url)
      console.log(`mail sent successfully`);
   } catch (error) {
      console.log(error.message);
      console.log(`Error in sending mail for reset password`);
      throw new ApiError(500, "Something went wrong")
   }

   res.status(200).json(new ApiResponse(200, "email sent successfully", {
      "emailLink": `${token}`
   }))
})



const resetpassword = asyncHandler(async (req, res) => {

   //  we can take the token from the params as well
   const { token, password, confirmPassword } = req.body

   if (!token || !password || !confirmPassword)
      throw new ApiError(400, "All fields are required")

   if (password !== confirmPassword)
      throw new ApiError(400, "password and confirmPassword does not match")

   const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex")

   const findUser = await User.findOne({
      resetPasswordToken: hashedToken
   })

   if (!findUser)
      throw new ApiError(400, "Invalid token")

   //  current time se jyada hoga to expire hoga
   if (Date.now() > findUser.resetPasswordTokenExpiry) {

      findUser.resetPasswordToken = null
      findUser.resetPasswordTokenExpiry = null
      await findUser.save({ validateBeforeSave: false })

      throw new ApiError(401, "Token is expired")

   }

   // dont skip validation while password hashing ..
   findUser.password = password
   findUser.resetPasswordToken = null
   findUser.resetPasswordTokenExpiry = null
   await findUser.save()

   res.status(200).json(new ApiResponse(200, "Password updated Successfully", {
      "user": findUser
   }))

})



const logoutUser = asyncHandler(async (req, res) => {

   const userId = req.user._id

   await User.findByIdAndUpdate(userId, {
      accessToken: null,
      refreshToken: null
   })
   //  find in db and remove

   // clear the cookies 

   // cookies set krte time or clear krte time same option is good nhi to kbhi kbhi clear nhi hota hai 
   const options = {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax"
   }
   return res
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .status(200).json(new ApiResponse(200, "user logged out succesfully"))
})



export {
   sendOtp,
   signupController,
   signinController,
   refreshAccessToken,
   changePassword,
   resetpasswordToken,
   resetpassword,
   logoutUser
}