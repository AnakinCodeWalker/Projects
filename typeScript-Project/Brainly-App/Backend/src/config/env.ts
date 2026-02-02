/* normal env --> mapping to env.ts --> rest of the codebase

TS file me ek object banta hai
jo normal .env se values leta hai
ur wahi object poore project me use hota hai

*/
//  at runtime this things will throw an error..

import dotenv from 'dotenv'
dotenv.config()

const env={
PORT : Number(process.env.PORT),//runtime conversion(converting the String port into a number)
ORIGIN : process.env.ORIGIN as string,
MONGO_URL: process.env.MONGO_URL as string ,// compile-time typing(telling ts to trust me as it is a String)
JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
JWT_SECRET_KEY_EXPIRY:process.env.JWT_ACCESS_TOKEN_EXPIRY as string,

 JWT_REFRESH_KEY:process.env.JWT_REFRESH_KEY as string,
 JWT_REFRESH_TOKEN_EXPIRY:process.env.JWT_REFRESH_TOKEN_EXPIRY as string
}

export {
    env
}