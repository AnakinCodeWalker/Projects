import { app } from "./app.js";
import { db } from "../public/temp/db/db.js";
import UserRoutes from '../public/temp/routes/User.route.js'
import dotenv from "dotenv"
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

app.use("/api/v1/users",UserRoutes)

const PORT =Number(process.env.PORT)
db().then(()=>{
try {
    app.listen(Number(PORT)||8080,()=>{
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



