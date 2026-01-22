import Content from "../models/Content.model.js"
import Tags from "../models/Tags.model.js"
import Link from "../models/Link.model.js"
import { Request ,Response } from "express"
const createContent = async (req:Request ,res:Response)  : Promise<void> => {

const  {title ,link } = req.body as {
    title : string ,
    link : string,
    
}     

// kiska content hai uske liye user id v store krna hoga 
//   userId 


const newContent = await Content.create ({
    title ,
    link,
    // yeh wala array of object hoga
    // tags  :  
})



}

const getContent = async (req:Request ,res:Response)  : Promise<void> => {
    

}

export {
    createContent,
    getContent
}