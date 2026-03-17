import dotenv from "dotenv"
dotenv.config()

const env ={
    PORT : process.env.PORT,
    MONGOURI : process.env.MONGOURI
}

export default env