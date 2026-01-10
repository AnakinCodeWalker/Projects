import mongoose from "mongoose";
import jwt from "jsonwebtoken"
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
// the hook need to have a next().
UserSchema.pre("save",async function(next){
//    if password not modified then call next() immediately
    if (!this.ifModified("password")) 
     return next()

// if modfied then hash. 
   this.password = await bcrypt.hash(this.password,10)
    next()   

  
})

// to check for the user given password 
//  takes the password  , verify and return true or false.


UserSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password,this.password)
}


// genrating accessToken.
UserSchema.methods.genrateAccessToken = async function () {
const payload = {
    id : this._id
}
    jwt.sign(payload,
        process.env.JWT_SECRET_KEY,
        {
        expiresIn:process.env.JWT_SECRET_KEY_EXPIRY
    })
    
}

// genrating refreshToken.
UserSchema.methods.genrateRefreshToken = async function () {
    const payload = {
    id : this._id
}
    jwt.sign(payload,
        process.env.JWT_REFRESH_KEY,
        {
        expiresIn:process.env.JWT_REFRESH_KEY_EXPIRY
    })
}

const User = mongoose.model("User", UserSchema)

export { User }