
class ApiResponse <T = unknown> {
    // define the class variable later on initialize them.
    statusCode: number
    message: string
     data  : T | undefined   // if the data is present then of T otherwise undefined. 
    success : boolean = true 
    constructor(statusCode: number, message: string, data ? :T) { //checking if data is present in the constructor then type t otherwise undefined
        this.statusCode = statusCode,
        this.message   = message, 
        this.data = data   // we dont know kis type ka data aayega so we made it a generic and unknown

    }

}

export  {ApiResponse}


/*
class ApiResponse<T = unknown> {
  statusCode: number
  message: string
  success: boolean
  data: T | undefined

  constructor(
    statusCode: number,
    message: string,
    data?: T,
    success: boolean = true
  ) {
    this.statusCode = statusCode
    this.message = message
    this.success = success
    this.data = data
  }
}

export { ApiResponse }
*/
