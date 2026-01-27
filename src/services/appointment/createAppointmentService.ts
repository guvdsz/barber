import { prisma } from "../../lib/prisma";
import { createAppointmentDto } from "../../schemas/createAppointmentSchema";
import { AppError } from "../../utils/AppError";

export async function createAppointmentService(
	data: createAppointmentDto,
	userId: string,
) {
	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
		include: {
			subscription: true,
		},
	});

	if (!user) {
		throw new AppError("User not found", 404);
	}

	if (!user.subscription || user.subscription.status !== "ACTIVE") {
		throw new AppError(
			"Only active subscribers can update a service",
			403,
		);
	}

	const service = await prisma.service.findFirst({
		where: {
			id: data.serviceId,
			userId: userId,
		},
	});

	if (!service) {
		throw new AppError("Service not found", 404);
	}

	const appointment = await prisma.appointment.create({
		data: {
			customerName: data.customerName,
			serviceId: data.serviceId,
			userId,
		},
	});

	return appointment;
}
