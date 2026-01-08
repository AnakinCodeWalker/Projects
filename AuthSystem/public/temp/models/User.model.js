import mongoose from "mongoose";

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

const User = mongoose.model("User", UserSchema)

export { User }