import mongoose from "mongoose"
const CourseSchema = new mongoose.Schema({

    courseName: {
        type: String
    },
    courseDescription: {
        type: String,
    },
    instructor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    whatYouWillLearn: {
        type: String
    },
    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }],
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReviews"
    }],
    price: {
        type: String,
    },
    thumbnail: {
        type: String
    },
    tag: {
      type : [String],  // array of string..
      required : true
    },
    category : {
        type: mongoose.Schema.Types.ObjectId,
ref : "Category"
    },
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    instructons :{
        type : [String]
    },
    status:{
        type : String,
        enum : ["Draft","Published"]
    }
}, {
    timestamps: true
})

const Course = mongoose.model("Course", CourseSchema)

export default Course