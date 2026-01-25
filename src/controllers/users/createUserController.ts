import { Request, Response, NextFunction } from "express";
import { createUserService } from "../../services/users/createUserService";

export async function createUserController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const response = await createUserService(req.body);
		return res.json(response);
	} catch (error) {
		next(error);
	}
}
