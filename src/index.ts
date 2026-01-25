import express from "express";
import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use("/user", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof Error) {
		return res.status(400).json({
			error: err.message,
		});
	}

	return res.status(500).json({
		error: "Internal server error.",
	});
});

app.listen(PORT, () => {
	console.log(`Servidor rodando em http://localhost:${PORT}`);
});
