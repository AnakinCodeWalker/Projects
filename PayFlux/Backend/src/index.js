import app from "./app.js";
import env from "./config/env.js";
import db from "./db/index.js";

db()
    .then(() => {
        try {
            app.listen(env.PORT || 8080, () => {
                console.log(`server started listening on ${env.PORT}`);
            })
        } catch (error) {
            console.log(`error in starting the server`);
            console.log(`${error.message}`);
        }
    })
    .catch((error) => {
        console.log(`${error.message}`);
        process.exit(1)
    })


