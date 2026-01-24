import mongoose from "mongoose";
const LinkSchema = new mongoose.Schema({

    hash:{
        type:String
    },
    userId:{




        ref:"User"

        
    }
},{
    timestamps:true
})

const Link = mongoose.model("Link",LinkSchema)
export default Link

//     when the relationship is one to many or many to one , create an array of object
