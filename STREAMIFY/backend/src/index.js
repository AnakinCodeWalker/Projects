import db from "./db/index.js"
import env from "./config/env.config.js";
import app from "./app.js"

db().then(() => {
    try {
        app.listen(env.PORT || 8080, () => {
            console.log(`${env.PORT}`);
            console.log(`Server started listening on port ${env.PORT}`);
        })
    } catch (error) {
        console.log(`inside src/index.js`);
        console.log(`error in starting server`);
        console.log(`${error.message}`);
    }
}).catch((error) => {
    console.log(`error in connecting to db`);
    console.log(`${error.message}`);
})



