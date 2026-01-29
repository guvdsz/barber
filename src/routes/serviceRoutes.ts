import { Router } from "express";
import { validateResource } from "../middlewares/validateResource";
import { createServiceController } from "../controllers/service/createServiceController";
import { createServiceSchema } from "../schemas/createServiceSchema";
import { validateAuth } from "../middlewares/validateAuth";
import { getServiceController } from "../controllers/service/getServiceController";
import { getServiceSchema } from "../schemas/getServiceSchema";
import { updateServiceSchema } from "../schemas/updateServiceSchema";
import { updateServiceController } from "../controllers/service/updateServiceController";
import { deleteServiceSchema } from "../schemas/deleteServiceSchema";
import { deleteServiceController } from "../controllers/service/deleteServiceController";

export const servicesRouter = Router();

servicesRouter.get(
	"/",
	validateResource(getServiceSchema),
	getServiceController,
);
servicesRouter.delete(
	"/",
	validateResource(deleteServiceSchema),
	deleteServiceController,
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
