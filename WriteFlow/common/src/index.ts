import { z } from "zod"

export const  signupInput = z.object({
    
    name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(30, { message: "Name must be at most 30 characters long" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Name can only contain letters and spaces",
    })
    .optional(),
});

//  jo v signupInput ka type hai infer kro usko or signuptype mai daal do 
// will update , accordingly agar schema mai change karoge to..
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
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
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
    .string()
    .trim()
    .min(1, { message: "Content cannot be empty" })
    .max(10_000, { message: "Content is too long" }),
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
    .string()
    .trim()
    .min(1, { message: "Content cannot be empty" })
    .max(10_000, { message: "Content is too long" })
    .optional(),
});

export type updatePostType = z.infer<typeof updatePostInput>


//  strict -- no thing extra allowed.
//  passthorugh  -- extra fields allowed.
//optional makes fields optional

