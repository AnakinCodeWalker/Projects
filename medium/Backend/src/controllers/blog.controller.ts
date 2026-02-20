import { Request, Response } from "express";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { createPostInput, createPostType, updatePostInput, updatePostType } from "@anakincodewalker/common"
import { asyncHandler } from "../utils/asyncHandler.js";
import prisma from "../lib/prisma.js";
import { searchBlogsInterface } from "../types/auth.types.js";


// add coverImage as optional field. in required controllers
//skipping pagination logic for now rest are done.


//  express 5 mai global error handler kai passs direct chla jyega so dont worry to wrap around ,trycatch
//  to  fir asynhandler use krte hai kyuki , industry standard hai 
// safeparse returns an object
// {  success: true ; data: signupType;}
// { success: false, error: ... } -- if fails

// when query starts from user and u want to extract blog in the result you could do .blog or .linekdmodel to nesting ka 1 nevel ht jata hai 
// Relationship se nested object ban jata hai, aur nested property access karne ke liye . use karte hain.

const createBlog = asyncHandler(async (req: Request<{}, {}, createPostType, {}>, res: Response): Promise<void> => {

// extract userId from req.user (JWT middleware)


    const result = createPostInput.safeParse(req.body)

    // if left side exists krti hai tb hi , aage badho.
    
    //@ts-ignore
    const userId = req.userId   // jwt id

    if (!userId)
        throw new ApiError(401, "unauthorized")
    if (!result.success)
        throw new ApiError(400, "validation failed")


    const newBlog = await prisma.blog.create({
        data: {
            title: result.data.title,
            content: result.data.content,
            userId,
            published: result.data.published,
            coverImageUrl: result.data.coverImageUrl,
        }, select: {
            id: true,  // model ki id 
            title: true,
            content: true,
            published: true,
            coverImageUrl: true
        }
    })
    res.status(201).json(
        new ApiResponse(201, "blog created", {
            blog: newBlog,
            blogId : newBlog.id
        }))

})



const searchBlogs = asyncHandler(async (req: Request<{}, {}, {}, searchBlogsInterface>, res: Response): Promise<void> => {

    const { userName } = req.query
    if (!userName) throw new ApiError(400, "username required")

    const searchByUsername = await prisma.user.findUnique({
        where: {
            userName
        }, select: {
            blog: {
                where: {
                    published: true
                },
                select: {
                    id : true,
                    userId : true,
                    title: true,
                    content: true,
                    coverImageUrl: true
                }, orderBy: {
                    createdAt: "desc"
                }
            }
        },
    })

    if (!searchByUsername)
        throw new ApiError(404, "user name : does not exists ! ")

    res.status(200).json(new ApiResponse(200, `Blog of username : : ${userName} `, {
        blog: searchByUsername.blog,

    }))


})




//  either you can make a request<generic type for params which i was doing earlier but then you have to fix for global asynchandler as well>
const updateBlogById = asyncHandler(async (req: Request<{}, {}, updatePostType, {}>, res: Response): Promise<void> => {

    // or you can use this slightly cleaner approach.
//    getting the  blogId by params
    const url  = req.url

    if(!url){
    throw new ApiError(403, "unauthorized user")
    }  
    // utility methods to work with the query string of a URL.
    const queryParams  = new URLSearchParams(url.split('?')[1])
    const blogId = queryParams.get('id')

    
    //@ts-ignore   // kis specific user ki blog ko edit krna hai
    const userId = req.userId

    const result = updatePostInput.safeParse(req.body)

    if (!result.success)
        throw new ApiError(400, "validation failed")

    if (!userId)
        throw new ApiError(403, "unauthorized user")

    if (!blogId)
    throw new ApiError(400, "invalid blog id")
    
// using updateMany to safely check ownership (userId + blogId)
 
    const updatedBlogCount = await prisma.blog.updateMany({
        where: {
            userId: userId, //jwt
            id: blogId     // params  //  kis specific blog ko edit krna hai 

        }, data: {
            title: result.data.title,
            content: result.data.content,
            coverImageUrl: result.data.coverImageUrl
        }

    })
    if (updatedBlogCount.count == 0)
        throw new ApiError(403, "can not update")

    res.status(200).json(new ApiResponse(200, "Number of blog updated : ", {
     updatedBlogCount : updatedBlogCount.count

    }))

})








