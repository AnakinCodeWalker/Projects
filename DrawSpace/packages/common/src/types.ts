import z from "zod"

export const signupInput = z.object({

    username: z
        .string()
        .min(3, { message: "userName is too short" })
        .max(20, { message: "userName is too big" }),

    name: z
        .string()
        .min(3, { message: "name  is too short" })
        .max(20, { message: "name is too big" }),

    password: z
        .string()
        .min(4, { "message": "password is too weak" })

})

export type signupInputType = z.infer<typeof signupInput>


export const signinInput = z.object({

    username: z
        .string()
        .min(3, { message: "userName is too short" })
        .max(20, { message: "userName is too big" }),


    password: z
        .string()
        .min(4, { "message": "password is too weak" })

})

export type signinInputType = z.infer<typeof signinInput>

export const createRoomInput = z.object({

    name: z
        .string()
        .min(3, { message: "name  is too short" })
        .max(20, { message: "name is too big" }),
})

export type createRoomInputType = z.infer<typeof createRoomInput> 