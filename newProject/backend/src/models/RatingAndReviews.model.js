// added course model as refrence here do updation in controller accordingly.  
import mongoose from "mongoose"

const RatingAndReviewsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,   
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
        index: true,
    }
}, {
    timestamps: true,
})

const RatingAndReviews = mongoose.model("RatingAndReviews", RatingAndReviewsSchema)

export default RatingAndReviews