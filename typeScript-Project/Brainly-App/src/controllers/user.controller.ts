import { Request, Response } from "express";
import User from "../models/User.model.js";
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {randomBytes} from "crypto"
import { transporter } from "../utils/mailSender.js";
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

// add zod validations.


//  async function returns a promise 
const signup = async (req: Request, res: Response): Promise<void> => {

  // get data from the user
    //  verify the data
    //  check if user already exists
    // hash the passowrd 
    // create a user
    // save the token in the db 
    //  send the token to the user via mail .
    //  return the user object remove the password and refresh token


    // type assertion..
    const { userName, password, email } = req.body as{
        userName : string,
        password : string,
        email : string
};

    if(!userName||!password||!email)
        throw new ApiError(403,"All credentials are required")

    // u dont have to provide the type here  as while u were creating the model u defined it     
const findUser = await User.findOne({
        email
    })

    // create the ApiResponse class and ApiError class first
    if(findUser){
    console.log(`User with this credentials already exists`);
    throw new ApiError(403,"User already Exists")
}

const newUser = await User.create({
    userName,
    email,
    password
})

//  genrating a token and sending to the user and  saving on db.

const token = await randomBytes(32).toString("hex")
console.log(`sending to the token : ${token}`);


// saving to the db
newUser.verificationToken =token 
await newUser.save()
console.log(`token saved to db`);
console.log(newUser);


// sending the mail

// 1.creating the transporter to send mail


//  now create a verfication link..
// this link is sent to user via  mail..
const verificationLink = process.env.BASE_URL+"api/v1/verify?token="+token  


// / now sending the mail

    const mailOption = {
        from: process.env.MAILTRAP_SENDEREMAIL, //provided by the nodemailer
        to: newUser.email,
        subject: "Verify Your Email",
        // Plain-text version of the message
        html: "<b>Confriming your email</b>", // HTML version of the message

        // the link with token is sent to user mail
        text: `Hi ${newUser.userName}, please verify your email: ${verificationLink}`,
    }

    
    try {
        //Sending the mail.
        await transporter.sendMail(mailOption)
        console.log(`mail sent successfully`);

    } catch (error) {
        if(error instanceof Error){   // 
        console.log(`error in sending the mail`);
        console.log(`${error.message}`);
        throw new ApiError(500, "can not send mail")
    }}

// then finding the created user and remove vulnerable details from it.
const createdUser = await User.findById(newUser._id)
 .select("-password -refreshToken")

if(!createdUser)
    throw new ApiError(500, "User not created")

// returning the newly created user.
    res.status(201).json(new ApiResponse(201,"User created Successfully", createdUser))

}


const userVerification =async (req:Request ,res:Response):Promise<void>=>{

   // get the token from the url
    // find the user from the token
    //  verify the token
    // in model set isVerified = true .
    // remove the token from the user side.
    //    return response.


    const {token} = req.params as {
        token : string
    } ;
    if(token)
        throw new ApiError(304,"Token is required")

   try {
     const findUser = await User.findOne({token})
    
     if(!findUser) 
        throw new ApiError(304,"token expired or Invalid Token")
     
     findUser.isVerified = true
     findUser.verificationToken=null
     await findUser.save()

   } catch (error) {

    if(error instanceof Error){
        console.log(`error in verifying the token`);
        console.log(`${error.message}`);
throw new ApiError (500,"try after sometime")
    
}
   }

}

const signin = async (req:Request,res:Response) :Promise<void>=> {
  
    const {email ,password} = req.body as {
        email : string,
        password : string
    }
    const findUser = await User.findOne({email})
    if(!findUser)
        throw new ApiError(309,"Invalid email or passoword")
    

    const isPasswordCorrect = await bcrypt.compare(password,findUser.password)
    
    if(!isPasswordCorrect==false)
        throw new ApiError(309,"Invalid Password")

    const payload  = {
       id :  findUser._id 
    }
    const token  : string = jwt.sign(payload,
        process.env.JWT_SECRET_KEY as string,
        {
        expiresIn : process.env.JWT_SECRET_KEY_EXPIRY as string
    })
} 


const refreshToken = jwt.sign(payload ,
     process.env.JWT_REFRESH_KEY as string,
     {
        expiresIn : process.env.JWT_REFRESH_KEY_EXPIRY as string
     })

export {signup,
    userVerification,
    signin
}