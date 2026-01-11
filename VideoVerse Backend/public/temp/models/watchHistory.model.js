import mongoose ,{Schema ,model} from "mongoose";

const watchHistorySchema = new Schema({

},{
   timestamps:true 
})
const watchHistory = model("watchHistory",watchHistorySchema)

export {watchHistory}