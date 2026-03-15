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
   type: Number,
   required: true
},
    thumbnail: {
        type: String
    },
    tag: {
        type: [String],  // array of string..
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },

    //  koi course purcahse krega tb milega yeh 
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        
    }],
    instructions: {
        type: [String]
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
        default : "Draft"
    }
}, {
    timestamps: true
})

const Course = mongoose.model("Course", CourseSchema)

export default Course