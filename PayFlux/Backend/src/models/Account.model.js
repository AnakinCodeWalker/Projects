import { model, Schema } from "mongoose"

const AccountSchema = new Schema({
    userId: {
        type: Schema.Types.objectId,
        ref: "User",
        required: true
    },

    balance: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
})

const Account = model("Account", AccountSchema)

export default Account