
import {z} from "zod"

// updateDetailsInput 
// updateDetailsType 



export const updateDetailsInput = z.object({

    profileId:z.string(),
    
    firstName: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(30, { message: "Name must be at most 30 characters long" }),


    lastName: z
        .string()
        .min(3, { message: "lastname must be at least 3 characters long" })
        .max(30, { message: "lastname must be at most 30 characters long" }),

    gender: z.enum(["male", "female"]),
    dateOfBirth: z.string(),
    contactNumber: z.number(),
    about: z.string(),
    image: z.string(),
})



export type updateDetailsType = z.infer<typeof updateDetailsInput>

//  strict -- no thing extra allowed.
//  passthorugh  -- extra fields allowed.
//optional makes fields optional
