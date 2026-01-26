import { Request, Response, NextFunction } from "express";
import { authService } from "../../services/auth/authUserService";

export async function authController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const response = await authService(req.body);
		console.log(req.body)
		return res.json(response);
	} catch (error) {
		next(error);
	}
}
