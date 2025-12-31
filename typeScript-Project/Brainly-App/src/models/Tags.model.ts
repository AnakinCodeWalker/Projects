import mongoose from "mongoose";
const TagsSchema = new mongoose.Schema({

    title: {
        type: String
    }

}, {
    timestamps: true
})
const Tags = mongoose.model("Tags", TagsSchema)

export default Tags