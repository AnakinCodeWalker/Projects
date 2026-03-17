import {z} from "zod"

export const createPostInput = z.object({
    title: z
        .string()
        .trim()
        .min(1, { message: "Title cannot be empty" })
        .max(120, { message: "Title cannot exceed 120 characters" }),

    content: z
        .string(),

    coverImageUrl: z
        .string()
        .optional(),

    published: z
        .boolean()
        .optional(),

}).passthrough();

export type createPostType = z.infer<typeof createPostInput>



export const updatePostInput = z.object({
    title: z
        .string()
        .trim()
        .min(1, { message: "Title cannot be empty" })
        .max(120, { message: "Title cannot exceed 120 characters" })
        .optional(),

    content: z
        .string()
        .optional(),


    coverImageUrl: z
        .string()
        .url()
        .optional(),
});

export type updatePostType = z.infer<typeof updatePostInput>

