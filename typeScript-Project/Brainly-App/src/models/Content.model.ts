import mongoose from "mongoose";
import { string } from "zod";

const ContentSchema = new mongoose.Schema({

   title:{
    type:string
   },
   link:{
    type:string
   },
   tags:[
    {
        type:mongoose.Schema.ObjectId,
        ref : "Tag"
    }
   ],

//     when the relationship is one to many or many to one , create an array of object
   userId:[{
     type:mongoose.Schema.ObjectId,
        ref : "User",
        require:true
   }]

},{
    timestamps:true

})

const Content = mongoose.model("Content",ContentSchema)
export default Content