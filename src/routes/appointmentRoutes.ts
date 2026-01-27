import { Router } from "express";
import { validateResource } from "../middlewares/validateResource";
import { authSchema } from "../schemas/authSchema";
import { createAppointmentController } from "../controllers/appointment/createAppointmentController";
import { createAppointmentSchema } from "../schemas/createAppointmentSchema";
import { getAppointmentController } from "../controllers/appointment/getAppointmentController";
import { concludeAppointmentController } from "../controllers/appointment/concludeAppointmentController";
import { concludeAppointmentSchema } from "../schemas/concludeAppointmentSchema";

export const appointmentRouter = Router();

appointmentRouter.post(
	"/",
	validateResource(createAppointmentSchema),
	createAppointmentController,
);

appointmentRouter.get("/", getAppointmentController);

appointmentRouter.delete(
	"/",
	validateResource(concludeAppointmentSchema),
	concludeAppointmentController,
);
