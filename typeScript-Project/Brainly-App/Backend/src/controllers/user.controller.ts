// make generic iternfaces avoid , type issue in ts  

// Request<Params, ResBody, ReqBody, ReqQuery>  - this is order in which you will put interfaces
//
//  Request<
//   Params,    // req.params
//   ResBody,   // res.json()
//   ReqBody,   // req.body
//   ReqQuery   // req.query
// >
//
//  or if you want ki only  ReqQuery then make others {} empty ts will ignore them..


//  if u do select: false then when you return the document , usme se yeh bydefault unselected rhega


import { Request, Response } from "express";
import User from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { randomBytes } from "crypto"
import { transporter } from "../utils/mailSender.js";

import bcrypt from 'bcrypt'
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { CookieOptions } from "express";
import type { StringValue } from "ms";
import crypto from "crypto"
import nodemailer from "nodemailer"
import { env } from '../config/env.js'


// add zod validations.


//  async function returns a promise 
const signup = async (req: Request, res: Response): Promise<void> => {

    try {
        // get data from the user
        //  verify the data
        //  check if user already exists
        // hash the passowrd 
        // create a user
        // save the token in the db 
        //  send the token to the user via mail .
        //  return the user object remove the password and refresh token

        interface RegisterCredentials {
            userName: string,
            password: string,
            email: string
        }

        const { userName, password, email } = req.body as RegisterCredentials

        if (!userName || !password || !email)
            throw new ApiError(403, "All credentials are required")

        // u dont have to provide the type here  as while u were creating the model u defined it     
        const findUser = await User.findOne({
            email
        })

        // create the ApiResponse class and ApiError class first
        if (findUser) {
            console.log(`User with this credentials already exists`);
            throw new ApiError(403, "User already Exists")
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
        newUser.verificationToken = token
        newUser.verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);  // 24 hours
        await newUser.save()
        console.log(`token saved to db`);
        console.log(newUser);


        // sending the mail

        // 1.creating the transporter to send mail


        //  now create a verfication link..
        // this link is sent to user via  mail..
        const verificationLink = process.env.BASE_URL + "api/v1/verify?token=" + token


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
            if (error instanceof Error) {   // 
                console.log(`error in sending the mail`);
                console.log(`${error.message}`);
                throw new ApiError(500, "can not send mail")
            }
        }

        // then finding the created user and remove vulnerable details from it.
        const createdUser = await User.findById(newUser._id)
            .select("-password -refreshToken")

        if (!createdUser)
            throw new ApiError(500, "User not created")

        // returning the newly created user.
        res.status(201).json(new ApiResponse(201, "User created Successfully", createdUser))

    } catch (error) {
        if (error instanceof Error)
            console.log(`error in signup ${error.message}`);
        throw new ApiError(304, "Internal server Error")
    }

}


const userVerification = async (req: Request, res: Response): Promise<void> => {

    // get the token from the url
    // find the user from the token
    //  verify the token
    // in model set isVerified = true .
    // remove the token from the user side.
    //    return response.


    const { token } = req.params as {
        token: string
    };
    if (!token)
        throw new ApiError(304, "Token is required")

    try {
        const findUser = await User.findOne({ verificationToken: token })

        if (!findUser)
            throw new ApiError(304, "token expired or Invalid Token")

        findUser.isVerified = true
        findUser.verificationToken = null
        await findUser.save()

    } catch (error) {

        if (error instanceof Error) {
            console.log(`error in verifying the token`);
            console.log(`${error.message}`);
            throw new ApiError(500, "try after sometime")

        }
    }

}

const signin = async (req: Request, res: Response): Promise<void> => {

    const { email, password } = req.body as {
        email: string,
        password: string
    }
    const findUser = await User.findOne({ email })
    if (!findUser)
        throw new ApiError(309, "Invalid email or passoword")


    const isPasswordCorrect = await bcrypt.compare(password, findUser.password)

    if (!isPasswordCorrect)
        throw new ApiError(309, "Invalid Password")

    // even without it will do the type infrence and work perfectly.
    //  you have to use JwtPayload and  SignOptions
    // interface payLoad extends JwtPayload {
    //     id: string
    // }

    interface payLoad extends JwtPayload {
        id: string
    }

    const payload: payLoad = {
        id: findUser._id.toString(),
    };

    const accessSecret = env.JWT_SECRET_KEY;
    const accessExpiry = env.JWT_SECRET_KEY_EXPIRY;

    const accessOptions: SignOptions = {
        expiresIn: accessExpiry as StringValue,
    }

    const token = jwt.sign(payload, accessSecret, accessOptions);

    const refreshSecret = env.JWT_REFRESH_KEY;
    const refreshExpiry = env.JWT_REFRESH_TOKEN_EXPIRY;

    if (!refreshSecret || !refreshExpiry) {  // they are either string or undefined after narrwoing they are string
        throw new ApiError(500, "Refresh token env missing");
    }

    const refreshOptions: SignOptions = {
        //  as unknown as string  -- tells first forget about the type and now remember what i am telling.
        expiresIn: refreshExpiry as unknown as StringValue,
    }

    const refreshToken = jwt.sign(payload, refreshSecret, refreshOptions);


    if (!(token || refreshToken))
        throw new ApiError(304, "Token expired or not available")

    //  this CookieOptions is already provided by the cookieParser
    const cookieOptions: CookieOptions = {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 // age of the cookie.
    }


    //   SAVE IT to the browser ..
    res.cookie("token", token, cookieOptions)
    res.cookie("refreshToken", refreshToken, cookieOptions)

    //  now save the cookie to the db as well

    findUser.refreshToken = refreshToken;
    await findUser.save()

    const user = User.findById(findUser._id).select("-password -refreshToken ")
    if (!user)
        throw new ApiError(500, "internal server error")

    res.status(200).json(new ApiResponse(200, "User logged in", user))
}


