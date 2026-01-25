import { prisma } from "../../lib/prisma";

export async function createUserService() {
	const user = await prisma.user.create({
		data: {
			name: "Alice",
			email: "alice@prisma.io",
			password: "123",
			phone: "123",
		},
	});

	if (!user) return null;

	return user;
}
