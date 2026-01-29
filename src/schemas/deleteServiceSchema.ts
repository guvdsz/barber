import { z } from "zod";

export const deleteServiceSchema = z.object({
    serviceId: z.string().min(1, "Service ID is required"),
});

export type deleteServiceDto = z.infer<typeof deleteServiceSchema>;
