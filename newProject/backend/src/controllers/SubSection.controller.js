// done
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asyncHandler.js"
import Course from "../models/Course.model.js"
import Section from "../models/Section.model.js"
import SubSection from "../models/SubSection.model.js"
import env from "../config/env.config.js"
import uploadImageToCloudinary from "../utils/imageUploader.js"

const createSubSection = asyncHandler(async (req, res) => {

    // fetch data
    // extract file/video
    // validation
    // upload video on cloudinary
    // create a sub Section
    // update section with this subSection objectId
    // return response 

    const { sectionId, title, description, timeDuration } = req.body



    if (!title || !description || !timeDuration)
        throw new ApiError(400, "Invalid Data")

        const videoFilePath = req.file?.path
        console.log(videoFilePath)
    //  it contains secure url  //////////////////////////////////
    const uploadDetails = await uploadImageToCloudinary(videoFilePath)

    // create a subSection
    const subSectionDetails = await SubSection.create({
        title,
        description,
        timeDuration,
        videoUrl: uploadDetails.secure_url  // it is present inside cloudinary
    })

    //  sectionId for updating the things in the model
    const updateSectionDetails = await Section.findByIdAndUpdate(sectionId,
        {
            $push: {
                subSection: subSectionDetails._id
            }
        }, {
        returnDocument: "after"
    })

    if (!subSectionDetails || !updateSectionDetails)
        throw new ApiError(403, "error in section controller")

    res.status(200).json(new ApiResponse(200, "subSection Created successfully", {
        subSectionDetails,
        updateSectionDetails,
    }
    ))

})


//  khud se banao ee dono ..

const updateSubSection = asyncHandler(async (req, res) => {
// delete the video from cloudinary..
    const { subSectionId ,title, timeDuration, description } = req.body

let result = null

if (req.file) {
   const videoFilePath = req.file.path
   result = await uploadImageToCloudinary(videoFilePath)
}

if(!result)
    throw new ApiError(404, "SubSection not found")

    const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionId, {
        ...(title && { title }),
        ...(timeDuration && { timeDuration }),
        ...(description && { description }),
        ...(result && { videoUrl : result.secure_url})
    }, {
        returnDocument: "after"
    })
    res.status(200).json(new ApiResponse(200, "subsection Updated Successfully", {
        updatedSubSection
    }))
})

const deleteSubSection = asyncHandler(async (req, res) => {
    // params se id aayega ji..
    const {subSectionId} = req.params
    const {sectionId} = req.body

    if (!subSectionId || !sectionId)
        throw new ApiError(400, "Invalid Inputs")
  
    const subSection = await SubSection.findById(subSectionId)

   if (!subSection) {
      throw new ApiError(404, "SubSection not found")
   }
    if(subSection.publicId){
    await cloudinary.uploader.destroy(publicId, {
         resource_type: "video"
      })
    } 

   // remove subsection from section
   await Section.findByIdAndUpdate(sectionId, {
      $pull: {
         subSection: subSectionId
      }
   })

   // delete subsection
   await SubSection.findByIdAndDelete(subSectionId)


    res.status(200)
    .json(new ApiResponse(200, 
        " subSection Deleted Successfully"))

})

export {
    createSubSection,
    updateSubSection,
    deleteSubSection
}