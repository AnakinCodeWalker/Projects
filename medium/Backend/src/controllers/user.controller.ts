// write forgot , reset , refresh ,update  controller

import { CookieOptions, Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { signupInput, signupType, signinInput, signinType ,updateDetailsInput,updateDetailsType} from "@anakincodewalker/common";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"
import { randomBytes } from "node:crypto";
import env from "../config/env.config.js";
import nodemailer from "nodemailer"
import crypto from "crypto"

//  you have to add global d.ts for  middlewares


const signup = asyncHandler(async (req: Request<{}, {}, signupType>, res: Response): Promise<void> => {
    // get data from the user
    //  verify the data
    //  check if user already exists
    // hash the passowrd 
    // create a user
    // create a token
    // save the token in the db 
    //  send the token to the user via mail .
    //  return the user object remove the password and refresh token

    const result = signupInput.safeParse(req.body) // signupType as request generics

    // safeparse returns an object 
    // {  success: true ; data: signupType;}
    // { success: false, error: ... } -- if fails

    if (!result.success)
        throw new ApiError(400, "validation failed")

    // id user exists return an error..
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email: result.data.email },
                {
                    userName: result.data.userName
                },
            ]
        }
    })

    if (existingUser) {
        if (existingUser.email == result.data.email)
            throw new ApiError(409, "email already exists")
        if (existingUser.userName == result.data.userName)
            throw new ApiError(409, "username already taken")
    }

    const { email, firstName, lastName, userName, password } = result.data
    // hashed the password  then create a user..

    const hashedPassowrd = await bcrypt.hash(password, 10)

    const newUser = await prisma.user.create({
        data: {
            userName,
            firstName,
            lastName,
            email,
            passwordHash: hashedPassowrd
        },
        select: {
            id: true,
            userName: true,
            firstName: true,
            lastName: true,
            email: true,
        }


    })

    if (!newUser)
        throw new ApiError(400, "Internal server error")

    //  for email
    const token = randomBytes(32).toString("hex")
    const hashedToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    console.log(`${token}`);

    // save the token into db and send it to the uer via mail.
    //  tokens could be multiple kyuki , user can hit again and agian for the otps..

    // saving haashed token  in the  db
    await prisma.EmailVerificationToken.create({
        data: {
            userId: newUser.id,
            token: hashedToken,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60) // token expiry time setting up
        }
    })

    const transporter = nodemailer.createTransport({
        host: env.MAILTRAP_HOST,
        port: Number(process.env.MAILTRAP_PORT),
        secure: false, // Use true for port 465, false for port 587
        auth: {
            user: env.MAILTRAP_USERNAME,
            pass: env.MAILTRAP_PASSWORD,
        },
    });
    //  send the token to the user via mail .

    // normal token to the user
    const verificationLink = `${env.BASE_URL}/api/v1/users/verify-email/${token}`

    const mailOption = {
        from: process.env.MAILTRAP_SENDEREMAIL, //provided by the nodemailer
        to: newUser.email,
        subject: "Verify Your Email",
        // Plain-text version of the message
        html: "<b>Confriming your email</b>", // HTML version of the message

        // creating a link.. and sending the token into it.
        text: `Hi ${newUser.firstName}, please verify your email: ${verificationLink}`,


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
    res.status(201).json(new ApiResponse(201, "user created successfully", {
        newUser
    }))

})

const verifyEmail =asyncHandler( async (req: Request<{}, {}, {}>, res: Response): Promise<void> => {
    // get the token from the url
    // find the user from the token
    // user has normal token db has hashed token
    //  verify the token
    // in model set isVerified = true .
    // remove the token from the user side.
    //    return response.


    //  to access data from the url use req.params
    const url = req.url

    const urlParams = new  URLSearchParams(url.split("?")[1])
    
    const token = urlParams.get('token')

    console.log(`Token is : ${token}`);

        if (!token)
            throw new ApiError(400, "Can not Find Token")

        // hashing the normal token the user has
        const hashedUserToken = await crypto
            .createHash("sha256")
            .update(token)
            .digest("hex")


        // find the user provided token with the db token
        const userWithToken = await prisma.EmailVerificationToken.findFirst({
            where: {
                token: hashedUserToken
            }
        })  // will return an object

        if (!userWithToken)
            throw new ApiError(403, "Invalid or expired token");

        // check token expired...
        if (userWithToken.expiresAt < new Date())
            throw new ApiError(403, "Token expired")

        //  added transaction to avoid race codition..

        await prisma.$transaction([
            prisma.user.update({
                //  userWithToken iska userId extract karo then user model mai add kro is verified true. 
                where: {
                    id: userWithToken.userId,  //user table ki id ,specific user ki jiski token hai
                }, data: {
                    isVerified: true,
                },
            }),

            // delete the token after verification.

            prisma.EmailVerificationToken.delete({
                where: {
                    id: userWithToken.id  // iski apni id 
                }
            })
        ])

        console.log(`successfully verified.`);
        res.status(200).json(new ApiResponse(200, "Verified Successfully"))

})



