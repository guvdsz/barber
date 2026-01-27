import { prisma } from "../../lib/prisma";
import { concludeAppointmentDto } from "../../schemas/concludeAppointmentSchema";
import { AppError } from "../../utils/AppError";

export async function concludeAppointmentService(
	data: concludeAppointmentDto,
	userId: string,
) {
	const appointment = await prisma.appointment.findFirst({
		where: {
			userId,
			id: data.appointmentId,
		},
	});

	if (!appointment) {
		throw new AppError("Appointment not found", 404);
	}

	await prisma.appointment.delete({
		where: {
			userId,
			id: data.appointmentId,
		},
	});
}
