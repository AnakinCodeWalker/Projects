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
const userMiddleware =(req:Request ,res:Response ,next:NextFunction): void =>{   
   
     /*

     const token : string | undefined = req.cookies?.token ||
                    req.headers.authorization ||
                    req.params ||
                    req.body.token;

                    */

   const token  = extractToken(req);
    if(!token){
        next(new ApiError(304,"Invalid / expried Token"))
}
    else{    

        type token = string |JwtPayload
   
let decodedToken :token  =  jwt.verify(token,env.JWT_SECRET_KEY)

   const id : string  = decodedToken.id

}
    // console.log(`${token}`);
    // const decodetoken = jwt.verify()
 
    




}
export {userMiddleware}