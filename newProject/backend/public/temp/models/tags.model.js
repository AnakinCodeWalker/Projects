import mongoose, { Schema, model } from "mongoose";

const tagsSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    description: {
        type: String
    },
    course: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]

}, { timestamps: true })

const Tags = model("Tags", tagsSchema)
export default Tags