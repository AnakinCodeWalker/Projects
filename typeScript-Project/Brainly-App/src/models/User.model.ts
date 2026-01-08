import mongoose from "mongoose";
import bcrypt from "bcrypt"
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
    }

}, {
    timestamps: true
})

// if u want to create some method u can do that here.
// Hash the password before saving it into the db.
// not creating an arrow function because it will not have the context of this
UserSchema.pre("save",async function(next){ //why pass nect here ?


    //explain this block of code
    if(!this.isModified("password")){
        return next()
    }

//hashing the password and putting it into db
this.password = await bcrypt.hash(this.password,10) 
})

// add types here
const User = mongoose.model("User", UserSchema)
export default User