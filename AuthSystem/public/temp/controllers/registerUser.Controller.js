// use ZOD for validation.

//     --> crypto needs to be imported like this 
import { randomBytes } from "node:crypto";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import nodemailer from "nodemailer"
import User from '../models/User.model.js'
import jwt from "jsonwebtoken"


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
        throw new ApiError(400, "User with these credentials already Exists")

    const newUser = await User.create({
        name,
        email,
        password
    })

    if (!newUser)
        throw new ApiError(500, "can not create User")



    const createdUser = await User.findById(newUser._id)

    // create a token.
    const token = randomBytes(32).toString("hex")
console.log(`${token}`);
    // update  /provide in the db 
    createdUser.verificationToken = token;
     const updateUser = await createdUser.save()

     console.log(updateUser);

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
    //  cookieOptions are created 
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

/*
sinceis already a document, not a query u can not  use this .
   createdUser.select("-password -resetPasswordToken")
*/

/*
does not work on docs so it will return an error if u dont chain it
will give an error

it remove the data from the view level not the doc level.
*/
  const responseUser = await User.findById(createdUser._id).select("-password -resetPasswordToken")

    res.status(200).json(
        new ApiResponse(200, "User Created Successfully",{
            user : responseUser
        })
    )

}

const verifyUserController = async (req, res) => {
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


try {
    
    const verifiedUser =  await User.findOne({
        verificationToken:token
    }) 
    if(!verifiedUser)
        throw new ApiError(203,"Invalid Token")
    
    verifiedUser.isVerified = true 
    // make the verification token 
    verifiedUser.verificationToken = undefined
    await verifiedUser.save()
    console.log(`successfully verified.`);
    res.status(201).json( new ApiResponse(200,"Verified Successfully"))
    
} catch (error) {
    console.log("Error in verification",error.message)
}
}

const userLoginController = async (req,res) => {
    const{name ,email ,password} =req.body ;
    
    if(!name||!email||!password)
        throw new ApiError(400,"All fields are Required")
    

    const findUser = await User.findOne({email})

    if(!findUser)
        throw new ApiError(403,"Invalid Credentials")
    
    /*
   await bcrypt.compare(password,findUser.password) or u can create a method and call it.
*/

// if u call async method put await in it , since isPasswordCorrect is async method put await in it.
    const isMatch = await findUser.isPasswordCorrect(password)

    if(!isMatch)
        throw new ApiError(300,"Invalid password")

   
//  u could genrate them in model and access it here also.
// genrating accessToken.
 
const payload = {
    id : findUser._id
}
     const token = jwt.sign(payload,
        process.env.JWT_SECRET_KEY,
        {
        expiresIn:process.env.JWT_SECRET_KEY_EXPIRY
    })
   
    
    // genrating refreshToken.
    const refreshToken = jwt.sign(payload,
            process.env.JWT_REFRESH_KEY,
            {
            expiresIn:process.env.JWT_REFRESH_KEY_EXPIRY
        })
    
    


 // using the cookieparser to store the Access_Token and Refresh_Token
// u can access them into the req and res
const cookieOptions ={
httpOnly:true, //now only backend has access of cookie.
secure:true,  
maxAge:24 * 60 * 60 * 1000 // age of the cookie.
}

// it store value in the form of key : value
// u could provide cookie option as well ki expire cookie wagera.

res.cookie("token", token,cookieOptions) //access token 
res.cookie("refreshToken",refreshToken,cookieOptions) // refresh token


// save refreshtoken into the db also
findUser.refreshToken = refreshToken
await findUser.save()

const  user = await User.findById(findUser._id).select("-password  -resetPasswordToken -resetPasswordExpiry")

// sending the user neccessary details after logging in .
console.log(`user logged in...`);
return res.status(200).json(
   new ApiResponse(200 , "User logged in...",user)
)
}


const resetPasswordController = async (req,res) => {

    const {email} = req.body ;
    const foundUser = await User.findOne({email})
    if(!foundUser)
        throw new ApiError(400,"unAuthorized")


    res.status(201).json(new ApiResponse(201 ,"passowrd Reset successfull"))

    
} 

const userLogOutController = async (req,res) => {
     // first check if the user is logged in or not  ? --> from middleware.
    //  user hit a logout page 
    // remove the refresh token from db and user cookie.

    
    // userId  which is inserted into the body in the middleware.
    const {userId} = req.body

    //  accessing the userId  from req.body which we put previouslly.
    // updating the db and returning the new doc 
    await User.findByIdAndUpdate(userId,{
     $unset: { refreshToken : 1 }    
    },{
        new :true
    } )
  
    // clearing the cookie
    res.clearCookie("token")
    res.clearCookie("refreshToken")

    res.status(200).json(new ApiResponse(200, "User Logged Out Successfully"))
}

export {
    registerUserController,
    verifyUserController,
    userLoginController,
    resetPasswordController,
    userLogOutController
} 