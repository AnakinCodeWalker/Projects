import {app} from './app.js'
import { db } from '../public/temp/db/index.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT=process.env.PORT

db()
.then(
()=>{
try {
    app.listen(PORT||8080,()=>{
    console.log(`server started at ${PORT}`);
    })
} catch (error) {

    console.log("can not start the server")
    console.log(`Error in index.js ${err.message}`);
}
}
)
.catch((err)=>{
    console.log(`Mongo db connection error ${err.message}`);
})
