import mongoose from "mongoose";

// Mongoose schema also have “types” add it later on.
// add interfaces 

const UserSchema = new mongoose.Schema({

    userName:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    email:{
        type:String,
        required:true,
        trim:true
    }

},{
    timestamps:true
})

// if u want to create some method u can do that here.

// add types here
const User = mongoose.model("User",UserSchema)
export  default User