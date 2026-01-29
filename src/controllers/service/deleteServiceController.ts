import { Request, Response, NextFunction } from "express";
import { updateServiceService } from "../../services/service/updateServiceService";
import { deleteServiceService } from "../../services/service/deleteServiceService";

export async function deleteServiceController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const response = await deleteServiceService(req.body, req.userId);
		return res.status(204).send();
	} catch (error) {
		next(error);
	}
}
