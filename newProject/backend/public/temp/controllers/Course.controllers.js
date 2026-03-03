import User from "../models/User.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import Tags from "../models/tags.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import Course from "../models/Course.model.js"


const createCourse = asyncHandler(async (req,res) => {
    const  {courseName,
        courseDescription,
        price,
        tag,
        whatYouWillLearn
    } = req.body

    // add the url u will get from the req.files from cloudinary 3rd video 58 : 00
     if(!courseName||
        !courseDescription||
        !price||
        !tag||
        !whatYouWillLearn)
        throw new ApiError(400 , "Invlaid inputs.") 

        
})

//  add pagination logic in this one 
// add middleware into this one kyuki , isAdmin kyuki only he can create the course.
const getAllCourse = asyncHandler(async (req,res) => {
    
})

export {
    createCourse,
    getAllCourse
}