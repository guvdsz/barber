import express from "express";
import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { AppError } from "./utils/AppError";
import { authRouter } from "./routes/authRoutes";
import { servicesRouter } from "./routes/serviceRoutes";
import { subscriptionRouter } from "./routes/subscriptionRoutes";
import { appointmentRouter } from "./routes/appointmentRoutes";
import { validateAuth } from "./middlewares/validateAuth";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/service", validateAuth, servicesRouter);
app.use("/subscription", validateAuth, subscriptionRouter);
app.use("/appointment", validateAuth, appointmentRouter);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			error: err.message,
		});
	}
	return res.status(500).json({
		error: "Erro interno no servidor. Tente novamente mais tarde.",
	});
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}...`);
});
