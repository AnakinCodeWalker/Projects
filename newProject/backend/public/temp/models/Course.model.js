import mongoose, { model, Schema } from " mongoose"

const CourseSchema = new Schema({
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
        type: string
    },
    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }],
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "RatingAndReviews"
    }],
    price : {
        type : String,
    },
    thumbnail :{
type : String
    },
    tag :{
                type: mongoose.Schema.Types.ObjectId,
ref : "Tag"
    },
    studentsEnrolled : [{
        type: mongoose.Schema.Types.ObjectId,
ref  : "User",
required : true
    }]
}, { 
    timestamps: true 
})

const Course = model("Course", CourseSchema)

export default Course