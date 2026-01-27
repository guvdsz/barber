import { Request, Response, NextFunction } from "express";
import { getUserDetailsService } from "../../services/user/getUserDetailsService";

export async function getUserDetailsController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const response = await getUserDetailsService(req.userId);
		return res.json(response);
	} catch (error) {
		next(error);
	}
}
