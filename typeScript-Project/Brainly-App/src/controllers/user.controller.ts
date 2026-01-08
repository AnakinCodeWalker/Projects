import { Request, Response } from "express";
import User from "../models/User.model.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
// provide a return type in here
// add zod validations.
const signup = async (req: Request, res: Response): void => {

    const { userName, password, email } = req.body;

    if(!userName||!password||!email)
        throw new ApiError(403,"All credentials are required")

    // u dont have to provide the type here  as while u were creating the model u defined it     
const findUser = await User.findOne({
        userName: userName,
        email: email
    })

    // create the ApiResponse class and ApiError class first
    if(findUser){
    console.log(`User with this credentials already exists`);
    throw new ApiError(403,"User already Exists")
}

const newUser = await User.create({
    userName,
    email,
    password
})
// then finding the created user and remove vulnerable details from it.
const createdUser = await User.findById(newUser._id)
 .select("-password -refreshToken")

if(!createdUser)
    throw new ApiError(500, "User not created")

// returning the newly created user.
    res.status(201).json(new ApiResponse(201, createdUser, "User created Successfully"))


}


export {signup,
    signin
}