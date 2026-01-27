import { z } from "zod";

export const createServiceSchema = z.object({
	name: z.string().min(1, "Name is required"),
	description: z.string().optional(),
	price: z.number().min(0, "Price must be a positive number"),
});

export type createServiceDto = z.infer<typeof createServiceSchema>;