const signin = asyncHandler(async (req: Request<{}, signinType, {}, {}>, res: Response): Promise<void> => {


    const result = signinInput.safeParse(req.body)
    // returns  an object of {succes : true / flase and data }

    if (!result.success)
        throw new ApiError(400, "validation failed")

    //  check if user signup or not..
    const foundUser = await prisma.user.findUnique({
        where: {
            email: result.data.email
        }
    })

    if (!foundUser)
        throw new ApiError(400, "singup first")

    const isPasswordCorrect = await bcrypt.compare(result.data.password, foundUser.passwordHash)
    if (!isPasswordCorrect)
        throw new ApiError(304, "Invalid Password")

    const payload = {
        id: foundUser.id
    }

    const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
        expiresIn: env.JWT_ACCESS_EXPIRES
    })


    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRES
    })

    //  saving token in db
    const refreshTokenExpiry = new Date(
        Date.now() + Number(env.JWT_REFRESH_EXPIRES)
    );

    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId: foundUser.id,
            expiresAt: refreshTokenExpiry
        }
    })




    // cookies  is the box which contains accesstoken and refresh token

    const accessTokenCookieOptions: CookieOptions = {
        httpOnly: true,
        secure: env.NODE_ENV === "production", // https in prod
        sameSite: env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: Number(env.JWT_ACCESS_EXPIRES),
    }

    //  check cookie 

    // //////// frontend mai 
    //  axios.post(url, data, { withCredentials: true });

    const refreshTokenCookieOptions: CookieOptions = {
        httpOnly: true,
        secure: env.NODE_ENV === "production", // https in prod
        sameSite: env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: Number(env.JWT_REFRESH_EXPIRES)
    }

    //  set cookies and accesstoken.

    res.status(200)
        .cookie("accessToken", accessToken, accessTokenCookieOptions)
        .cookie("refreshToken", refreshToken, refreshTokenCookieOptions)
        .json(new ApiResponse(200, "user logged in"))

})






const refreshAccessToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {

})


const updateDetails = asyncHandler(async (req: Request<{},{},updateDetailsType,{}>, res: Response): Promise<void> => {

    // @ts-ignore
    const userId = req.userId ?? ""

    const result = updateDetailsInput.safeParse(req.body)

    if(result.success==false)
        throw new ApiError(400 ,"Validation error")

 const { userName, firstName, lastName, email, password } = result.data;

    const updatedUser = await prisma.user.update({
        where:{
            id:userId
        },data:{  //on code directory check object.js
//username hai to dalo nhi to req.data.userName update krdo agar aya hai to
            ...(userName&&{userName})  // --> short-circuit if , 1st false then second true. vice versa 
            ...

        }, select: {
        id: true,
        userName: true,
        firstName: true,
        lastName: true,
        email: true,
        isVerified: true
      }
    })
   
    res.status(200)
            .json(new ApiResponse(200, "user updated",{
                user: updatedUser
            }))


})

const forgetPassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {

})

const resetPassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {

})






const getCurrentUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    
    // @ts-ignore
    const id = req.userId

    const user = await prisma.user.findFirst({
        where: {
            id: id
        }, include: {
            blog: {
                where: {
                    published: true
                }
            }
        }
    })

    if (!user)
        throw new ApiError(304, "User does not exist")

    res.status(200).json(new ApiResponse(200, "user Details", {
        userDetail: user
    }))
})


const logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {


    // delete the refresh token from the model , and clear cookies..
    const refreshTokenFromCookie = req.cookies.refreshToken

    if (!refreshTokenFromCookie)
        throw new ApiError(400, "No refresh token");
    // delete the refresh token from the cookie and db

    await prisma.refreshToken.delete({
        where: {
            token: refreshTokenFromCookie
        }
    })
    res.clearCookie("accessToken")
    res.clearCookie("refreshToken")

    res.status(200).json(new ApiResponse(200, "Logged out successfully"));

})




const getUserProfile = asyncHandler(async (req: Request<{}, {}, {}, {}>, res: Response): Promise<void> => {


const url = req.url 
const urlParams = new URLSearchParams(url.split("?")[1])
    const userName = urlParams.get('userName')

    const finduser = await prisma.user.findUnique({
        where: {
            userName: userName,
            include: {
                blog: {
                    where: {
                        published: true,
                    }
                }
            }
        },
        select: {
            userName: true,
            firstName: true,
            lastName: true,
        }, orderBy: {
            createdAt: `desc`
        }


    })

    if (!finduser)
        throw new ApiError(304, "User does not exist")

    res.status(200).json(new ApiResponse(200, "user Details", {
        userDetail: finduser
    }))
})



export {
    signup,
    signin,
    verifyEmail,
    refreshAccessToken,
    updateDetails,
    forgetPassword,
    resetPassword,
    getCurrentUser,
    logout,
    getUserProfile
}

/*
// input  by user check from zod
// request generic  aligned to user input based on zod schema
    // aligned to db

*/

// safeparse returns an object
// {  success: true ; data: signupType;}
// { success: false, error: ... } -- if fails


// Request<Params, ResBody, ReqBody, ReqQuery>request generics
// last wala generic is optional so u can do {} ,{} ,{} , leave it

/* prisma.modelName.action({
  where: {},
  data: {},
  include: {},
  select: {},
})

findUnique  → single object
findFirst   → single object
findMany    → array of objects

*/

/*
Params typing → Router + Controller dono ko pata hona chahiye
Body typing   → Sirf Controller ko pata ho to bhi chalega
Query typing  → Mostly safe
*/

/*
req.params  → always string  key and value as well -- less safe although better approach will be using the custom key : value
req.query   → string | string[] | undefined
req.body    → jo tum define karo
*/


/*
Read / Update / Delete  → where mostly hota hai
Create                  → where nahi hota
findMany                → where optional
*/



//  todo create a seprate  model for refresh token and store refresh token in it
// put a limit on it ki kitna user login kr skta - 5.

// findUnique  -- object or null