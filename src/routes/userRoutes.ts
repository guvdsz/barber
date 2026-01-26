import { Router } from "express";
import { createUserController } from "../controllers/users/createUserController";
import { validateResource } from "../middlewares/validateResource";
import { createUserSchema } from "../schemas/createUserSchema";

export const userRouter = Router();

userRouter.post("/", validateResource(createUserSchema), createUserController);
