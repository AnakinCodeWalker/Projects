// this will help in reducing wrapping everything into the try catch block again and again

class ApiError extends Error {

    statusCode: number;
    data: any;
    success: boolean;
    errors: unknown[];

    constructor(statusCode: number, message: string = "Something went wrong", errors : unknown[] = [], stack = "") {

        super(message)
        this.statusCode = statusCode
        this.errors = errors
        this.data = null
        this.success = false

        if (stack)
            this.stack = stack
        else
            Error.captureStackTrace(this, this.constructor)

    }

}
export { ApiError }