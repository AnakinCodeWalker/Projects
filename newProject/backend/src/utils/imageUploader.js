import cloudinary from "../config/cloudinary.config.js";

import fs from "fs"

// localfile path from  multer 
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        // upload file on cloudinary..
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // will detect whatever type of file it is
        })
        console.log(`file uploaded on cloudinary ${response.secure_url}`);
        // delete local file
      try {
         fs.unlinkSync(localFilePath)
      } catch (err) {
         console.log("Local file delete error:", err.message)
      }
        return response
    } catch (error) {
        // if something happpen remove  from  the server
        fs.unlinkSync(localFilePath)
console.log("Cloudinary upload error:", error.message);
        return null
    }
}


export default uploadOnCloudinary;

/*
Client
  ↓
Multer
  ↓
local file created
  ↓
Cloudinary upload
  ↓
fs.unlinkSync(localFilePath)
  ↓
local file removed
*/