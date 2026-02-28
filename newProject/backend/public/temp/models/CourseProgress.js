import mongoose, { model , Schema } from "mongoose";

const CourseProgressSchema = new Schema({

    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    completedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubSection"
    }]

}, {
    timestamps: true
})

const CourseProgress = model("CourseProgress", CourseProgressSchema)

export default CourseProgress