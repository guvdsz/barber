import { Router } from "express";
import { validateResource } from "../middlewares/validateResource";
import { authSchema } from "../schemas/authSchema";
import { authController } from "../controllers/auth/authController";

export const authRouter = Router();

authRouter.post("/", validateResource(authSchema), authController);
