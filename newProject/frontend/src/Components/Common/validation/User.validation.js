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
        .min(6, { message: "Password must be at least 6 characters long" })
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
        .min(6, { message: "Password must be at least 6 characters long" })
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

    // otp: z.string({ message: "otp must be string" })
    //     .min(6, { message: "otp  length must be of 6 digits" })
    //     .max(6, { message: "otp  length must be of 6 digits" }),

    // contactNumber: z.string(),

    role: z.enum(["Student", "Admin", "Instructor"]).optional(),


})

export const signinInput = z.object({

    email: z
        .string()
        .trim()
         .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),

    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
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

export const changePasswordInput = z.object({


    email: z
        .string()
        .trim()
        .email({ message: "Invalid email address" }),

    oldPassword: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
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
        .min(6, { message: "Password must be at least 6 characters long" })
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
        .min(6, { message: "Password must be at least 6 characters long" })
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
