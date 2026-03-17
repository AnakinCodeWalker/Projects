import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    bio: {
        type: String,
        default: ""
    },
    profilepic: {
        type: String,
        default: ""
    },
    nativeLanguage: {
        type: String,
        default: ""
    },
    learningLanguage: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    isOnboarded: {
        type: Boolean,
        default: false
    },
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

}, { timestamps: true })


// before saving the password to the db 
//     --->       the async hook does not need next
UserSchema.pre("save", async function () {
    //    if password not modified then return immedieatly
    if (!this.isModified("password"))
        return

    // if modfied then hash. 
    this.password = await bcrypt.hash(this.password, 10)


})

// to check for the user given password 
//  takes the password  , verify and return true or false.


UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}


const User = mongoose.model("User", UserSchema)
export default User