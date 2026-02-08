import mongoose from "mongoose";
import env from "../config/env.js"
const db = async () => {
    try {
        await mongoose.connect(env.MONGOURI)
        console.log('connected to mongodb');
    } catch (error) {
        console.log(`error connecting  mongodb`);
        console.log(`${error.message}`);
        process.exit(1)
    }
}

export default db