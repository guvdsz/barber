import { prisma } from "../../lib/prisma";
import { updateUserDto } from "../../schemas/updateUserSchema";

import { AppError } from "../../utils/AppError";

export async function updateUserService(data: updateUserDto, userId: string) {

	const user = await prisma.user.findFirst({
		where: {
			id: userId,
		},
	});

	if (!user) {
		throw new AppError("User not found", 404);
	}

	await prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			name: data.name || user.name,
			phone: data.phone || user.phone,
		},
	});
}
