import {z} from "zod"

export const createUserSchema = z.object({
    username : z.string().min(3).max(20),
    email :    z.string().email().toLowerCase().trim(),
    password : z.string().min(4),
})

export const SigninSchema = z.object({
 username : z.string().min(3).max(20),
 password : z.string().min(4)
})



export const CreateRoomSchema = z.object({
name: z.string().min(3).max(20)
}) 