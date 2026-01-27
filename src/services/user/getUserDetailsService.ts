import { prisma } from "../../lib/prisma";

import { AppError } from "../../utils/AppError";

export async function getUserDetailsService(userId: string) {

	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
		select: {
			id: true,
			name: true,
			email: true,
			phone: true,
			subscription: true,
		},
	});

	if (!user) {
		throw new AppError("User not found", 404);
	}

	return user;
}
