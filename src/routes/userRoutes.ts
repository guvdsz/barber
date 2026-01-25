import { Router } from "express";
import { prisma } from "../lib/prisma";
import { Request, Response } from "express";
import { createUserController } from "../controllers/users/CreateUserController";

export const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
	const users = await prisma.user.findMany();

	res.status(201).json(users);
});

userRouter.post("/", createUserController);
