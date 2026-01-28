import { Router } from "express";
import { createUserController } from "../controllers/user/createUserController";
import { validateResource } from "../middlewares/validateResource";
import { createUserSchema } from "../schemas/createUserSchema";
import { getUserDetailsController } from "../controllers/user/getUserDetailsController";
import { validateAuth } from "../middlewares/validateAuth";

import { updateUserController } from "../controllers/user/updateUserController";
import { updateUserSchema } from "../schemas/updateUserSchema";
import { logoutController } from "../controllers/user/logoutController";

export const userRouter = Router();

userRouter.post("/", validateResource(createUserSchema), createUserController);
userRouter.get("/profile", validateAuth, getUserDetailsController);
userRouter.put(
	"/",
	validateAuth,
	validateResource(updateUserSchema),
	updateUserController,
);

userRouter.post("/logout", validateAuth, logoutController);
