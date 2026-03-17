import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import prisma from "../lib/prisma.js";

const createComment = asyncHandler(async (req: Request<{}, {}, { content: string }>, res: Response): Promise<void> => {

    // or you can use this slightly cleaner approach.
    //    getting the  blogId by params
    const url = req.url

    if (!url) {
        throw new ApiError(403, "unauthorized user")
    }
    // utility methods to work with the query string of a URL.
    const queryParams = new URLSearchParams(url.split('?')[1])
    const blogId = queryParams.get('blogId')

    // @ts-ignore
    const userId = req.user?.id

    const { content } = req.body

    if(!userId||!blogId||!content)
        throw new ApiError(400,"Invalid Inputs") 

    const createdComment = await prisma.comment.create({
        data: {
            content: content,
            userId: userId,
            blogId: blogId
        }
    })
    if (!createdComment)
        throw new ApiError(400, "Can not create Comment")

    res
        .status(201)
        .json(new ApiResponse(201, "comment created successfully", {
            "createdComment": createdComment
        }))
})

const getAllCommentByBlog = asyncHandler(async (req: Request<{}, {}, {}, {}>, res: Response): Promise<void> => {
  const url = req.url

    if (!url) {
        throw new ApiError(403, "unauthorized user")
    }
    // utility methods to work with the query string of a URL.
    const queryParams = new URLSearchParams(url.split('?')[1])
    const blogId = queryParams.get('blogId')

// const allComments = await prisma.comment.findMany({
//     where:{
//         id :blogId
//     },
//     /////////////// yaha se code krle 
// })
    
})

const updateComment = asyncHandler(async (req: Request<{}, {}, {}, {}>, res: Response): Promise<void> => {

})

const deleteComment = asyncHandler(async (req: Request<{}, {}, {}, {}>, res: Response): Promise<void> => {

})

export {
    createComment,
    getAllCommentByBlog,
    updateComment,
    deleteComment
}