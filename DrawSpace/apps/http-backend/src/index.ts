import app from "./app";

try {

    app.listen(3000, () => "started on port 3000")

} catch (e) {

    if (e instanceof Error) {
        console.log(e);
        console.log(e.message);
    }

}