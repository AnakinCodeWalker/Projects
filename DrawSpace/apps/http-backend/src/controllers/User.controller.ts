import { Request, Response } from "express";
import { ApiResponse } from "../utils/ApiResponse";
import { signinInput, signinInputType, signupInput, signupInputType } from "../validation/userValidation";
import jwt from "jsonwebtoken";
import { env } from "../config/env.config";
import { ApiError } from "../utils/ApiError";
import bcrypt from "bcrypt"

export const signup = async (req: Request<{}, {}, signupInputType, {}>, res: Response): Promise<void> => {

    const result = signupInput.safeParse(req.body)

    if (!result.success)
        throw new ApiError(304, "Invalid inputs", result.error.issues)

    const {email,password } = result.data

    const hashedPassword = await bcrypt.hash(password,10)
    
    const user = "213"


    res.status(201).json(new ApiResponse(201, "signup successfully", {
        user
    }))
}

export const signin = async (req: Request<{}, {}, signinInputType, {}>, res: Response): Promise<void> => {

    const result = signinInput.safeParse(req.body)

    if (!result.success)
        throw new ApiError(304, "Invalid inputs", result.error.issues)

    const {email,password } = result.data

    // find user
    const user = 123
    
    const passwordCorrect  = bcrypt.compare(password,) 
    

    const userId = 1

    const token = jwt.sign({
        userId,
    }, env.JWT_SECRET_KEY)


    console.log(token);


    res.status(200).json(new ApiResponse(200, "signup successfully", {
        user,

    }))
}

export const room = async (req: Request, res: Response): Promise<void> => {

    const createdRoom = 124;

    res.status(201).json(new ApiResponse(201, "room created successfully", {
        createdRoom
    }))
}