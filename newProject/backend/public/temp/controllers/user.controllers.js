import User from " ../models/User.model.js"
import asyncHandler from "../utils/asyncHandler/js"
import { signupInput, signinInput } from "../validation/zodValidation.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"

const signupController = asyncHandler(async (req, res) => {

   const result = signupInput.safeParse(req.body)

   if (!result.success)
      throw new ApiError(400, "Validation failed")

   const existingUser = await User.findOne({

      $or: [{

         email: result.email

      }, {

         userName: result.userName

      }]

   })


   if (existingUser)
      throw new ApiError(304, "user already exists ..")

   const newUser = await User.create({
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      userName: result.userName,
      password: result.password,

   })
   if (!newUser) {

      console.log(` error in userSignup`);
      throw new ApiError(403, "can not created user")

   }

   return res.status(201).json(new ApiResponse(201, "user signup succesfully", {
      user: newUser
   }))

})

const signinController = asyncHandler(async (req, res) => {
   const result = signinInput.safeParse(req.body)

   if (!result.success)
      throw new ApiError(400, "Validation failed")

   return res.status(200).json(new ApiResponse(200, "user signin succesfully", {
      user
   }))
})

const logoutUser = asyncHandler(async (req, res) => {

   return res.status(200).json(new ApiResponse(200, "user logged out succesfully", {
      user
   }))
})

export {
   signupController,
   signinController,
   logoutUser
}

