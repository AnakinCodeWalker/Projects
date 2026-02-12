import { Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createPostInput, createPostType, updatePostInput, updatePostType } from "@anakincodewalker/common";

const createBlog = async (req: Request, res: Response): Promise<void> => {


}

const searchBlogs = async (req: Request, res: Response): Promise<void> => {


}
const updateBlogById = async (req: Request, res: Response): Promise<void> => {


}

const getBulkBlogs = async (req: Request, res: Response): Promise<void> => {

    //  add pagination logic ,limit=10 instead of laoding all the blog at once  we will load 10 blogs at a time.


}
const getBlogById = async (req: Request, res: Response): Promise<void> => {


}

const deleteBlogById = async (req: Request, res: Response): Promise<void> => {


}

export {
    createBlog,
    searchBlogs,
    getBulkBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById
}
