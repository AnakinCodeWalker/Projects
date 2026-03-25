
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js"
import env from "../config/env.config.js";

const protectRoute = asyncHandler(async (req, res, next) => {

    // get the token .
  try {
      const token = req.cookies?.accessToken
          ?? req.headers["authorization"]?.replace("Bearer ", "")
          ?? req.body?.accessToken
      if (!token)
          return next(new ApiError(401, "Invalid token"))
  
      const decode = jwt.verify(token, env.JWT_SECRET_KEY)
  
console.log("COOKIES:", req.cookies);
console.log("TOKEN:", req.cookies?.accessToken);
      req.user = decode
  
      next()
  } catch (error) {
   console.log(error.message);
   console.log(error); 
  }
})

export default protectRoute