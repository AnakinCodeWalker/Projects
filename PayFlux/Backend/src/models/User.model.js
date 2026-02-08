

import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,  // provides a unique index.
        trim: true,
        lowercase: true,
        // index: true,  it provides a normal index
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true,
    },
    verificationToken: {
        type: String,
        select : false,
    },
    verificationTokenExpiry: {
        type: Date,
    },
    refreshToken: {
        type: String,
        select: false,
    },
    refreshTokenExpiry: {
        type: Date,
    }
}, {
    timestamps: true
})

UserSchema.pre("save", async function () {
    //provide the field name 
    if (!this.isModified("password"))
        return

    this.password = await bcrypt.hash(this.password, 10)
})


UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = model("User", UserSchema)

export default User