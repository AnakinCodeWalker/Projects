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

//     when the relationship is one to many or many to one , create an array of object
