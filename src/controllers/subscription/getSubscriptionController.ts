import { Request, Response, NextFunction } from "express";
import { getSubscriptionService } from "../../services/subscription/getSubscriptionService";

export async function getSubscriptionController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const response = await getSubscriptionService(req.userId);
		return res.json(response);
	} catch (error) {
		next(error);
	}
}
