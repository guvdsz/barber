import { Router } from "express";
import { validateResource } from "../middlewares/validateResource";
import { createServiceController } from "../controllers/service/createServiceController";
import { createServiceSchema } from "../schemas/createServiceSchema";
import { validateAuth } from "../middlewares/validateAuth";
import { getServiceController } from "../controllers/service/getServiceController";
import { getServiceSchema } from "../schemas/getServiceSchema";
import { updateServiceSchema } from "../schemas/updateServiceSchema";
import { updateServiceController } from "../controllers/service/updateServiceController";

export const servicesRouter = Router();

servicesRouter.get(
	"/",
	validateResource(getServiceSchema),
	getServiceController,
);
servicesRouter.post(
	"/",
	validateResource(createServiceSchema),
	createServiceController,
);
servicesRouter.put(
	"/",
	validateResource(updateServiceSchema),
	updateServiceController,
);