const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    /*
          Checks if user exists
          Generates a secure reset token
          
          Sets token expiry time
          Sends reset link via email
       */

    const { email } = req.body as {
        email: string
    }
    if (!email)
        throw new ApiError(300, "credentials required")

    const foundUser = await User.findOne({ email })

    if (!foundUser)
        throw new ApiError(300, "Unauthorized")

    // using crypto for hashing because it is fast and deterministic also 
    //  crypto is 
    const token = await randomBytes(32).toString("hex")


    // Hashes the token and stores it in DB

    const hashedtoken = crypto
        .createHash("sha256")
        .update("token")
        .digest("hex")

    //  store into db

    foundUser.resetPasswordToken = hashedtoken

    //  iska type ko convert krna hoga , as NativeDate or date.

    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000)
    foundUser.resetPasswordExpiry = resetTokenExpiry
    await foundUser.save({ validateBeforeSave: false })


    // send the hashed token to user

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: Number(process.env.MAILTRAP_PORT),
        secure: false, // Use true for port 465, false for port 587
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD,
        },
    });

    // link on this route.
    const ReserPasswordLink = `${process.env.BASE_URL}/api/v1/user/reset-password/${token}`;

    const mailOption = {
        from: process.env.MAILTRAP_SENDEREMAIL, //provided by the nodemailer
        to: foundUser.email,
        subject: "Reset Your Password",
        // Plain-text version of the message
        html: "<b>Click below to reset your password</b>", // HTML version of the message

        // creating a link.. and sending the token into it.
        text: `Hi ${foundUser. userName}, please verify your email: ${ReserPasswordLink}`,


    }
    //  transporter is created 
    //  mailOptions are created 
    //  now send mail to the user via transporter.sendmail() .

    try {
        //Sending the mail.
        await transporter.sendMail(mailOption)
        console.log(`mail sent successfully`);

    } catch (error) {
        if (error instanceof Error) {
            console.log(`error in sending the mail`);
            console.log(`${error.message}`);
            throw new ApiError(500, "can not send mail")
        }
    }


    // res.status(200).json(new ApiResponse(200, "Mail sent Successfully"), {
    //     user: responseUser
    // })


}

interface ResetPasswordParams {
  token: string;
}

interface ResetPasswordBody {
  newPassword: string;
}

const resetPassword = async (
  req: Request<ResetPasswordParams, {}, ResetPasswordBody>,
  res: Response
): Promise<void> => {

// get the token 
//  check the token
 // get the password 
//   find the password and update it 
//return success.. 


 //    how do i extract token from the params..
      
const {token} = req.params

const {newPassword} = req.body 

if(!newPassword)
    throw new ApiError( 304,"please provide new password")

// hashing the token to match if the user token and db token matches or not ?

const hashedToken = crypto.createHash("sha256")
                           .update(token)
                           .digest("hex");


const findUser =  await User.findOne({
     resetPasswordToken: hashedToken, 
     resetPasswordExpiry:{
        $gt :Date.now()   // checking jiska ki date ho expire na ho woh  hi token...[expired token]
     }
})


if(!findUser)
throw new ApiError(304,"Invalid token / expired token")

    findUser.password = newPassword


    //  fix this later on.............. add interface in model  and extednthe object
   // @ts-expect-error
    findUser.resetPasswordToken = undefined;
       // @ts-expect-error
    findUser.resetPasswordExpiry = undefined;

    await findUser.save()

// res.status(200).json(
//       new ApiResponse(200, "Password reset successful")
//     );

}

    

const signout = async (req: Request, res: Response): Promise<void> => {

    // first check if the user is logged in or not  ? --> from middleware.
    //  user hit a logout page 
    // remove the refresh token from db and user cookie.
    // userId  which is inserted into the body in the middleware.



}

export {
    signup,
    userVerification,
    signin,
    forgotPassword,
    resetPassword,
    signout
}