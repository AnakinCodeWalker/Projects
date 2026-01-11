import { z } from "zod"

const zodRegisterSchema = z.object({
  name: z.string()
    .min(3, { message: "User name must be at least 3 characters" })
    .max(30, { message: "User name must be less than 30 characters" }),

  email: z.string()
    .trim()
    .toLowerCase()
    .min(1, { message: "Email is required" })
    .email("Invalid email structure"),

  password: z.string()
    .min(7, { message: "Password min length should be 7" })
    .max(30, { message: "Password length must be less than 30 characters" }),
});

const zodLoginSchema = z.object({
  email: z.string()
    .trim()
    .toLowerCase()
    .min(1, { message: "Email is required" })
    .email("Invalid structure of email"),

  password: z.string()
    .min(7, { message: "Password min length should be 7" })
    .max(30, { message: "Password length must be less than 30 characters" }),
});

export {
    zodRegisterSchema,
    zodLoginSchema
}