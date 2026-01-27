import { z } from "zod";

export const createAppointmentSchema = z.object({
	customerName: z.string().min(1, "Name is required"),
	serviceId: z.string().min(1, "Service ID is required"),
});

export type createAppointmentDto = z.infer<typeof createAppointmentSchema>;
