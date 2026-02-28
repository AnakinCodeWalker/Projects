import mongoose, { model,  Schema } from "mongoose"

const SectionSchema = new Schema({
    sectionName: {
        type: String
    },
    subSection: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "SubSection"

    }],
}, {
     timestamps: true
     })

const Section = model("Section", SectionSchema)

export default Section