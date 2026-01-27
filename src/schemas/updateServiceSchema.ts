import { z } from "zod";

export const updateServiceSchema = z.object({
	name: z.string().min(1, "Name is required").optional(),
	description: z.string().optional(),
	serviceId: z.string().min(1, "Service ID is required"),
	price: z.number().min(0, "Price must be a positive number").optional(),
});

export type updateServiceDto = z.infer<typeof updateServiceSchema>;
