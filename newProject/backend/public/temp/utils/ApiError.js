class ApiError extends Error {

    constructor(statuscode, message = "Something went Wrong", stack = " ", errors = []) {

        super(message);
        this.errors = errors,
            this.statuscode = statuscode
        this.stack = stack
        this.data = null

        if (stack)
            this.stack = stack
        else
            Error.captureStackTrace(this, this.constructor)
    }
}


export default ApiError