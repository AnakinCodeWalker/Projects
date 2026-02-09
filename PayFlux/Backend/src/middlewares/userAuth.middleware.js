import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js"

const userAuthMiddlware = async (req,res,next) => {
    

    next()
} 

// const payload = {
//   userId : foundUser._id
// }

export default userAuthMiddlware