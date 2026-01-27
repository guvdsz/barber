import { Request, Response, NextFunction } from "express";
import { createServiceService } from "../../services/service/createServiceService";

export async function createServiceController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const response = await createServiceService(req.body, req.userId);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
}
