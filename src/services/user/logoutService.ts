import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/AppError";

export async function logoutService(userId: string) {
	if (!userId) {
		throw new AppError("Usuário não autenticado", 401);
	}
	await prisma.user.update({
		where: { id: userId },
		data: { tokenVersion: { increment: 1 } },
	});
	return { message: "Logout realizado com sucesso" };
}
