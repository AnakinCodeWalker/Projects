import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({

    UserName: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,
    },
    // expiry token
    token: {
        type: String,
    },
    tokenExpiry: {
        type: Date,
        default: Date.now()

    },
    verified: {
        type: Boolean,
        default: false
    },
    refreshToken: {
        type: String,
        select: false,
    },
    refreshTokenExpiry: {
        type: Date,
        select: false,
    }

}, {
    timestamps: true
})

const User = mongoose.model("UserSchema",User)
export default User