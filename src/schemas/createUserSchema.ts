import { z } from "zod";

export const createUserSchema = z.object({
	name: z.string().min(1, "Nome é obrigatório"),
	email: z.string().email("E-mail inválido"),
	password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
	phone: z
		.string()
		.min(10, "O telefone deve ter pelo menos 10 dígitos")
		.max(11, "O telefone deve ter no máximo 11 dígitos")
		.optional(),
});

export type createUserDto = z.infer<typeof createUserSchema>;
