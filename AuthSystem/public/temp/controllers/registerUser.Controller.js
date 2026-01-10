// use ZOD for validation.

import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import nodemailer from "nodemailer"
import User from '../models/User.model.js'
const registerUserController = async (req, res) => {

    // get data from the user
    //  verify the data
    //  check if user already exists
    // hash the passowrd 
    // create a user
    // create a token
    // save the token in the db 
    //  send the token to the user via mail .
    //  return the user object remove the password and refresh token

    const { name, email, password } = req.body;

    if (!name || !email || !password)
        throw new ApiError(400, "All Fields are required")

    const findUser = await User.findOne({ email })

    if (findUser)
        throw new ApiError(400, "User with these credentail already Exists")

    const newUser = await User.create({
        name,
        email,
        password
    })

    if (!newUser)
        throw new ApiError(500, "can not create User")



    const createdUser = await User.findbyId(newUser._id)

    // create a token.
    const token = crypto.randomBytes(32).toString("hex")

    // update  /provide in the db 
    createdUser.verificationToken = token;
    await createdUser.save()

    // send it to the user via mail.

    // creating the transporter.
    // .env has string only so u have to convert into number 
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
    const verificationLink = `${process.env.BASE_URL}/api/v1/user/verify?token=${token}`;

    const mailOption = {
        from: process.env.MAILTRAP_SENDEREMAIL, //provided by the nodemailer
        to: createdUser.email,
        subject: "Verify Your Email",
        // Plain-text version of the message
        html: "<b>Confriming your email</b>", // HTML version of the message

        // creating a link.. and sending the token into it.
        text: `Hi ${createdUser.name}, please verify your email: ${verificationLink}`,


    }

    //  transporter is created 
    //  options are created 
    //  now send mail to the user via transporter.sendmail() .

    try {
        //Sending the mail.
        await transporter.sendMail(mailOption)
        console.log(`mail sent successfully`);

    } catch (error) {
        console.log(`error in sending the mail`);
        console.log(`${error.message}`);
        throw new ApiError(500, "can not send mail")
    }

    createdUser.select("--password --resetPasswordToken")

    res.status(200).json(
        new ApiResponse(200, "User Created Successfully")
    )

}

const verifyUser = async (req, res) => {
    // get the token from the url
    // find the user from the token
    //  verify the token
    // in model set isVerified = true .
    // remove the token from the user side.
    //    return response.


    //  to access data from the url use req.params

    const {token} = req.params
console.log(`Token is : ${token}`);

if(!token)
    throw new ApiError(400,"Can not Find Token")
}

const verifiedUser =  await User.findOne({
    verificationToken:token
}) 
if(!verifiedUser)
    throw new ApiError(203,"Invalid Token")

verifiedUser.isVerified = true 
verifiedUser.verificationToken =undefined
await verifiedUser.save()


export {
    registerUserController,
    verifyUser
} 