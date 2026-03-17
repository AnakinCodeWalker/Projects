import { z } from "zod"

export const signupInput = z.object({
    firstName: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(30, { message: "Name must be at most 30 characters long" }),


    lastName: z
        .string()
        .min(3, { message: "lastname must be at least 3 characters long" })
        .max(30, { message: "lastname must be at most 30 characters long" }),




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

    confirmPassword: z
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


    contactNumber: z.number(),

    role: z.enum(["User", "Creator"]).optional(),

    image: z.string(),
})

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


export type signinType = z.infer<typeof signinInput>




export const changePasswordInput = z.object({


    email: z
        .string()
        .trim()
        .email({ message: "Invalid email address" }),

    oldPassword: z
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

    newPassword: z
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

    confirmNewPassword: z
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
})

export type changePasswordType = z.infer<typeof changePasswordInput>





