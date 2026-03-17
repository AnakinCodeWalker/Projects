
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
import { signupInput, signupType, signinInput, signinType } from "../validation/User.validation.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"
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


    const { firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        role,
        image
    } = result.data

    // id user exists return an error..
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (password !== confirmPassword)
        throw new ApiError(400, "password and confirm password does not match")

    if (existingUser)
        throw new ApiError(400, "user already exists ..")


    // hashed the password  then create a user..

    const hashedPassword = await bcrypt.hash(password, 10)


    const newUser = await prisma.user.create({
        data: {

            firstName,
            lastName,
            email,
            password: hashedPassword,
            contactNumber,
            profile: {
                create: {
                    gender: null,
                    dateOfBirth: null,
                    contactNumber,
                    about: null
                }
            },
            role,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`, // providing default image to every user

        },
        include: {  //will return the parent and included table details
            profile: true
        }


    })


    if (!newUser) {

        console.log(` error in userSignup`);
        throw new ApiError(403, "can not create user")

    }

    console.log("user sign up successfully");


    res.status(201)
        .json(
            new ApiResponse(201,
                "user signup succesfully",
                {
                    user: newUser
                }))

})


const signin = asyncHandler(async (req: Request<{}, {}, signinType, {}>, res: Response): Promise<void> => {


    const result = signinInput.safeParse(req.body)
    // returns  an object of {succes : true / flase and data }

    if (!result.success)
        throw new ApiError(400, "validation failed")

    const { email, password } = result.data
    //  check if user signup or not..
    const foundUser = await prisma.user.findUnique({
        where: {
            email: email
        }


    })

    if (!foundUser)
        throw new ApiError(400, "singup first")

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if (!isPasswordCorrect)
        throw new ApiError(401, "Invalid Password")



    const payload = {
        id: foundUser.id,
        role: foundUser.role
    }

    console.log(payload);

    const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
        expiresIn: env.JWT_ACCESS_EXPIRES
    })


    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRES
    })

    //  saving token in db
    const refreshTokenExpiry = new Date(
        Date.now() + Number(process.env.JWT_REFRESH_EXPIRES_IN)
    )
    await prisma.user.update({
        where: {
            id: foundUser.id
        },
        data: {
            refreshToken: refreshToken,
            refreshTokenExpiry
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
                    published: true,
                    sort: "asc"
                },
            },
            profile: true
        }
    })

    if (!user)
        throw new ApiError(404, "User does not exist")

    res.status(200).json(new ApiResponse(200, "user Details", {
        userDetail: user
    }))
})



const refreshAccessToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {

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
            // this does not exists in zod
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







const logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {



    // delete the refresh token from the cookie and db

    //@ts-ignore
    const userId = req.userId

    if (!userId)
        throw new ApiError(401, "Unauthorized")


    await prisma.user.update({
        where: {
            id: userId
        }, data: {
            refreshToken: null,
            refreshTokenExpiry: null
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








export {
    signup,
    signin,
    refreshAccessToken,
    forgetPassword,
    resetPassword,
    getCurrentUser,
    logout,
    
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