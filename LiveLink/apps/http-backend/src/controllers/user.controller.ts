import { Request, Response } from "express"
import ApiError from "../utils/ApiError"
import { StatusCodes, ReasonPhrases } from "http-status-codes"
import  jwt ,{  JwtPayload , SignOptions } from "jsonwebtoken"


import { CookieOptions } from "express"

import { env } from "../config/env"
const signupController = async (req: Request, res: Response): Promise<void> => {
    interface RegisterBody {
        name: string,
        email: string,
        password: string
    }

    const { name, email, password } = req.body as RegisterBody

    if (!name || !email || !password) 
        throw new ApiError(StatusCodes.UNAUTHORIZED,
                          "All credentials are required")
    
}

const signinController = async (req: Request, res: Response): Promise<void> => {

    interface SigninBody {
        email: string,
        password: string
    }
    
    const {email,password} = req.body as SigninBody

    if(!email||!password)
        throw new ApiError(StatusCodes.UNAUTHORIZED,"Invalid Credentials")
    
    interface CustomPayload{
id:string
    }

    
    const payload :CustomPayload ={
id:"123"
    }

   
 const accessOptions:SignOptions = {
    //   as SignOptions['expiresIn'], means goto SignOptions and whatever type hai expiresIn provide the same type to expiresIn
    expiresIn:  env.JWT_ACCESS_TOKEN_EXPIRY  as SignOptions['expiresIn'],
    }
    const token = jwt.sign(payload,env.JWT_ACCESS_TOKEN ,accessOptions)
 
  const refreshOptions: SignOptions = {
        expiresIn:   env.JWT_REFRESH_TOKEN_EXPIRY  as SignOptions["expiresIn"],
    }

const refreshToken = jwt.sign(payload,env.JWT_REFRESH_TOKEN ,refreshOptions)
}

const logoutController = async (req: Request, res: Response): Promise<void> => {


}

export {
    signupController,
    signinController,
    logoutController
}