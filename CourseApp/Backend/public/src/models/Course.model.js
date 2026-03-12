import mongoose from "mongoose"

const CourseSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    whatYouWillLearn:{
        type:String,
        required:true,
    },
    

},{timestamps:true})

const Course = mongoose.model("CourseSchema",Course)