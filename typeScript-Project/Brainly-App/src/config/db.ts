import mongoose from "mongoose"
import { env } from "./env.js";  // here the syntax should be .ts why .js ?
const db = async ():void=>{  //you have to use the <T> i forgot the name [will search later on]
    try {
        await mongoose.connect(env.MONGO_URL);
        console.log(`connected to monogo db`);
    } catch (error) {
    console.log(`error connecting mongodb`);
    
    // you have to narrow it down to use it 
    
    console.log(`${error.message}`);    

    }
} 
export {db}