// req.body.userId = id 
// token from req.cookie
// from token extract payload from paload extract  id
// and populate into req.body


// you should not throw error in middleware.-> wrap in next ()

import ApiError from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


const userMiddleware = async (req, res, next) => {

    try {
        // u could extract it from header also [Bearer token].

        const { token } = req.cookies

        if (!token) {
            return next(new ApiError(401, "unauthorized"))
        }

        // now verify the user. from jwt.verify this return the paylaod wihch will have the ._id
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)


       // extracting the id of the user.
        const {id} = decoded

         if (!id) {
            console.log(`error in middleware.`);
            return next(new ApiError(400, "unauthorized"))
        }

        req.body.userId = id
        
        next()
    }
    catch (error) {
        console.log(`error in middleware`);
        console.log(`${error.message}`);
       return  next(new ApiError(403, "Invalid or Expired Token"))

    }

}


export default userMiddleware