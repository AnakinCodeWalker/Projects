//   last controller remaining

import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import Category from "../models/Category.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import Course from "../models/Course.model.js"
import { createCourseInput } from "../validation/Course.ZodValidation.js"
import User from "../models/User.model.js"

const createCourse = asyncHandler(async (req, res) => {

    const result = createCourseInput.safeParse(req.body)

    if (!result.success)
        throw new ApiError(400, "Invlaid inputs.")

    const { courseName,
        courseDescription,
        whatYouWillLearn,
        price,
        thumbnail,
        tag,
        instructions,
        status
    } = result.data

    const userId = req.user.id
    // add the url u will get from the req.files from cloudinary 3rd video 58 : 00

    const createdCourse = await Course.create({
        courseName,
        courseDescription,
        instructor: [userId], //instructorId
        whatYouWillLearn,
        price,
        thumbnail,
        tag,
        instructions,
        status
    })

    if (!createdCourse)
        throw new ApiError(400, "Can not create course")

    //course id into User model.
    const updatedUser = await User.findByIdAndUpdate(userId, {
        $push: {
            courses: createdCourse._id
        }
    }, { new: true })

    if (!updatedUser)
        throw new ApiError(409, "can not update User")

    res.status(201)
        .json(new ApiResponse(201, "course created Successfully",
            {
                createdCourse
            }))
})

//  add pagination logic in this one 
// add middleware into this one kyuki , isAdmin kyuki only he can create the course.
// u could add the sort and limit in the filter option in populate queries.

const getAllCourse = asyncHandler(async (req, res) => {

    const allCourse = await Course.find({}, {

        courseName: true,
        courseDescription: true,
        whatYouWillLearn: true,
        price: true,
        thumbnail: true,
        tag: true,
        instructions: true,
        status: true,
    }).populate({
        path: "instructor",  // is field ko populate kro 
        select: "firstName lastName email role", // is model kai kiin chijo ko seelect krna hai 
        // match: { role: "Instructor" },
    }).populate({
        path: "courseContent",
        populate: {
            path: "subSection",
            select: "title timeDuration  videoUrl description"
        }

    }).populate({
        path: "ratingAndReviews",
        select: "user rating review"

    }).populate({
        path: "category",
        select: "name description"
    }).populate({
        path: "studentsEnrolled",
        select: "firstName lastName email",
        populate: {
            path: "courseProgress",
            select: "completedVideos"
        }
    }).exec()


    return res.status(200).json(
        new ApiResponse(200, "All courses", {
            Courses: allCourse
        })
    )

})


const getCourseDetails = asyncHandler(async (req, res) => {
    const { courseId } = req.body
    const CourseDetails = await Course.findOne({ _id: courseId })


    return res.status(200).json(new ApiResponse(200, "All courses"), {
        "Course Details": CourseDetails
    })
})

export {
    createCourse,
    getAllCourse,
    getCourseDetails
}