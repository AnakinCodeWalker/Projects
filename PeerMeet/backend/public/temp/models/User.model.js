import {Schema} from "mongoose"

const UserSchema = new Schema({

    name:{
        type : String,
        required: true ,
    },
    userName:{
        type : String,
        required: true ,
        unique : true ,
        index:true
    },
    password :{
        type:String,
        required: true
    },
    token:{
        type : String
    }

},{
    timestamps : true,
})

//before saving the password into db hash it  , async does not need next.
UserSchema.pre("save",async function () {
    if(!this.isModified("password")) 
        return 
    
    this.password =  await bcrypt.hash(this.password ,10) 
 
})

UserSchema.methods.isPasswordCorrect   = async function(password){
         return await bcrypt.compare( password ,this.password) 
}


const User = mongoose.model("User",UserSchema)

export {User}