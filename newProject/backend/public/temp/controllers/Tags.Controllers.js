//  only admin can create the tags.
// course creation se phele tag bana hoga 

import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import Tags from "../models/tags.model.js"

// tag -  course  - content  - section - subsection - video  

//  use  normal and isAdmin middleware

const createTagController = asyncHandler(async (req, res) => {

    const { name, description } = req.body

    if (!name || !description)
        throw new ApiError(400, "Invalid Inputs")

    const createdTag = await Tags.create({
        name, description
    })

    res.status(200).json(new ApiResponse(200, "Tag created successFully", {
        tag: createdTag
    }))
})


const getAllTagController = asyncHandler(async (req, res) => {

    const allTags = await Tags.find({}, {
        name: true,
        description: true
    })
    res.status(200).json(new ApiResponse(200, "All tags : ", {
        tag: allTags
    }))

})


export {
    createTagController,
    getAllTagController,
}