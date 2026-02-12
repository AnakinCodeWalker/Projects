import { Router } from "express";

import {
  createBlog,
  searchBlogs,
  getBulkBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById
} from "../controllers/blog.controller.js"

const blogRouter = Router()

blogRouter.route("/")
  .post(createBlog)

blogRouter.route("/search")
  .get(searchBlogs)

// all blogs 
blogRouter.route("/bulk")
  .get(getBulkBlogs)

// put id in the end always 
blogRouter
  .route("/:id")
  .get(getBlogById)
  .put(updateBlogById)
  .delete(deleteBlogById)


export default blogRouter

/*

blogRouter
  .route("/")
  .post(createBlog)

blogRouter
  .route("/bulk")
  .get(getBulkBlogs)

blogRouter
  .route("/:id")
  .get(getBlogById)
  .put(updateBlog)
  .delete(deleteBlog)

*/

/*
POST /api/v1/blog
PUT /api/v1/blog
GET /api/v1/blog/:id
GET /api/v1/blog/bulk
*/


// Slug = human-readable identifier used in URL instead of numeric ID.
// /blog/learn-typescript-fast


// params
// /blog?id=9283
