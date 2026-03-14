// all models verified except User
//  category last controller remaining
// auth changePassword , refreshAccessToken remaining
// updateCourseProgess controller 
// payment controller baki
//profile  controller baki
//  ratingAndReviews getAverageRating, getAllrating baki 
// courseprogresss baki 
// updateSubSection ,deleteSubSection baki 
// cloudinary config baki  

import { populate } from "dotenv";


//  set vs push in mongoose
//  findById and findByIdAndUpdate syntax 

//  findById(id)
// //  findByIdAndUpdate(id,{update object},{options})


// set  - field change
// push -  array mai field change
// pull -  array se value remove

// agar update krte time fiedl nhi lagate to set assume krta hai. set

// updateMany()  -- multiple docs ko update krne kai liye


//  model.updateMant({condition},{$set/$push/$pull/$inc : { } },{options})
// options  -- runValidators : true , / new : true

// condition  and $operator mai --> field  : value 

// sb methods ka syntax same hi hota hai id wale mai filter ki jgh dena hota hai hr bar



// Populate Syntax 

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