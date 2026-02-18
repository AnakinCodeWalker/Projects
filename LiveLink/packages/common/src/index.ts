import {z} from "zod"

export const signupSchema = z.object({
    userName : z.string().min(3).max(20),
    email :    z.string().email().toLowerCase().trim(),
    password : z.string().min(4),
    name : z.string(),
}).strict()

export type signupSchemaType = z.infer<typeof signupSchema>

export const SigninSchema = z.object({
 userName : z.string().min(3).max(20),
 password : z.string().min(4)
}).strict()

export type SigninSchemaType = z.infer<typeof SigninSchema>

export const createRoomSchema = z.object({
name: z.string().min(3).max(20)
}).strict()

export type createRoomSchemaType = z.infer<typeof createRoomSchema>