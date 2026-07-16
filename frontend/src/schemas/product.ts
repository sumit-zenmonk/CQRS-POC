import { z } from "zod";

export const createProductSchema = z.object({
    name: z.string().min(1, "Name is required"),
    description: z.string(),
    price: z.number().positive("Total price must be greater than 0"),
    image_url: z.string().url("Must be a valid URL").min(1, "Image URL is required"),
});

export type CreateProductSchemaType = z.infer<typeof createProductSchema>;
