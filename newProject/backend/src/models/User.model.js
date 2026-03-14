import mongoose from "mongoose";

import bcrypt from "bcrypt"


const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        lowercase: true,
        trim: true,
        
    },
    lastName: {
        type: String,
        lowercase: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    otp: {
        type: Number,
        required: true
    },
    contactNumber: {
        type: Number,
        
    },
    role: {
        type: String,
        enum: ["Student", "Admin", "Instructor"],
        default : "Student",
        required: true,
    },

    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Course"
    }],
    image: {
        type: String,
        required: true,
    },
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "CourseProgress"
    }],

    resetPasswordToken: {
        type: String,
    },
    resetPasswordTokenExpiry: {
        type: Date
    },
    refreshToken: {
        type: String,
        select: false
    },
    refreshTokenExpiry: {
        type: Date,
        select: false
    }

}, {
    timestamps: true
})

// before saving the password to the db 
//     --->       the async hook does not need next
UserSchema.pre("save", async function () {
    //    if password not modified then return immedieatly
    if (!this.isModified("password"))
        return

    // if modfied then hash. 
    this.password = await bcrypt.hash(this.password, 10)


})

// to check for the user given password 
//  takes the password  , verify and return true or false.


UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const User = mongoose.model("User", UserSchema)

export default User 