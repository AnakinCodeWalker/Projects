import { instance } from "../config/Razorpay.config.js";
import User from "../models/User.model.js";
import Course from "../models/Course.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import mailsender from "../utils/mailSender.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

//capture the payment
// initiate the razorpay  order


//capute payment
//order create
const capturePayment = asyncHandler(async (req,res) => {

    const userId = req.user.id
    
    const courseId = req.body.courseId
    
    if(!courseId || !userId)
        throw new ApiError(400,"Invalid credentials")
    
    
    const course = await Course.findById(courseId)
    
    if(!course)
        throw new ApiError(400,"Invalid course Id")


    // if already paid for the same course then dont repay
    const uid = new mongoose.Types.objectId(userId)
    //course object mai field hai usme studentsEnrolled hai , to usme object id find krne kai liye includes then put the object id. 
    if(course.studentsEnrolled.includes(uid)){
        throw new ApiError(200,"Student is already Enrolled")
    }

    //order create
})


//  verify signature  of razorpay and server 
//  create webhooks 
const verifySignature = asyncHandler(async (req,res) => {
    

})

export default {
     capturePayment,
     verifySignature
}
