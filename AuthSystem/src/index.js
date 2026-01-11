import { app } from "./app.js";
import { db } from "../public/temp/db/db.js";
import UserRoutes from '../public/temp/routes/User.route.js'
import dotenv from "dotenv"
dotenv.config()

const PORT =Number(process.env.PORT)
db().then(()=>{
try {
    app.listen(PORT||8080,()=>{
        console.log(`Server started listening on port ${PORT}`);
    })
} catch (error) {
    console.log(`inside src/index.js`);
    console.log(`error in starting server`);
    console.log(`${error.message}`);
}
}).catch((error)=>{
console.log(`error in connecting to db`);
console.log(`${error.message}`);
})

app.use("/api/v1/users",UserRoutes)