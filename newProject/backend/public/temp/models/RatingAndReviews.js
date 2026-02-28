import mongoose, { model, Schema } from " mongoose"

const RatingAndReviewsSchema = new Schema({
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
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
})
const RatingAndReviews = model("RatingAndReviews", RatingAndReviewsSchema)
export default RatingAndReviews