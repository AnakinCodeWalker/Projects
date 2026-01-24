
// class ApiError extends Error {
// //  u have to define the variable as well common class knowledge
// public statusCode: number;
// public errors?: any[];

 
//     constructor(statusCode: number, message: string, errors?: any[]) {
//         super()  //constructor from derived classes must call super class constructor
//         this.statusCode = statusCode;
//         this.errors = errors;

//         // maintains proper error stackTrace.
//         Object.setPrototypeOf(this, ApiError.prototype);
//     }
// }


class ApiError extends Error {

  //  define the class variable  and later on initialize them.
  public statusCode: number;
  public errors?: any[];

  constructor(statusCode: number,message: string="something went wrong",errors?: any[]) {
   
    super(message);

    this.statusCode = statusCode;
    this.errors = errors || [];

    // Maintains proper stack trace (important)
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export { ApiError }