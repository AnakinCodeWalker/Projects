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