// import dotenv from "dotenv"
// dotenv.config()

import dotenv from "dotenv"
import { JwtPayload } from "jsonwebtoken"
dotenv.config({quiet:true})

export const env = {

   Port: process.env.port as string,
   origin: process.env.ORIGIN as string,
   JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as  string,

}