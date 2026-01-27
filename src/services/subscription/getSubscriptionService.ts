import { prisma } from "../../lib/prisma";
import { getServiceDto } from "../../schemas/getServiceSchema";

export async function getSubscriptionService(userId: string) {
	const subscription = await prisma.subscription.findFirst({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			status: true,
		},
	});

	return { subscription: subscription || null };
}
