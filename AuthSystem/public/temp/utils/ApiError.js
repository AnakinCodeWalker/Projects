class ApiError extends Error {

    constructor(statuscode, message = "Something went Wrong", stack = " ", errors = []) {
        
        //  -->    u have to call super class as well.
        super(message);
        this.errors = errors,
            this.statuscode = statuscode
            this.stack = stack
        this.data = null

        // it shows where the error happened (file, line number, call chain)
        if (stack)
            this.stack = stack
        else
            Error.captureStackTrace(this, this.constructor)

    }


}

export default ApiError