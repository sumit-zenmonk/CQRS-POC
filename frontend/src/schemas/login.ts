import { z } from "zod"

export const loginSchema = z.object({
    text: z.string().email("Invalid email format").or(
        z.string().min(1, "Username or email is required")
    ),
    password: z.string().min(3, "Password must be at least 3 characters")
})

export type LoginSchemaType = z.infer<typeof loginSchema>