import dotenv from "dotenv"
dotenv.config({ quiet:true })

const env = {

    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    STREAM_API_KEY : process.env.STREAM_API_KEY,
    STREAM_API_SECRET : process.env.STREAM_API_SECRET

}

export default env