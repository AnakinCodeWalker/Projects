import mongoose from "mongoose"
import env from "../config/env.config.js";

const db = async()=>{
try {
    await mongoose.connect(env.MONGO_URL)
    console.log(`connected to db`);
} catch (error) {
    console.log(`error connecting mongodb`);
    console.log(`${error.message}`);
    process.exit(1)
}
}
export  default db