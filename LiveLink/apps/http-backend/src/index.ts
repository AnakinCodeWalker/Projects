import { app } from "./app";

try {

    app.listen(process.env.PORT||8080)
                   
} catch (error) {
    if(error instanceof Error)
        console.log();
        // throw newApiError(,"");

}
