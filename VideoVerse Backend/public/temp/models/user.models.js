import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config()

const UserSchema = new mongoose.Schema({
    userName: {
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

//encrypt the password before saving it into the db
//using the prehook
UserSchema.pre("save", async function (next) {

//first checking ki password mai modification to nhi hua
    // if not modified then skip 
    if (!this.isModified("password"))
        return next()
    //then hashing the password and then saving it 
    this.password = await bcrypt.hash(this.password, 10)
        next()
    
    
})


//a method to compare the passowrds.
UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// creating the accesstoken using jwt

UserSchema.methods.genrateAccessToken = function () {

    return jwt.sign({
        id: this._id   //payload , id of the current user
    },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_SECRET_KEY_EXPIRY
        }
    )

}

//genrating the refresh token
UserSchema.methods.genrateRefreshToken = function () {
    return jwt.verify({
        id: this._id
    },
        process.env.JWT_REFRESH_TOKEN,
        {
            expiresIn: JWT_REFRESH_TOKEN_EXPIRY
        })
}

const User = mongoose.model("User", UserSchema)
export default User