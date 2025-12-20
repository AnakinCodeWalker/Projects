import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

const VideoSchema = mongoose.model({
    videoFile: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: [true, "All fields are required"]
    },
    description: {
        type: String,
        required: [true, "All fields are required"]
    },
    duration: {
        type: number,
        required: true
    },
    views: {
        type: number,
        default: 0
    },
    idPublished: {
        type: Boolean,
        default: true
    },
    owner: {
        type: Schema.Types.objectId,
        ref: "User"
    }
}, {
    timestamps: true
})


const Video = mongoose.model("Video", VideoSchema)
export default Video