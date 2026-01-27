import { Request, Response, NextFunction } from "express";
import { createAppointmentService } from "../../services/appointment/createAppointmentService";

export async function createAppointmentController(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const response = await createAppointmentService(req.body, req.userId);
		return res.status(201).json(response);
	} catch (error) {
		next(error);
	}
}
