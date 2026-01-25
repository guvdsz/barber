import { createUserDto } from "../../schemas/createUserSchema";
import { prisma } from "../../lib/prisma";

import { AppError } from "../../utils/AppError";

export async function createUserService(data: createUserDto) {
	const existingUser = await prisma.user.findFirst({
		where: {
			email: data.email,
		},
	});

	if (existingUser) {
		throw new AppError("Usuário já cadastrado", 409);
	}

	const user = await prisma.user.create({ data });

	if (!user) {
		throw new AppError("Erro ao criar usuário", 400);
	}

	return user;
}
