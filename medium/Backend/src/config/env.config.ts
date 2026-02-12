import dotenv from "dotenv"
dotenv.config()

const env = {

    PORT: process.env.PORT as string,
    BASE_URL: process.env.BASE_URL as string,
    ORIGIN : process.env.ORIGIN,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES_IN as string,

    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES_IN as string,

}

export default env