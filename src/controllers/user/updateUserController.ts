import { Request, Response, NextFunction } from "express";
import { updateUserService } from "../../services/user/updateUserService";

export async function updateUserController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const response = await updateUserService(req.body, req.userId);
		return res.json(response);
	} catch (error) {
		next(error);
	}
}
