import { Request, Response } from "express";
import { createUserService } from "../../services/users/CreateUserService";

export async function createUserController(req: Request, res: Response) {
	const response = await createUserService();

	return res.json(response);
}
