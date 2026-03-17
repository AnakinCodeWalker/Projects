import mongoose from "mongoose";
import env from "../config/env";


const db = async () => {

    try {
        await mongoose.connect(env.MONGOURI)
        console.log(`connected to db`);
    } catch (error) {
        console.log(`error in connecting db`);
        console.log(`${error.message}`);
    }

}

export default db

