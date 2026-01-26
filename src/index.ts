import express from "express";
import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { AppError } from "./utils/AppError";
import { authRouter } from "./routes/authRoutes";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			error: err.message,
		});
	}
	return res.status(500).json({
		error: "Internal server error.",
	});
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}...`);
});
