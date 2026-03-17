import dotenv from "dotenv"
dotenv.config({quiet:true})  // this removes the number or env variables

const env = {

    PORT : process.env.PORT,
    MONGO_URL : process.env.MONGO_URL
    
}
export default env