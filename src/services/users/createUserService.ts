import { createUserDto } from "../../schemas/createUserSchema";
import { prisma } from "../../lib/prisma";

import { AppError } from "../../utils/AppError";
import bcrypt from "bcryptjs";

export async function createUserService({
	password,
	name,
	email,
	phone,
}: createUserDto) {
	const existingUser = await prisma.user.findFirst({
		where: {
			email: email,
		},
	});

	if (existingUser) {
		throw new AppError("User already registered", 409);
	}

	const passwordHash = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: { password: passwordHash, name, email, phone },
		select: {
			id: true,
			name: true,
			email: true,
			phone: true,
		},
	});

	if (!user) {
		throw new AppError("Error creating user", 400);
	}

	return user;
}
