// last controller remaining

//  only admin can create the Category.
// course creation se phele tag bana hoga 

import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import Category from "../models/Category.model.js"
import Course from "../models/Course.model.js"
// tag -  course  - content  - section - subsection - video  

//  use  normal and isAdmin middleware

// get the detials and create and update in the course model as well.
// done 
const createCategoryController = asyncHandler(async (req, res) => {

    const { courseId, name, description } = req.body

    if (!name || !description)
        throw new ApiError(400, "Invalid Inputs")

    const createdCategory = await Category.create({
        name, description
    })

    //  push the refrence of this into course model
    const updatedCourse = await Course.findByIdAndUpdate(courseId,
        {
            
                category: createdCategory._id
            
        }, {
        new: true
    })

    if (!updatedCourse)
        throw new ApiError(403, "Can not update the course model in category controller")

      // Category me course push karo
  await Category.findByIdAndUpdate(
    createdCategory._id,
    {
      $push: { course: courseId }
    }
  )
    res.status(200).json(new ApiResponse(200, "Tag created successFully", {

        createdCategory: createdCategory,
        updatedCourse: updatedCourse
    }))
})


const showAllCategoryController = asyncHandler(async (req, res) => {

    const allCategory = await Category.find({}, {
        name: true,
        description: true
    })
    if (!allCategory)
        throw new ApiError(400, "can not get All category")

    res.status(200).json(new ApiResponse(200, "All Category : ", {
        tag: allCategory
    }))

})

//  where pulbished == true Published  : ["true","draft"]

/*
populate({
    path: " model field name  / refrence field" 
    select: "fields To Return"
    match: { condition: value },
    options: { sort: {}, limit: {} }
    populate: {
        path: "nestedRefrence"
    }
})

populate("RefrenceModelFieldName")
*/

/// this is wrong. actuallly...

const categoryPageDetails = asyncHandler(async (req, res) => {
    // get category based on id
    // limit 10 sorted order.
    const { categoryId } = req.body

    if (!categoryId)
        throw new ApiError(400, "Incorrect Inputs / invalid categoryId")

    const selectedCategoryonId = await Category.findById(categoryId)
        

    if (!selectedCategoryonId)
        throw new ApiError(400, "can not get the specific category")
      res.status(200).json(new ApiResponse(200,"Course Fetched with specfic id"),{
        "selectedCourse" :selectedCategoryonId
      })
    // get category which is not equal to this id

    const categoriesExceptSelected = await Category.find({
        _id :{$ne :categoryId}
    }).populate({
            path: "category",
            match: {
                status: "Published"
            },
            options: {
                sort: {
                    createdAt: -1
                },
                limit: 10
            },
        })
        .exec()
        if(!categoriesExceptSelected)
            throw new ApiError(500,"Can not get remaining Courses")
        res.status(200).json(new ApiResponse(200,"All Category except id ",{
            "fetchedCategory" : categoriesExceptSelected 
        }))
    })

    // get top 10 selling courses -- $inc coutn =10

export {
    createCategoryController,
    showAllCategoryController,
    categoryPageDetails
}