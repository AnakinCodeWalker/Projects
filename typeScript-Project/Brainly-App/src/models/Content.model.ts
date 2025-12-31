import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({

   

},{
    timestamps:true

})

const Content = mongoose.model("Content",ContentSchema)
export default Content