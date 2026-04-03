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

// import { populate } from "dotenv";


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


/*
localfilePath -- public/temp/my-uploads/image-123.png

req.file:{
 fieldname: "image",
 originalname: "photo.png",
 destination: "public/temp/my-uploads",
 filename: "image-1710000000.png",
 path: "public/temp/my-uploads/image-1710000000.png",
 size: 34523
}
 in controller 
 const localFilePath = req.file.path
 --localfilepath goes into cloudinary yeh ata hai multer se then isko dala jata hai inside cloudinary.

 
*/

/*

remaining controller

// refreshtoken controller remaining. -- Auth controller
 // last controller remaining   -- category controller
//   last controller remaining  -- course controller
// all remaining                -- courseProgress controller
// all remaining                -- payment controller
// getAverageRating             -- ratingAndReviews controller 


*/

/*
👉 Backend sets cookie  and send it into  a header 
👉 Browser stores cookie
👉 Browser decides when to send it
*/

/*
 stroe bnega uske andar hoga 
 uske andar hoga reducer 
 reducer folder  kai andar sare slices likhte hai hmlog 

*/