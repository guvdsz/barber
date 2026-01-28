import { Request, Response, NextFunction } from "express";

import { logoutService } from "../../services/user/logoutService";

export async function logoutController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const userId = req.userId;
		const result = await logoutService(userId);
		return res.status(200).json(result);
	} catch (error) {
		next(error);
	}
}
