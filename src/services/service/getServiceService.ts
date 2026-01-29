import { prisma } from "../../lib/prisma";
import { getServiceDto } from "../../schemas/getServiceSchema";

export async function getServiceService(userId: string, data: getServiceDto) {
	const where: any = { userId };
	if (data.status !== undefined && data.status !== null) {
		where.status = data.status === "true" ? true : false;
	}
	const services = await prisma.service.findMany({
		where,
	});

	return services;
}
