import { z } from "zod";

export const getServiceSchema = z.object({
	status: z.string().optional(),
});

export type getServiceDto = z.infer<typeof getServiceSchema>;
