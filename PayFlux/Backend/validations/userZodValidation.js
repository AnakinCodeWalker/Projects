import { z } from "zod"

const userSignupValidation = z.object({

    userName: z.string()
        .trim()
        .min(3, { "message": "userName must be atleast 3 characters long" })
        .max(30, { "message": "userName  must be at most 30 characters" })
        .regex(/^[a-zA-Z0-9_]+$/, {message: "Username can only contain letters, numbers, and underscores"}),

    firstName: z.string()
        .trim()
        .min(1, { "message": "FirstName can not be empty" })
        .max(30, { "message": "firstName  must be at most 30 characters" }),

    lastName: z.string()
        .trim()
        .min(1, { "message": "lastName can not be empty" })
        .max(30, { "message": "lastName  must be at most 30 characters" }),

    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")

})
const userSigninValidation = z.object({
userName: z.string()
        .trim()
        .min(3, { "message": "userName must be atleast 3 characters long" })
        .max(30, { "message": "userName  must be at most 30 characters" })
        .regex(/^[a-zA-Z0-9_]+$/, {message: "Username can only contain letters, numbers, and underscores"}),

password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    
})

const userResetPasswordValidation = z.object({

    newPassword: z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
    
})

export {
    userSigninValidation,
    userSignupValidation,
    userResetPasswordValidation
}