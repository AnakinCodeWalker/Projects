//will write the multer code later on

import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from '../utils/ApiResponse.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import dotenv from 'dotenv'
import { asyncHandler } from "../utils/asyncHandler.js";
dotenv.config()


const genrateAccessTokenAndRefreshToken = async (userId) => {
    try {

        const user = await User.findById(userId)

        // what happen with the access token 
        const accessToken = user.genrateAccessToken()
        const refreshToken = user.genrateRefreshToken()

        user.refreshToken = refreshToken //user already created now putting the refresh token into it

       
        await user.save({
            validateBeforeSave: true  //why this ?? 
        })

        return {

            accessToken,
            refreshToken

        }

    } catch (error) {
        console.log(`error in genrating Access and refresh token`);
        console.log(`${error.message}`);


        throw new ApiError(500, "Something went Wrong while genrating Access and Refresh token")

    }
}





/*
1. get user details
2.validation -not empty
3. check if user already exists
4. check for iamges and check for avatar
5. upload them to cloudnary , avatar
6. create user object - create entry in db
7. remove password and response token from response
8. check if user created or not ?
*/
const registerUser = asyncHandler(async (req, res) => {

    const { userName, fullName, email, password } = req.body

    //review the find syntax..
    if (
        [fullName, email, userName, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { userName }]
    })
    if (existingUser)
        throw new ApiError(409, "User already exists with these credentials")

// file uploading or multer side code 
//multer  Provides files in req.files

const avatarLocalPath = req.files?.avatar[0]?.path // we have to store multer file to our server in the temp folder 
//  via .path we could get the path 


// const coverImageLocalPath = req.files?.coverImage?.[0].path
// doing the same thing with simple if condition to reduce the Hassle

let coverImageLocalPath;

if(req.files && Array.isArray(req.files?.coverImage) && req.files?.coverImage.length > 0 ){
    coverImageLocalPath = req.files.coverImage[0].path
}

// avatar is mandatory
if(!avatarLocalPath){
    throw new ApiError(400 , "Avatar file is Required")
}

//upload things on cloudinary 

const avatar = await uploadOnCloudinary(avatarLocalPath)

const coverImage =  coverImageLocalPath
    ? await uploadOnCloudinary(coverImageLocalPath)
    : null


if(!avatar){
    throw new ApiError(500 , "Avatar file is Essential")
}

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        password,
        email,
        userName: userName.toLowerCase()
    })

    const createdUser = await User.findById(user._id)
        .select("-password  -refreshToken")   //this lets you remove things just select and remove them

    if (!createdUser)
        throw new ApiError(500, "User not created")

    //sending the user after removing the passowrd and the refreshToken
    res.status(201).json(new ApiResponse(201, createdUser, "User created Successfully"))

})


     //for cookie
     const options ={
         httpOnly:true,
         secure:true
     } 

    const loginUser = asyncHandler(async (req, res) => {
        const { userName, password } = req.body

        if (!userName || !password)
            throw new ApiError(400, "All credentails are required")

        const user = await User.findOne({
                userName
        })

        if (!user)
            throw new ApiError(404, "user not Found")


        //now we have to check for the passwords

        const isPasswordValid = await user.isPasswordCorrect(password)

        if (!isPasswordValid)
            throw new ApiError(401, "Invalid User Credentials")

        //now genrating access and refresh token

        const { accessToken, refreshToken } = await genrateAccessTokenAndRefreshToken(user._id)


const loggedInUser = await User.findById(user._id)
   .select("-password  -refreshToken")




return res.status(200)  //now put the thing u want  to in cookies
 .cookie("accessToken",accessToken,options)
 .cookie("refreshToken",refreshToken,options)
 .json(
    new ApiResponse(200,
        {
            user:loggedInUser, //sending user after password and refreshToken
            accessToken,
            refreshToken
        },
        "User Logged in successfully"
    )
 )
    })


    const logoutUser = asyncHandler(async (req,res) => {

        //to logut delete the refresh token from db and cookie


        //jwt payload then verify then extract from there and put it into request ki body 
        // yaha pr _id yah .id hoga ?????

        await User.findByIdAndUpdate(req.user._id,
            {
                $set:{
                    refreshToken:undefined
                }
            },{
                    new:true
                }
        )


        //now removing from the cookie 

        return res.status(200)
        .clearCookie("accessToken",options)
        .clearCookie("refreshToken",options)
        .json(new ApiResponse(200,{},"User logged out Successfully"))      


    })

export {
   registerUser,
   loginUser,
   logoutUser
}