import mongoose from "mongoose"


const ProfileScehma = new mongoose.Schema({

    gender: {
        type: String,

    },
    dateOfBirth: {
        type: String
    },
    about: {
        type: String,
        trim: true
    },
    contactNumber: {
        type: Number,
        trim: true
    },
    avatar:{
        type:String
    }
}, {
    timestamps: true,
})

const Profile = mongoose.model("Profile", ProfileScehma)
export default Profile