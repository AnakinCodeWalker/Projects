import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

import bcrypt from  "bcrypt"


const UserSchema = new mongoose.Schema({
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
    },
    refreshToken:{
        type:String
    }

}, {
    timestamps: true
})

// before saving the password to the db 
//     --->       the async hook does not need next
UserSchema.pre("save",async function(){
//    if password not modified then return immedieatly
    if (!this.isModified("password")) 
     return 

// if modfied then hash. 
   this.password = await bcrypt.hash(this.password,10)
      
  
})

// to check for the user given password 
//  takes the password  , verify and return true or false.


UserSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password,this.password)
}



const User = mongoose.model("User", UserSchema)

export  default User 