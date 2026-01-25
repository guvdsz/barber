import { Router } from "express";
import { prisma } from "./lib/prisma";
import { Request, Response } from "express";

export const router = Router();

router.get("/", async (req: Request, res: Response) => {
	const user = await prisma.user.create({
		data: {
			name: "Alice",
			email: "alice@prisma.io",
		},
	});

	res.status(201).json(user);
});
