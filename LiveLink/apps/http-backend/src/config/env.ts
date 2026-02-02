//  form here you will import things out there..

import dotenv from "dotenv"
dotenv.config()
const env  ={
PORT   : Number(process.env.PORT),
ORIGIN : process.env.ORIGIN as string ,

// MONGO_URL :

JWT_ACCESS_TOKEN : process.env.JWT_ACCESS_TOKEN as string ,
JWT_REFRESH_TOKEN :process.env.JWT_REFRESH_TOKEN as string ,

JWT_ACCESS_TOKEN_EXPIRY :process.env.JWT_ACCESS_TOKEN_EXPIRY as string ,
JWT_REFRESH_TOKEN_EXPIRY :process.env.JWT_REFRESH_TOKEN_EXPIRY as  string ,

}

export{env}

