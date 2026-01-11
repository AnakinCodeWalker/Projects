import ApiError from "../utils/ApiError.js";


/*
 This became a higher order function if i dont make it a high order function  i have to write indiviual , validationMiddlewares it will lead to code duplicacy
*/
const zodvalidateMiddleware =(schema)=>{
return (req,res,next)=>{
    try{
//  schema.parse --> check for validation and returns clean data..
//   "     abc@gmail.com     "  --> "abc@gmail.com"
//  also remove unneccessary field from the body [not required in that route.]
     req.body = schema.parse(req.body); // sanitized data
    next();


    }catch(err){
     console.log(`error in zod validation middleware`);
     next(new ApiError(400,"Invalid request data"))   
    }
}
}
export default zodvalidateMiddleware