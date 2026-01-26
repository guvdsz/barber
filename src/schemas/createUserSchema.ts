import { z } from "zod";

export const createUserSchema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email"),
	password: z.string().min(6, "Password must be at least 6 characters"),
	phone: z
		.string()
		.min(10, "Phone number must be at least 10 digits")
		.max(11, "Phone number must be at most 11 digits")
		.optional(),
});

export type createUserDto = z.infer<typeof createUserSchema>;
