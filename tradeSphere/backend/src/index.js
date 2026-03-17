import express from "express"
import env from "./config/env.js"
const app = express()

const PORT = env.PORT

console.log(PORT);
try {
    await db().then(() => {
        app.listen(PORT, () => {
            console.log(`app started listening on port ${PORT}`);
        }).catch((error) => {
            console.log("can not start the server");
            console.log(`${error.message}`);

        })

    })
} catch (error) {
    console.log(`error connecting mongodb`);
    console.log(`${error.message}`);
}
