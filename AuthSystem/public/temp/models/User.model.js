import mongoose from "mongoose";
const UserSchema = new mongoose.model({

}, {
    timestamps: true
})

const User = mongoose.model("User", UserSchema)

export { User }