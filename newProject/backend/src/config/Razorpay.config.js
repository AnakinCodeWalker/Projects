import Razorpay from "razorpay"
import env from "./env.config.js"

export const instance = new Razorpay({
    key_id : env.RAZORPAY_KEY,
    key_secret : env.RAZORPAY_SECRET
}) 
