import { Request, Response, NextFunction } from "express";
import { createUserService } from "../../services/user/createUserService";

export async function createUserController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const response = await createUserService(req.body);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
}
