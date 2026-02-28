import ApiError from "../utils/ApiError.js";
import cookieParser from 'cookie-parser'
import jwt from "jsonwebtoken";

const authMiddleware = async (req,res,next) => {
    
    next()
}

export default authMiddleware