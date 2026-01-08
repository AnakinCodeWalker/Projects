import mongoose from "mongoose";

import dotenv from "dotenv"
dotenv.config()

import bcrypt from  "bcrypt"


const UserSchema = new mongoose.model({
    name: {
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
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,

    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpiry: {
        type: Date
    }
}, {
    timestamps: true
})

// before saving the password to the db 
UserSchema.pre("save",async function(next){
   if (!this.ifModified("password"))
    next()
    this.password = await bcrypt.hash(this.password,10)
    
})


const User = mongoose.model("User", UserSchema)

export { User }