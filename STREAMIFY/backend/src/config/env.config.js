import dotenv from "dotenv"
dotenv.config({ quiet:true })

const env = {

    PORT: process.env.PORT,
    ORIGIN :process.env.ORIGIN,
    MONGO_URL: process.env.MONGO_URL,
    STREAM_API_KEY : process.env.STREAM_API_KEY,
    STREAM_API_SECRET : process.env.STREAM_API_SECRET,

    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY
}

export default env