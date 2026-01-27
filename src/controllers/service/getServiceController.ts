import { Request, Response, NextFunction } from "express";
import { getServiceService } from "../../services/service/getServiceService";

export async function getServiceController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const response = await getServiceService(req.userId, req.query);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
}
