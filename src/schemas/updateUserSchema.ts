import { z } from "zod";

export const updateUserSchema = z.object({
	name: z.string().min(1, "Name is required").optional(),
	phone: z
		.string()
		.min(10, "Phone number must be at least 10 digits")
		.max(11, "Phone number must be at most 11 digits")
		.optional(),
});

export type updateUserDto = z.infer<typeof updateUserSchema>;
