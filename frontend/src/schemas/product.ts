import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string(),
    price: z.number().positive("Total price must be greater than 0"),
});

export type CreateProductSchemaType = z.infer<typeof createProductSchema>;
