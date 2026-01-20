import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const MONGO_URL=process.env.MONGO_URL

const db =async ()=>{
 
try {
    await mongoose.connect(MONGO_URL)
    console.log(`connected to mongo db`);
} catch (error) {
console.log(`error connecting mongo db`);
console.log(`${error.message}`);
process.exit(1)

}
}
export {db}