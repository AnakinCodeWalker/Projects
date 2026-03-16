
//  crate a send mail utility function.
//  update the name of the model emailVerification 
//   maxAge: Number(env.JWT_ACCESS_EXPIRES) 
/*
const refreshTokenExpiry = new Date(
  Date.now() + Number(env.JWT_REFRESH_EXPIRES)
);
*/
// updateDetails isme mai profile image ka option
// 2 chote controller refreshtoken and passwordupdate wala


import { CookieOptions, Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { signupInput, signupType, signinInput, signinType, updateDetailsInput, updateDetailsType } from "@anakincodewalker/common";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"
import { randomBytes } from "node:crypto";
import env from "../config/env.config.js";
import nodemailer from "nodemailer"
import crypto from "crypto"



//  you have to add global d.ts for  middlewares

//  imporvement for later 1 profile image for user.

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

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
        data: {
            userName,
            firstName,
            lastName,
            email,
            passwordHash: hashedPassword
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
        port: Number(env.MAILTRAP_PORT),
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
        from: env.MAILTRAP_SENDEREMAIL, //provided by the nodemailer
        to: newUser.email,
        subject: "Verify Your Email",
        // Plain-text version of the message
        html: `
<h2>Email Verification</h2>
<p>Hi ${newUser.firstName}</p>
<p>Please verify your email by clicking below:</p>
<a href="${verificationLink}">Verify Email</a>
`,

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
            throw new ApiError(500, "User created but email could not be sent")
        }

    }
    res.status(201).json(new ApiResponse(201, "user created successfully", {
        newUser
    }))

})

const verifyEmail = asyncHandler(async (req: Request<{}, {}, {}>, res: Response): Promise<void> => {
    // get the token from the url
    // find the user from the token
    // user has normal token db has hashed token
    //  verify the token
    // in model set isVerified = true .
    // remove the token from the user side.
    //    return response.


    //  to access data from the url use req.params
    const url = req.url

    const urlParams = new URLSearchParams(url.split("?")[1])

    const token = urlParams.get('token')

    console.log(`Token is : ${token}`);

    if (!token)
        throw new ApiError(400, "Can not Find Token")

    // hashing the normal token the user has
    const hashedUserToken = crypto
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
    if (new Date() > userWithToken.expiresAt)
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
    res.status(200).json(new ApiResponse(200, "Email verified successfully. You can now login."))

})



const signin = asyncHandler(async (req: Request<{}, {}, signinType, {}>, res: Response): Promise<void> => {


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
        throw new ApiError(401, "Invalid Password")


    // if not verified then can not login 
    if (!foundUser.isVerified) {
        throw new ApiError(403, "Please verify your email first")
    }
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
        .json(new ApiResponse(200, "Login successful"))

})






const refreshAccessToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {

})


const updateDetails = asyncHandler(async (req: Request<{}, {}, updateDetailsType, {}>, res: Response): Promise<void> => {

    // @ts-ignore
    const userId = req.userId

    if (!userId)
        throw new ApiError(401, "Unauthorized")


    const result = updateDetailsInput.safeParse(req.body)

    if (result.success == false)
        throw new ApiError(400, "Validation error")

    const { userName, firstName, lastName, email, password } = result.data;
    if (email) {
        const existingEmail = await prisma.user.findUnique({
            where: { email }
        })

        if (existingEmail && existingEmail.id !== userId)
            throw new ApiError(409, "Email already in use")

    }
    const updatedUser = await prisma.user.update({
        where: {
            id: userId
            //  how spread operator work ?? 
            /*

            */

            // DYNAMIC SPREAD...

        }, data: {  //on code directory check object.js
            // if user has given some input then update else dont update it.
            ...(userName && { userName: userName }),  // --> if first is ture then second will execute.
            ...(firstName && { firstName }),    // user provided  value && {key : value  } in db..
            ...(lastName && { lastName: lastName }),
            ...(email && { email: email }),
            ...(password && { passwordHash: await bcrypt.hash(password, 10) })
        }, select: {
            id: true,
            userName: true,
            firstName: true,
            lastName: true,
            email: true,
            isVerified: true,
            blogs: true
        }
    })

    res.status(200)
        .json(new ApiResponse(200, "User details updated successfully", {
            user: updatedUser
        }))


})

const forgetPassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    /*
      
         Checks if user exists
         Generates a secure reset token
         Hashes the token and stores it in DB
         Sets token expiry time
         Sends reset link via email
      */

    const { email } = req.body as {
        email: string
    }

    const foundUser = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!foundUser)
        throw new ApiError(404, "User not found")

    const token = crypto
        .randomBytes(32)
        .toString("hex")

    const hashedResetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    console.log(`checking if both are same or not`);
    //@ts-ignore
    console.log(`userId from middleware ${req.userId}`);

    console.log(`userId from found record in db : ${foundUser.id}`);

    const updatedUser = await prisma.user.update({
        where: {
            id: foundUser.id,
            //or

        }, data: {
            resetPasswordToken: hashedResetPasswordToken,
            resetPasswordTokenExpiry: new Date(Date.now() + 15 * 60 * 1000)
        }
    })
    const transporter = nodemailer.createTransport({
        host: env.MAILTRAP_HOST,
        port: Number(env.MAILTRAP_PORT),
        secure: false, // Use true for port 465, false for port 587
        auth: {
            user: env.MAILTRAP_USERNAME,
            pass: env.MAILTRAP_PASSWORD,
        },
    });
    //  send the token to the user via mail .

    // normal token to the user
    const verificationLink = `${env.BASE_URL}/api/v1/users/reset-password/${token}`

    const mailOption = {
        from: env.MAILTRAP_SENDEREMAIL, //provided by the nodemailer
        to: foundUser.email,
        subject: "Reset Your Password",
        // Plain-text version of the message
        html: `
<h2>Email Verification</h2>
<p>Hi ${foundUser.firstName}</p>
<p>Reset your password by clicking on this link:</p>
<a href="${verificationLink}">Reset Password</a>
`,

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
            throw new ApiError(500, "email could not be sent")
        }

    }

    res.status(200)
        .json(new ApiResponse(200, "Password reset link sent to email", {
            resetPasswordToken: token
        })
        )

})




const resetPassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {

})






const getCurrentUser = asyncHandler(async (req: Request, res: Response): Promise<void> => {

     // @ts-ignore
    const userId = req.userId

    if (!userId)
        throw new ApiError(401, "Unauthorized")

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }, include: {
            blogs: {
                where: {
                    published: true
                }
            }
        }
    })

    if (!user)
throw new ApiError(404, "User does not exist")

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

    //clear the cookie with same options 
    
    res.clearCookie("accessToken", {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
})

res.clearCookie("refreshToken", {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite: env.NODE_ENV === "production" ? "none" : "lax",
})
    

    res.status(200).json(new ApiResponse(200, "Logged out successfully"));

})




const getUserProfile = asyncHandler(async (req: Request<{}, {}, {}, {}>, res: Response): Promise<void> => {


    const url = req.url
    const urlParams = new URLSearchParams(url.split("?")[1])
    const userName = urlParams.get('userName')

   const finduser = await prisma.user.findUnique({
    where: {
        userName: userName
    },
    include: {
        blogs: {
            where: {
                published: true
            },orderBy: {
                    createdAt: "desc"
                }
        }
    }
})
    if (!finduser)
        throw new ApiError(404, "User does not exist")

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