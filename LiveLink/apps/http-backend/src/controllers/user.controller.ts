import { Request, Response } from "express"
import ApiError from "../utils/ApiError"
import { StatusCodes, ReasonPhrases } from "http-status-codes"
import  jwt ,{  JwtPayload , SignOptions } from "jsonwebtoken"
import { CookieOptions } from "express"
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
    

}

const logoutController = async (req: Request, res: Response): Promise<void> => {


}

export {
    signupController,
    signinController,
    logoutController
}