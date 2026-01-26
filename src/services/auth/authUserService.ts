import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";
import { authDto } from "../../schemas/authSchema";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

export async function authService(data: authDto) {
	const existingUser = await prisma.user.findFirst({
		where: {
			email: data.email,
		},
		include: {
			subscription: true,
		},
	});

	if (!existingUser) {
		throw new AppError("Invalid credentials", 401);
	}

	const isPasswordCorrect = await bcrypt.compare(
		data.password,
		existingUser.password,
	);

	if (!isPasswordCorrect) {
		throw new AppError("Invalid credentials", 401);
	}

	const token = jsonwebtoken.sign(
		{
			name: existingUser.name,
			email: existingUser.email,
		},
		process.env.JWT_SECRET as string,
		{ subject: existingUser.id, expiresIn: "1d" },
	);

	return {
		id: existingUser.id,
		name: existingUser.email,
		email: existingUser.email,
		phone: existingUser.phone,
		token: token,
		subscription: existingUser?.subscription
			? {
					id: existingUser.subscription.id,
					status: existingUser.subscription.status,
				}
			: null,
	};
}
