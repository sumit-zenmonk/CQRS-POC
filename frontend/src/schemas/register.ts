import { z } from "zod"

export const registerSchema = z
    .object({
        username: z.string().min(1, "User name is required"),
        email: z.string().min(1, "Email is required").email("Invalid email"),
        password: z.string().min(3, "Password must be at least 3 characters"),
    })

export type RegisterSchemaType = z.infer<typeof registerSchema>