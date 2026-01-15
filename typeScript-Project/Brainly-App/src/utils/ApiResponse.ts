
class ApiResponse <T = unknown> {
    // define the class variable later on initialize them.
    statusCode: number
    message: string
    success: boolean
     data ? : T
    constructor(statusCode: number, message: string, success: boolean = true, data ?:T) {
        this.statusCode = statusCode,
            this.data=data   // we dont know kis type ka data aayega so we made it a generic and unknown
        this.message = message,
            this.success = success
    }

}

export  {ApiResponse}