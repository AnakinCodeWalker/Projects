import { Prisma } from "../generated/prisma/browser.js"

//  isme user jo input dega whi aata hai  aligned to zod 
export interface signupBody {
userName : string,
email:string
} 

export interface emailParams {
    //  [key:string]: string  // this is bad now multiple key v aa skti hai 
// only allow token
token : string
}


//  Blogs 
export interface createBlogInterface{
title : string,
content : Prisma.JsonValue,
coverImageUrl ? : string,
published : boolean
}

export interface userNameParams{
userName :string
}

// searchBlogsBy userName

export interface searchBlogsInterface{
    userName ? : string
}

export interface blogParams{
    id : string
}