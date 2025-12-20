import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true

    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        required: true
    },
    coverImage: {
        type: String //cloudinary Url
    },
    watchHistory: [{ //this will be refrenced from video model
        type: Schema.Types.objectId,
        ref: "video"
    }],
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true,
})


const User = mongoose.model("User", UserSchema)
export default User