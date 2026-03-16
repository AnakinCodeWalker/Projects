import { Schema, model } from "mongoose";


const SubSectionSchema = new Schema({

    title: {
        type: String,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type: String,
    },
    videoUrl: {
        type: String
    },
    publicId: {  //used to remove videos from the clooudinary
        type: String
    }


}, { timestamps: true })

const SubSection = model("SubSection", SubSectionSchema)

export default SubSection