import {Request,Response,NextFunction} from 'express';
import { app } from '../app.js';
import cookieParser from "cookie-parser";
app.use(cookieParser());
import jwt , {JwtPayload} from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import {env} from "../config/env.js"

const extractToken = (req: Request): string | undefined =>{

    //if cookies mai token hai ..
 if(typeof req.cookies?.token == "string"){
    return req.cookies.token
 }
 
  const authHeader = req.headers.authorization;
  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

 else if(typeof req.params?.token === "string"){
 return req.params.token
 }

 else if(typeof req.body?.token === "string"){
    return req.body.token ;
 }

    return undefined ;
}

//  in a middleware you dont throw the error u pass it into next .
const authMiddleware =(req:Request ,res:Response ,next:NextFunction): void =>{   
   

   let {token} = req.cookies

   if (!token) {
    const authHeader = req.headers.authorization;

    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }
   // const token  = extractToken(req);
    if(!token){
       return next(new ApiError(401,"Invalid / expried Token"))
}


   
let decodedToken  =  jwt.verify(token,env.JWT_SECRET_KEY)
 
type userid = string | JwtPayload
   
// @ts-expect-error
const userId : userid  = decodedToken.id

   if(!userId)
      return next(new ApiError(401,"Unauthorized"))

   // @ts-expect-error
   req.userId = userId
   next()


}
export {authMiddleware}