import { Request  , Response , NextFunction} from "express" 
import ApiError from "../utils/ApiError"
import { StatusCodes } from "http-status-codes"

const userAuthMiddleware =  ( req : Request,res:Response , next : NextFunction) :void => {
    try {
        
        next()
    } catch (error) {
        console.log(`error in middleware${error.message}`);
        next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR))
    }
}

export {
    userAuthMiddleware
}