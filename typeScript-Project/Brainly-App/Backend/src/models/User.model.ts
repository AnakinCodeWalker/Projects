import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { string } from "zod";
// Mongoose schema also have “types” add it later on.
// add interfaces 

const UserSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    verificationToken:{  //token sending to mail
        type :String,

    },
    verificationTokenExpiry:{ // token expiry send to mail
          type : Date
    },
    isVerified: {  // for user verification..
        type: Boolean,
        default: false,
    },
    refreshToken:{
        type:string,

    }

}, {
    timestamps: true
})

// if u want to create some method u can do that here.
// Hash the password before saving it into the db.
// not creating an arrow function because it will not have the context of this
UserSchema.pre("save", async function () { //if this is  ?

    if (!this.isModified("password")) {
        return
    }
    //hashing the password and putting it into db
    this.password = await bcrypt.hash(this.password, 10)
})

// add types here
const User = mongoose.model("User", UserSchema)
export default User

// when the relationship is one to many or many to one , create an array of object
