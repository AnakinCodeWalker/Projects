class ApiError extends Error {

    constructor(statuscode, message = "Something went Wrong", stack = " ", errors = []) {
        this.errors = errors,
            this.statuscode = statuscode
        this.message = message,
            this.stack = stack
        this.data = null

        // it shows where the error happened (file, line number, call chain)
        if (stack)
            this.stack = stack
        else
            Error.captureStackTrace(this, this.constructor)

    }


}