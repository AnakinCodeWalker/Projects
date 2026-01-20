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
MONGO_URL: process.env.MONGO_URL as string// compile-time typing(telling ts to trust me as it is a String)

}

export {
    env
}