import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
const MONGO_URL=process.env.MONGO_URL

const db =()=>{
 
    mongoose.connect(MONGO_URL)
.then(()=>{
console.log(`connected to mongodb`);
})
.catch((err)=>{
console.log(`error connecting mongodb in db/index.js`);
console.log(`${err.message}`);
})
}
export {db}