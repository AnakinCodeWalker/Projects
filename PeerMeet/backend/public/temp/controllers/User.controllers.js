import User from "../models/User.model.js"
const { StatusCodes } = require("http-status-codes");
import dotenv from "dotenv"
import ApiError from "../utils/ApiError.js";
dotenv.config()


const register = async (req, res) => {

    // get data from the user
    //  verify the data
    //  check if user already exists
    // hash the passowrd 
    // create a user
    // create a token
    // save the token in the db 
    //  send the token to the user via mail .
    //  return the user object remove the password and refresh token


    try {
        const { name, userName, password } = req.body;

        if (!name || !userName || !password)
            throw new ApiError(304, "All credentials are required")

        const existingUser = await User.findOne({ userName })

        if (existingUser) {
            throw new ApiError(StatusCodes.CONFLICT, "userName already Exists")
        }

        //password saved to the db also .

        const newUser = await User.create({
            name,
            userName,
            password
        })

        if (!newUser)
            throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Can not create user")

        console.log("Sending the user : ");
        console.log(newUser);
        const user = await User.findById(newUser._id).select("-password  -resetPasswordToken")


        res.status(201).json(new ApiResponse(StatusCodes.OK, "user Registered Successfully", { user }))


    } catch (error) {

        console.log("error in register")
        console.log(`${error.message}`);
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "can not register")
    }


}

const login = async (req, res) => {

    const {email ,password} = req.body ;

    if(!email || !password){
throw new ApiError( StatusCodes.BAD_REQUEST,"Invalid Credentails")
    }

    const user = await User.findOne({email})

    if(!user)
        throw new ApiError(StatusCodes.UNAUTHORIZED ,"Invalid credentails")


    const isPasswordCorrect =  await user.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid Password")
    }

    const token = crypto.randomBytes(32).toString("hex")

    user.token =token
    await user.save()

 res.status(200).json(new ApiResponse(StatusCodes.OK, " login Successfull"))

}


export {
    login,
    register
}