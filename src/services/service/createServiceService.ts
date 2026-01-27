import { prisma } from "../../lib/prisma";
import { createServiceDto } from "../../schemas/createServiceSchema";
import { AppError } from "../../utils/AppError";

export async function createServiceService(
	data: createServiceDto,
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

	const servicesCount = await prisma.service.count({
		where: {
			userId,
		},
	});

	const userSubscription = user.subscription?.name || null;
	const subscriptionStatus = user.subscription?.status || null;

	// Se o usuário tem assinatura, só permite se status for ACTIVE
	if (userSubscription && subscriptionStatus !== "ACTIVE") {
		throw new AppError("Subscription is not active", 403);
	}

	// Limites: grátis = 1, BASIC = 5, PRO = 20
	if (!userSubscription && servicesCount >= 1) {
		throw new AppError("Services limit reached", 401);
	}

	if (userSubscription === "BASIC" && servicesCount >= 5) {
		throw new AppError("Services limit reached", 401);
	}

	if (userSubscription === "PRO" && servicesCount >= 20) {
		throw new AppError("Services limit reached", 401);
	}

	const service = await prisma.service.create({
		data: {
			...data,
			userId,
		},
	});

	return service;
}
