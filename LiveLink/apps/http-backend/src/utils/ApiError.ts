class ApiError extends Error {

    public statusCode: number
    public errors?: any[];  //optional field and it can handle any  kind of error.
    constructor(statusCode: number, message: string = "something went wrong", errors?: any[]) {
        super(message)
        this.statusCode = statusCode

        this.errors = errors || [];

        // Maintains proper stack trace (important)
        Object.setPrototypeOf(this, ApiError.prototype);
    }

}

export default ApiError