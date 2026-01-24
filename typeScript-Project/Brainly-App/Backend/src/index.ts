import { app } from "./app.js";
import { db } from "./config/db.js";
import {userRoutes ,courseRoutes ,brainRoutes} from "./routes/User.route.js"

import {env} from './config/env.js'
// check if there is port present then convert it into a number else make it undefined.

const PORT  = env.PORT?Number(env.PORT):undefined

// if port is not present or not a number  print the error.
if(!PORT ||Number.isNaN(PORT)){
       console.log(`Port is undefined or null`);
       process.exit(1)
}
db().
then((result) => {
   try {
     app.listen(PORT||8080,()=>{
         console.log(`server Started at port :  ${PORT}`);
     })
   } catch (error) {
       if(error instanceof Error){
        console.log(`can not start the server`);
        process.exit(1)   
    }
    }


}).catch((err) => {
    if(err instanceof Error){
    console.log(`error connecting db ${err.message}`);
process.exit(1)}
});

app.use("/api/v1/users",userRoutes)
app.use("/api/v1/course",courseRoutes)
app.use("/api/v1/brain",brainRoutes)

// only throw api error when the  method has access to req,res..