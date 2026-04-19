import dotenv from "dotenv"
import { JwtPayload } from "jsonwebtoken"
dotenv.config({quiet:true}) 
export const env={

   JWT_SECRET_KEY: process.env. JWT_SECRET_KEY as  string
   
}