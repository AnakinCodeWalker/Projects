import { Request, Response,NextFunction } from "express";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";


const authMiddleware = async (req:Request,res:Response,next:NextFunction) => {
    

}

export default authMiddleware