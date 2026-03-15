import  { Schema, model } from "mongoose";
import mailsender from "../utils/mailSender.js";

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true,

    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    }

}, { timestamps: true })


async function sendVerificationMail(email, otp) {
    
    try {

        const mailResponse = await mailsender(email,"verfication email",otp)
console.log("mail sent successfully.. " + mailResponse);
    } catch (error) {
        console.log(`${error.message}`);
        console.log(`error inside the prehook`);
    }
}

otpSchema.pre("save",async function () {
    await sendVerificationMail(this.email,this.otp)
    
})
const Otp = model("Otp", otpSchema)
export default Otp