import z, { email } from "zod"

export const signupInput = z.object({

    email:z.string().email({message:"Invalid email"}),
    password:z.string().min(4,{"message":"password is too weak"})
})

export type signupInputType = z.infer<typeof signupInput> 


export const signinInput = z.object({


})

export type signinInputType = z.infer<typeof signinInput> 
