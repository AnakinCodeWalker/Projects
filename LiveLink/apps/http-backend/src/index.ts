import { StatusCodes } from "http-status-codes";
import { app } from "./app.js";
import { env } from "./config/env.js";
import userRoutes from "./routes/user.routes.js"
import ApiError from "./utils/ApiError.js"
try {


    app.use("/api/v1/users", userRoutes)

    app.listen(env.PORT || 8080)
    console.log(` http-server started listening on Port ${env.PORT}`);

} catch (error) {
    if (error instanceof Error) {

        console.log("error in index.ts");
        console.log(`${error.message}`);
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR,
            "Error starting the server");
    }
}
