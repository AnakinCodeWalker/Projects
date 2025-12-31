import { Request, Response } from "express";
import User from "../models/User.model.js";
import {ApiError} from "../utils/ApiError.js"
// provide a return type in here
const signup = async (req: Request, res: Response): void => {

    const { userName, password, email } = req.body;
// u dont have to provide the type here  as while u were creating the model u defined it 
    const findUser = await User.findOne({
        userName: userName,
        email: email
    })

    // create the ApiResponse class and ApiError class first
    if(findUser){
    console.log(`User with this credentials already exists`);
    return new ApiError()
        
}
}

export default signup