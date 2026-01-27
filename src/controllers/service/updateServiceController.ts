import { Request, Response, NextFunction } from "express";
import { updateServiceService } from "../../services/service/updateServiceService";

export async function updateServiceController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const response = await updateServiceService(req.body, req.userId);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
}
