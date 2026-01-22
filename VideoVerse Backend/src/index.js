import {app} from './app.js'
import { db } from '../public/temp/db/index.js'
import dotenv from 'dotenv'
dotenv.config()

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = YAML.load(
  path.join(__dirname, "docs", "Swagger.yaml") 
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


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
