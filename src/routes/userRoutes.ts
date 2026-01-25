import { Router } from "express";
import { createUserController } from "../controllers/users/createUserController";
import { bodyDtoValidation } from "../middlewares/bodyDtoValidation";
import { createUserSchema } from "../schemas/createUserSchema";

export const userRouter = Router();

userRouter.post("/", bodyDtoValidation(createUserSchema), createUserController);
