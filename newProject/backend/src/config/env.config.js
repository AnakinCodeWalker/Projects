import dotenv from "dotenv"
dotenv.config()

const env = {


    PORT: process.env.PORT,
    BASE_URL: process.env.BASE_URL,
    ORIGIN: process.env.ORIGIN,

    MONGO_URL: process.env.MONGO_URL,

    // mail configiration
    MAILTRAP_HOST: process.env.MAILTRAP_HOST,
    MAILTRAP_PORT: process.env.MAILTRAP_PORT,
    MAILTRAP_USERNAME: process.env.MAILTRAP_USERNAME,
    MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD,
    MAILTRAP_SENDEREMAIL: process.env.MAILTRAP_SENDEREMAIL,

    //  tokens
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES_IN,

    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES_IN,


    //cloudinary configuration

    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,

    // cloudinary 
    FOLDER_NAME: process.env.FOLDER_NAME,


    // RAZORPAY CONFIGURATION

    RAZORPAY_KEY: process.env.RAZORPAY_KEY,
    RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
   
   
    NODE_ENV: "TESTING"

    // NODE_ENV : "development"  
}

export default env