/*
 via multer take file from the user put it into the server
and from the server we will put it into the cloudinary..


user -> multer -> server -> cloudinary.

after providing file to server it will return a path to access , and after uploading to cloudinary  , remove it from our server.
 */

import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        // upload file on cloudinary..
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // will detect whatever type of file it is
        })
        console.log(`file uploaded on cloudinary ${response.url}`);
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        // if something happpen remove  from  the server
        fs.unlinkSync(localFilePath)
        console.log("error in uploading files");
        return null
    }
}


// const result = await cloudinary.v2.uploader.upload(filePath, {
//     folder: "users",
// });

export { uploadOnCloudinary }
