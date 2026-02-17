import { xid, z } from "zod"

export const  signupInput = z.object({
    
   firstName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(30, { message: "Name must be at most 30 characters long" }),
    

  lastName: z
    .string()
    .min(3, { message: "lastname must be at least 3 characters long" })
    .max(30, { message: "lastname must be at most 30 characters long" }),
    

    userName: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(30, { message: "Name must be at most 30 characters long" }),

    

     email: z
      .string()
      .trim()
      .email({ message: "Invalid email address" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(64, { message: "Password must be at most 64 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[@$!%*?&#]/, {
        message: "Password must contain at least one special character",
      })
}).strict()

//  jo v signupInput ka type hai infer kro usko or signuptype mai daal do 
// will update , accordingly agar schema mai change karoge to..
// we will use itlater on in the req  generics 
export type signupType = z.infer<typeof signupInput>


export const signinInput = z.object({
    
    email: z
      .string()
      .trim()
      .email({ message: "Invalid email address" }),

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(64, { message: "Password must be at most 64 characters long" })
      
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[@$!%*?&#]/, {
        message: "Password must contain at least one special character",
      }),
  })
  .strict();

  export type signinType = z.infer<typeof signinInput>




export const createPostInput = z.object({
    title: z
    .string()
    .trim()
    .min(1, { message: "Title cannot be empty" })
    .max(120, { message: "Title cannot exceed 120 characters" }),

  content: z
    .unknown(),

  coverImageUrl: z
  .string()
  .url()
  .optional(),
  
  published: z
  .boolean()
  .optional(),

});

export type createPostType = z.infer<typeof createPostInput>



export const updatePostInput = z.object({
    title: z
    .string()
    .trim()
    .min(1, { message: "Title cannot be empty" })
    .max(120, { message: "Title cannot exceed 120 characters" })
    .optional(),

  content: z
  .unknown()
    .optional(),

  
  coverImageUrl: z
  .string()
  .url()
  .optional(),    
});

export type updatePostType = z.infer<typeof updatePostInput>

// updateDetailsInput 
// updateDetailsType 
export const updateDetailsInput = z.object({
 firstName: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(30, { message: "Name must be at most 30 characters long" })
    .optional(),
   

  lastName: z
    .string()
    .min(3, { message: "lastname must be at least 3 characters long" })
    .max(30, { message: "lastname must be at most 30 characters long" })
    .optional(),

    userName: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(30, { message: "Name must be at most 30 characters long" })
    .optional(),
    

     email: z
      .string()
      .trim()
      .email({ message: "Invalid email address" })
      .optional(),
     

    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(64, { message: "Password must be at most 64 characters long" })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Password must contain at least one number",
      })
      .regex(/[@$!%*?&#]/, {
        message: "Password must contain at least one special character",
      })  .optional(),
}).strict()



export type updateDetailsType  = z.infer<typeof updateDetailsInput>

//  strict -- no thing extra allowed.
//  passthorugh  -- extra fields allowed.
//optional makes fields optional
  