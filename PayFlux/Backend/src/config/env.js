import dotenv from "dotenv"
dotenv.config()


const env = {

    PORT: Number(process.env.PORT),

    BASEURL: process.env.BASEURL,

    // cors configaration..
    ORIGIN: process.env.ORIGIN,
    METHODS: ['OPTIONS', 'DELETE', 'PATCH', 'GET', 'POST', 'PUT'], //CORS METHODS
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],

    // mongo db credentials..
    MONGOURI: process.env.MONGOURI,

    // json-web-token credentials..

    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,

    JWT_ACCESS_TOKEN_EXPIRY: process.env.JWT_ACCESS_TOKEN_EXPIRY || "1d",
    JWT_REFRESH_TOKEN_EXPIRY: process.env.JWT_REFRESH_TOKEN_EXPIRY || "7d",

    // COOKIEOPTIONS
    NODE_ENV : process.env.NODE_ENV

}
export default env