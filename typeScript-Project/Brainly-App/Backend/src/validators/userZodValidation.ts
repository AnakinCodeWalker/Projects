// here you write the zod Validations

import {z} from 'zod'


export  const signupValidation = z.object({
    name:z.string().min(3).max(25),
    password: z.string(),  
    email: z.string().toLowerCase()
    .trim()
    .min(1, { message: "Email is required" })
    .max(35,{message:"Email length is big"})
    .email({message: "Invlalid email"})
})

export  const siginValidation =z.object({
    email: z.string().toLowerCase()
    .trim()
    .min(1, { message: "Email is required" })
    .max(35,{message:"Email length is big"})
    .email({message: "Invlalid email"}),
    
    password: z.string()
})

// export  const resetPasswordValidation = z.


