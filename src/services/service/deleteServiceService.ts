import { prisma } from "../../lib/prisma";
import { updateServiceDto } from "../../schemas/updateServiceSchema";

import { AppError } from "../../utils/AppError";

export async function deleteServiceService(
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
		throw new AppError("Usuário não encontrado", 404);
	}

	const service = await prisma.service.findFirst({
		where: {
			id: data.serviceId,
			userId,
		},
	});

	if (!service) {
		throw new AppError("Serviço não encontrado", 404);
	}

	await prisma.service.delete({
		where: {
			id: data.serviceId,
			userId,
		},
	});
}
