import express from "express"
import { db } from "./config/db.js";
const app=express();
import dotenv from 'dotenv'
dotenv.config()

// const PORT=process.env.PORT use the .env.ts file configuration

app.use(express.json({
    limit:"24kb"
}))

db().
then((result) => {
    console.log(`connected to the db`);
    console.log(`${result.message}`);
    app.listen(PORT||8080,()=>{
        console.log(`server Started at ${PORT}`);
    })


}).catch((err) => {
    console.log(`error connecting mongo db ${err.message}`);
});