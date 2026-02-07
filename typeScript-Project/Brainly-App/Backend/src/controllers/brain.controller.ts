import { Request ,Response } from "express"
import Link from "../models/Link.model.js"
import { randomBytes } from "node:crypto";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const share = async (req:Request ,res:Response):Promise<void> => {
 const hash = await randomBytes(32).toString("hex");
    
  try {
      const {share} = req.body as {
          share:boolean
      }
   if(!share)
      throw new ApiError(304,"All fields required")
  
  if(share){
    const link = await Link.create({
          //@ts-ignore
    userId : req.userId,
    hash: hash,
      })

    if(!link)
        throw new ApiError(500,"Internal Server Error")

    //  return an Api response only sending the link
    res.status(201).json({
     link   
    })

      }else{
     await Link.deleteOne({
          //@ts-ignore   
      userId : req.userId,
     })

    //   return apiResoponse no link created..
  }
  } catch (error) {
    if(error instanceof Error)
        throw new ApiError(500,"Internal server Error")
  }
}

const shareLink = async (req:Request ,res:Response):Promise<void> => {
    
    const {shareLink} = req.params

    if(!shareLink)
        throw new ApiError(304,"provide a shareLink")

    const findUser = await Link.findOne({
        hash:shareLink
    })

    if(!findUser)
        throw new ApiError(304,"sorry incorrect link")

    // if link exists

    
    // extract the user from this link

}

export {share ,shareLink}