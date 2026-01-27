import { z } from "zod";

export const concludeAppointmentSchema = z.object({
	appointmentId: z.string().min(1, "Appointment ID is required"),
});

export type concludeAppointmentDto = z.infer<typeof concludeAppointmentSchema>;
