// done

import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import Section from "../models/Section.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import Course from "../models/Course.model.js"

const createSection = asyncHandler(async (req, res) => {

    const { sectionName, courseId } = req.body
    if (!sectionName || !courseId)
        throw new ApiError(400, "Invalid Inputs")

    const createdSection = await Section.create({ sectionName })
    if (!createdSection)
        throw new ApiError(304, "can not create a section")

    const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {
        $push: {
            courseContent: createdSection._id
        }
    }, {
        new: true
    }).populate("courseContent")  // model mai jo fieldname hai woh wala


    if (!updatedCourseDetails)
        throw new ApiError(304, "can not create a section")

    res.status(200).json(new ApiResponse(200,
        "Section created SuccessFully", {
        createdSection: createdSection,
        updatedCourseDetails: updatedCourseDetails
    }))
})



const updateSection = asyncHandler(async (req, res) => {

    const { sectionName, sectionId } = req.body

    if (!sectionName || !sectionId)
        throw new ApiError(400, "Invalid Inputs")

    const updatedSection = await Section.findByIdAndUpdate(sectionId, {
        $set: {
            sectionName
        }
    }, {
        new: true

    })
    if (!updatedSection)
        throw new ApiError(404, "Section not found")

    res.status(200).json(new ApiResponse(200,
        "Section updated SuccessFully", {
        updatedSection
    }))
})


// iska course  mai id store kr rhe hai to course se v remove krna hoga yah automatically remove hoga  
const deleteSection = asyncHandler(async (req, res) => {
    //  delete from the course yah jaha v yeh section store  kr rha hai .
    const { sectionId } = req.params

    if (!sectionId)
        throw new ApiError(400, "Invalid Inputs")
    await Section.findByIdAndDelete(sectionId) // delete from the section

    // delete refrence of section from the user   
    //check syntax in notes.
    await Course.updateMany({ courseContent: sectionId }, {
        $pull: {
            courseContent: sectionId
        }
    }, { returnDocument: "after"})
    res.status(200).json(new ApiResponse(200,"section id from course deleted SuccessFully."))
})


export {
    createSection,
    updateSection,
    deleteSection
}
//populate() use karne se us id ki jagah poora object aa jata hai.
//  push array mai value add krta hai ,
// populate time model/fieldname ka name likhte hai 

/*
Array ke andar kaam → $push, $pull, $addToSet

Normal field update → $set

Counter → $inc

Field delete → $unset normal or array dono mai .
*/