import {z} from "zod"
//  more fields will be added later on 
export const createCourseInput = z.object({

    courseName: z
        .string()
        .min(1, { message: "course Name can not be empty" }),


    courseDescription: z
        .string()
        .min(1, { message: "course description can not be empty" }),

    whatYouWillLearn: z
        .string()
        .min(1, { message: "what you will learn can not be empty" })
        .max(500, { message: "what you will learn can not be more than that" }),

    price: z
        .number()
        .positive(),

    thumbnail: z.
        string(),

    tag: z
        .array(z.string())
        .min(1, { message: "course tag can not be empty" }),

    instructions: z
        .array(z.string()),

    status: z.enum(["Draft", "Published"])
        .optional(),
})