//  you can not make anything optional while initiallizing it
//  u can make it optional only during declaration
class ApiResponse<T = unknown> {  //generic
    public statusCode: number
    public message: string
    public success: boolean
    public data?: T 
    constructor(statusCode: number, message: string, data?: T) {
     
        this.message = message
        this.statusCode = statusCode
        this.success = true
        this.data = data
    
    }

}

export default ApiResponse