import { Router } from "express";
import { validateResource } from "../middlewares/validateResource";
import { authSchema } from "../schemas/authSchema";
import { authController } from "../controllers/auth/authController";
import { validateAuth } from "../middlewares/validateAuth";
import { getSubscriptionController } from "../controllers/subscription/getSubscriptionController";

export const subscriptionRouter = Router();

subscriptionRouter.get("/", validateAuth, getSubscriptionController);
