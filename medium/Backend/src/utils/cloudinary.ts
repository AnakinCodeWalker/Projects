import { v2 as cloudinary } from "cloudinary"
import env from "../config/env.config.js"
import fs from "fs"

// this return a url wihch you will store in the db.

//  as this is a third party service its a better approach to wrap 3rd party service to a try-catch.

cloudinary.config({

    cloud_name: env.cloud_name,
    api_key: env.api_key,
    api_secret: env.api_secret

})

const cloudinaryUploader = async (localFilePath: any) => {
    try {

        if (!localFilePath) return null

        const uploadedResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        console.log(`localFilePath uploaded on cloudinary ${uploadedResponse.url}`)

        fs.unlinkSync(localFilePath)

        return uploadedResponse.url  // returning the url to the user. -- save it in db..


    } catch (error) {

        if (error instanceof Error) {
            
            fs.unlinkSync(localFilePath)
            console.log("error in uploading to cloudinary");
            console.log(`${error.message}`);
      
        }
    }
}
export default cloudinaryUploader