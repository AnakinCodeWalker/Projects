import { StatusCodes } from "http-status-codes";
import { app } from "./app";
import { env } from "./config/env";
import userRoutes from "./routes/user.routes"
import ApiError from "./utils/ApiError"
try {


    app.use("/api/v1/users", userRoutes)

    app.listen(env.PORT || 8080)
    console.log(` http-server started listening on Port ${env.PORT}`);

} catch (error) {
    if (error instanceof Error) {

        console.log("error in index.ts");
        console.log(`${error.message}`);
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR,
            "can start the server");
    }
}
