import ApiError from "../utils/ApiError.js";
import cookieParser from 'cookie-parser'

const authMiddleware = async (req,res,next) => {
    
    next()
}

export default authMiddleware