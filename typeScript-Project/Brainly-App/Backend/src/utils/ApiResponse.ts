//  you can not make anything optional while initiallizing it
//  u can make it optional only during declaration
class ApiResponse <T = unknown> {
    // define the class variable later on initialize them.
    public statusCode: number
    public message: string
     public data ? : T   // if the data is present then of T otherwise undefined. 
    public success : boolean = true 
    constructor(statusCode: number, message: string, data :T) { //checking if data is present in the constructor then type t otherwise undefined
        this.statusCode = statusCode,
        this.message   = message, 
        this.data = data   // we dont know kis type ka data aayega so we made it a generic and unknown

    }

}

export  {ApiResponse}

