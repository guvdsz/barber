import { Request, Response, NextFunction } from "express";
import { getAppointmentService } from "../../services/appointment/getAppointmentService";

export async function getAppointmentController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const response = await getAppointmentService(req.userId);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
}
