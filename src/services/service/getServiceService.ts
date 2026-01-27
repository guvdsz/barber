import { prisma } from "../../lib/prisma";
import { getServiceDto } from "../../schemas/getServiceSchema";

export async function getServiceService(userId: string, data: getServiceDto) {
	const services = await prisma.service.findMany({
		where: {
			userId: userId,
			status: data.status === "true" ? true : false,
		},
	});

	return services;
}
