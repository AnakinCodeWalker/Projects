import { z } from "zod"

export const signupInput = z.object({

    fullName: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(30, { message: "Name must be at most 30 characters long" }),


    email: z
        .string()
        .trim()
        .email({ message: "Invalid email address" }),

    password: z
        .string()
        .min(6, { message: "Password must be at least 8 characters long" }),

    //  profilePic :z.string().optional(),

})

export const signinInput = z.object({

    email: z
        .string()
        .trim()
        .email({ message: "Invalid email address" }),

    password: z
        .string()
        .min(6, { message: "Password must be at least 8 characters long" }),

})

export const onboardInput = z.object({
    fullName: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(30, { message: "Name must be at most 30 characters long" })
        .optional(),

    bio: z
        .string()
        .optional(),

    nativeLanguage: z
        .string()
        .optional(),

    learningLanguage: z
        .string()
        .optional(),

    location: z
        .string()
        .optional()
})