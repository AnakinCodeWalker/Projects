import asyncHandler from "../utils/asyncHandler.js"

import { signupInput, signinInput, onboardInput } from "../validations/User.validation.js"
import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import env from "../config/env.config.js"
import User from "../models/User.model.js"
import { upsertStreamUser } from "../config/stream.js"

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

  // create a user in stream too.. 

  const createduser = await User.create({
    fullName,
    email,
    password,
    profilePic: `https://api.dicebear.com/5.x/initials/svg?seed=${fullName}`, // providing default image to every user

  })

  if (!createduser)
    throw new ApiError(400, "can not create user")

  try {
    await upsertStreamUser({
      id: createduser._id.toString(), // convert id into string
      name: createduser.fullName,
      image: createduser.profilePic || "",
    });
    console.log(`Stream user created for ${createduser.fullName}`);
  } catch (error) {
    console.log("Error creating Stream user:", error);
  }

  const token = jwt.sign(
    {
      userId: createduser.id
    },
    env.JWT_SECRET_KEY,
    {
      expiresIn: "7d"
    }
  );


  res.cookie("accessToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });



  console.log(createduser);
  console.log(token);
  res
    .cookie("accessToken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    }).status(201).json(new ApiResponse(201, "user created successfully", {
      user: createduser
    }))
})


const login = asyncHandler(async (req, res) => {
  const result = signinInput.safeParse(req.body)

  if (!result.success)
    throw new ApiError(400, "Incorrect Inputs")

  const { email, password } = result.data


  const foundUser = await User.findOne({ email })

  if (!foundUser)
    throw new ApiError(400, "Invalid email")

  const isPasswordCorrect = await foundUser.isPasswordCorrect(password)

  if (!isPasswordCorrect)
    throw new ApiError(401, "Invalid password")


  const token = jwt.sign(
    {
      userId: foundUser.id
    },
    env.JWT_SECRET_KEY,
    {
      expiresIn: "7d"
    }
  );

  res.cookie("accessToken", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });



  console.log(foundUser);
  console.log(token);
  res
    .cookie("accessToken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    }).status(200).json(new ApiResponse(200, "user created successfully", {
      user: foundUser
    }))
})

const logout = asyncHandler(async (req, res) => {

  res.clearCookie("accessToken", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json(new ApiResponse(200, "User logged out successfully"))
})



const onboard = asyncHandler(async (req, res) => {

  const userId = req.user.id
  if (!userId)
    throw new ApiError(400, "Invalid user id")

  const result = onboardInput.safeParse(req.body)

  if (!result.success) {
  console.log(result.error.message); 
  throw new ApiError(400, "Incorrect Inputs");
}

  const {
    fullName,
    bio,
    nativeLanguage,
    learningLanguage,
    location
  } = result.data

  const updatedUser = await User.findByIdAndUpdate(userId, {
    ...(fullName && { fullName }),
    ...(bio && { bio }),
    ...(nativeLanguage && { nativeLanguage }),
    ...(learningLanguage && { learningLanguage }),
    ...(location && { location }),

    isOnboarded: true,

  }, { returnDocument: "after" })

  if (!updatedUser)
    throw new ApiError(400, "can not updated User")

  // update the infromation into stream
  try {
    await upsertStreamUser({
      id: updatedUser._id.toString(),
      name: updatedUser.fullName,
      image: updatedUser.profilePic || "",
    });
    console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
  } catch (streamError) {
    console.log("Error updating Stream user during onboarding:", streamError.message);
  }


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