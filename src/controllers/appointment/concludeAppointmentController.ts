import { Request, Response, NextFunction } from "express";
import { concludeAppointmentService } from "../../services/appointment/concludeAppointmentService";

export async function concludeAppointmentController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const response = await concludeAppointmentService(
			req.body,
			req.userId,
		);
		return res.status(200).json(response);
	} catch (error) {
		next(error);
	}
}
