//  you have to add global d.ts for  middlewares



//  ?? if left side is null use right side ki value.

import { Request, Response,NextFunction } from "express";
import ApiError from "../utils/ApiError.js";
import  jwt from "jsonwebtoken";
import env from "../config/env.config.js";
import { asyncHandler } from "../utils/asyncHandler.js";


  
const authMiddleware = asyncHandler ((req:Request,res:Response,next:NextFunction) => {

    const token  = req.headers["Authorization"]  ?? req.cookies?.accessToken ?? ""
   
    if(!token)
    return next(new ApiError(401,"Invalid token"))

   
    const decoded =  jwt.verify(token,env.JWT_ACCESS_SECRET) 

    if(!decoded)
       return next(new ApiError(401,"No token provided"))
   
   //@ts-ignore // add global types  -- todo..
   req.userId =  decoded?.id 
        next()
})

export default authMiddleware