class ApiError extends Error {

    constructor(statusCode, message = "something went wrong",stack =[] , errors = " ") {
        super(message)
        
        this.errors = errors,
        this.statusCode = statusCode
        this.stack =stack
        this.data =null

 // it shows where the error happened (file, line number, call chain)
        if (stack)
            this.stack = stack
        else
            Error.captureStackTrace(this, this.constructor)

    }
}

export default ApiError