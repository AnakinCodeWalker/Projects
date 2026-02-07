import mongoose from "mongoose";
import { boolean } from "zod";
const LinkSchema = new mongoose.Schema({

    share:{
        type:boolean
    },
    hash:{
        type:String
    },
    userId:{
    
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true      
    },
    unique:{
        type:boolean,
        default:true,
    }
},{
    timestamps:true
})

const Link = mongoose.model("Link",LinkSchema)
export default Link

//     when the relationship is one to many or many to one , create an array of object
