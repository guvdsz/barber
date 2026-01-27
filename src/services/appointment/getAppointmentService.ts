import { prisma } from "../../lib/prisma";

export async function getAppointmentService(userId: string) {
	const appointments = await prisma.appointment.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			customerName: true,
			service: true,
		},
	});

	return appointments;
}