//  todo :  Add pagination logic  
//  add pagination logic ,limit=10 instead of laoding all the blog at once  we will load 10 blogs at a time.

//  you can tweak a little bit and only then , user will be able to see the blogs.

const getBulkBlogs = asyncHandler(async (req: Request, res: Response): Promise<void> => {

 /*

    //@ts-ignore
    const userId = req.userId

 if (!userId)
        throw new ApiError(403, "unauthorized user")

 */
    const allBlogs = await prisma.blog.findMany(
        {
            where: {   
                                     //  userId: userId, 
                published: true
            }, select: {
                title: true,
                content: true,
                coverImageUrl: true
            }, orderBy: {
                createdAt: "desc"
            }
        }
    )

    res.status(200).json(new ApiResponse(200, "All blogs", {
        blogs: allBlogs
    }))

})






const getBlogById = asyncHandler(async (req: Request<{},{},{},{}> ,res: Response): Promise<void> => {
    
    // get the url from req object
    const url = req.url

    const searchUrl  =  new URLSearchParams(url.split('?')[1]) 
   
    // get blogId from params
           const blogId =  searchUrl.get('id')     

    if (!blogId)
        throw new ApiError(400, "Invalid blog id")

        const blogById = await prisma.blog.findFirst({
            where: {
                id: blogId,
                published: true
            },
            select: {
                title: true,
                content: true,
                coverImageUrl: true
            }
        })

        if (!blogById)
            throw new ApiError(404, "blog not found")

        res.status(200).json(new ApiResponse(200, "blogs of current userId :", {
            blog: blogById
        }))


})

const deleteBlogById =asyncHandler (async (req: Request<{},{} ,{} ,{}>, res: Response): Promise<void> => {

        
    const url = req.url

       if(!url)
    throw new ApiError(403, "unauthorized user")
     
       const searchUrl = new URLSearchParams(url.split("?")[1])

       const blogId = searchUrl.get('id')

    //@ts-ignore    
    const userId = req.userId  // user model id

      
        if (!userId)
            throw new ApiError(403, "unauthorized user")

        if (!blogId)
            throw new ApiError(400, "Invalid Blog id")

        const deletedBlog = await prisma.blog.deleteMany({
            where: {
                id: blogId,
                userId: userId
            }
        })
        if (deletedBlog.count === 0) {  //delete many return  0 if no user has been deleted.
            throw new ApiError(403, "can not delete")
        }
        res.status(200).json(new ApiResponse(200, "blog deleted Successfully"))



})



export {
    createBlog,
    searchBlogs,
    getBulkBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById
}


/*
// input  by userId : check from zod
// request generic  aligned to userId : input based on zod schema
    // aligned to db

*/

// Request<Params, ResBody, ReqBody, ReqQuery>request generics
// last wala generic is optional so u can do {} ,{} ,{} , leave it

/*
await prisma.model.method({
   where:{...},        // filter
   select:{...},       // choose fields
   include:{...},      // relations
   orderBy:{...},      // sorting
   skip:...,           // pagination
   take:...            // pagination
})
*/

/*  if /:id of db is string uuid then req.params.id == id  in db
but not in slug 

if id  is in number then --- number(req.params.id)
*/

/*
where mai nesting not allowed hai .
select and include mai allwoed hai 
include+relation best
*/
/*
Query
 ├── where      → filter only
 ├── select     → fields only
 ├── include    → relations only  -- iske andar fir nesting ..
 └── orderBy    → sorting only
 
 Lekin top level pe select + include ek saath nahi

 */

/*
use delete many if deleted then ok , if not then return count
delete throws error 
delete many is safe and avoid race condition.
*/

/*
if you want to use skip you have to use order by  -- without this pagination not possible/inconsistent.
*/


