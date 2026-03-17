import { v2 as cloudinary } from "cloudinary"
import env from "../config/env.config.js"
import fs from "fs"

// this return a url wihch you will store in the db.

//  as this is a third party service its a better approach to wrap 3rd party service to a try-catch.

cloudinary.config({

    cloud_name: env.CLOUD_NAME,
    api_key: env.API_KEY,
    api_secret: env.API_SECRET

})


const cloudinaryUploader = async (localFilePath: any) => {
    try {

        if (!localFilePath) return null

        const uploadedResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log(`localFilePath uploaded on cloudinary ${uploadedResponse.url}`)

        fs.unlinkSync(localFilePath)

        return uploadedResponse.secure_url  // returning the url to the user. -- save it in db..


    } catch (error) {

        if (error instanceof Error) {
            
            fs.unlinkSync(localFilePath)
            console.log("error in uploading to cloudinary");
            console.log(`${error.message}`);
      
        }
    }
}
export default cloudinaryUploader