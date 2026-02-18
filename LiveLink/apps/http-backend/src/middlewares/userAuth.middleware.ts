
// ?? -- nullish   is left is empty use right side value
//  add global types.

import { Request  , Response , NextFunction} from "express" 
import ApiError from "../utils/ApiError.js"
import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import { env } from "../config/env.js"
const userAuthMiddleware =  ( req : Request,res:Response , next : NextFunction) :void => {
    try {


        // extract the token from the , header , if the token is not there fall to an empty string.
        const token = req.headers["authorization"]
                       ??  req.cookies?.accessToken 
                       ?? ""

if(token=="")
    return next(new ApiError(402,"Invalid token"))

const decoded = jwt.verify(token,env.JWT_ACCESS_TOKEN)

if(!decoded)
    return next(new ApiError(402,"Invalid token"))

//@ts-ignore
req.userId = decoded.userId

    } catch (error) {
        if(error instanceof Error)
        console.log(`error in middleware${error.message}`);
      return next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

export {
    userAuthMiddleware
}