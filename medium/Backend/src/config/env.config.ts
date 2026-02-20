import dotenv from "dotenv"
dotenv.config()

const env = {


    PORT: process.env.PORT as string,
    BASE_URL: process.env.BASE_URL as string,
    ORIGIN: process.env.ORIGIN,

    // mail configiration
    MAILTRAP_HOST: process.env.MAILTRAP_HOST as string,
    MAILTRAP_PORT: process.env.MAILTRAP_PORT as string,
    MAILTRAP_USERNAME: process.env.MAILTRAP_USERNAME as string,
    MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD as string,
    MAILTRAP_SENDEREMAIL: process.env.MAILTRAP_SENDEREMAIL as string,

    //  tokens
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES: Number(process.env.JWT_ACCESS_EXPIRES_IN),

    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES: Number(process.env.JWT_REFRESH_EXPIRES_IN),


    //cloudinary configuration

    cloud_name: process.env.CLOUD_NAME as string,
    api_key: process.env.API_KEY as string,
    api_secret: process.env.API_SECRET as string,




    NODE_ENV: "TESTING"

    // NODE_ENV : "development"  
}

export default env