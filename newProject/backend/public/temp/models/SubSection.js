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
    }

}, { timeStamps: true })

const SubSection = model("SubSection", SubSectionSchema)

export default SubSection