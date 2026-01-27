import { prisma } from "../../lib/prisma";
import { updateServiceDto } from "../../schemas/updateServiceSchema";

import { AppError } from "../../utils/AppError";

export async function updateServiceService(
	data: updateServiceDto,
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
			userId,
		},
	});

	if (!service) {
		throw new AppError("Service not found", 404);
	}

	const updatedService = await prisma.service.update({
		where: {
			id: data.serviceId,
			userId,
		},
		data: {
			name: data.name || service.name,
			description: data.description || service.description,
			price: data.price || service.price,
		},
	});

	return updatedService;
}
