//  you have to add global d.ts for  middlewares



//  ?? if left side is null use right side ki value.

import { Request, Response,NextFunction } from "express";
import ApiError from "../utils/ApiError.js";
import  jwt from "jsonwebtoken";
import env from "../config/env.config.js";

interface jwtPayloadType  {
    id : number
   }
   
  
const authMiddleware = async (req:Request,res:Response,next:NextFunction) => {

    const token  = req.headers["authorization"]  ?? req.cookies?.accessToken ?? ""
   
    if(!token)
    return next(new ApiError(401,"No token provided"))

   
    const decode =  jwt.verify(token,env.JWT_ACCESS_SECRET) as jwtPayloadType

    if(!decode)
       return next(new ApiError(401,"No token provided"))
   
   const id = decode.id 

   if(!id)
      return next(new ApiError(401, "unauthorized"))
///////////////////////
   req.body.id =  decode.id 
        
        next()
}

export default authMiddleware