import mongoose, {Schema ,model} from "mongoose"
const meetingSchema = new Schema({
userId:{
    type:String,

    // making this required here
    required:true
},
meetingCode :{
    type:String,
    required:true
},
date :{
    type : Date ,
    default :Date.now,
    required :true
}
},{
    timestamps:true
})

const Meeting = model("Meeting",meetingSchema)

export default Meeting