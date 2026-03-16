// 1 controller baki 

//studentsEnrolled: { $elemMatch: { $eq: userId } }  // to find if this user is enrolled or not ? 

import RatingAndReviews from "../models/RatingAndReviews.model.js";
import Course from "../models/Course.model.js"
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// createRating
const createRating = asyncHandler(async (req, res) => {

    //get userId
    //fetch Data from req body
    //check if user is enrolled or not
    //check if user already reviewed the course
    //create rating and review
    //update course with rating/review
    //return response 

    const userId = req.user.id // from middleware

    const { rating, review, courseId } = req.body

    const CourseDetails = await Course.findOne({
        _id: userId,
        studentsEnrolled: { $elemMatch: { $eq: userId } }  // to find if this user is enrolled or not ? 
    })
    if (!CourseDetails)
        throw new ApiError(404, "student is not enrolled in this Course")

    const alreadyReviewed = await RatingAndReviews.findOne({
        user: userId,
        course: courseId
    })

    if (alreadyReviewed)
        throw new ApiError(403, "course is already reviewed by the user")

    const ratingReview = await RatingAndReviews.create({
        rating,
        review,
        course: courseId,
        user: userId
    })

     const updatedCourseDetails = await Course.findByIdAndUpdate({
        _id: courseId
    }, {
        $push: {
            ratingAndReviews: ratingReview._id

        }
    },
        {
            returnDocument: "After"
        })


    res.status(200).json(new ApiResponse(200, "Rating and Review created successfully"),{
        ratingReview,
        updatedCourseDetails
    })

})




// getAverageRating
const getAverageRating = asyncHandler(async (req, res) => {

    const courseId = req.body.userId

    //  aggreagate call
    const result =

        res.status().json(new ApiResponse())


})


// getAllRating
const getAllRating = asyncHandler(async (req, res) => {

    const allRatings = await RatingAndReviews.find({})
    .sort({rating:"desc"})
    .populate({
        path:"user",
        select:"firstName lastName email image"
    })
    .populate({
        path : "course",
        select : "courseName",
    })
    .exec()

    if(!allRatings)
        throw new ApiError(500,"can not fetch rating and reviews")
    
    res.status(200).json(new ApiResponse(200,"All ratings :"),{
allRatings
    })
})


export {
    createRating,
    getAverageRating,
    getAllRating
}