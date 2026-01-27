import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";

interface Payload {
	sub: string;
}

export function validateAuth(req: Request, res: Response, next: NextFunction) {
	const requestToken = req.headers.authorization;

	if (!requestToken) {
		return res.status(401).json({ error: "Invalid token" });
	}

	const [, token] = requestToken.split(" ");

	try {
		const { sub } = jsonwebtoken.verify(
			token,
			process.env.JWT_SECRET as string,
		) as Payload;

		if (!sub) {
			return res.status(401).json({ error: "Invalid token" });
		}

		req.userId = sub;

		next();
	} catch (error) {
		return res.status(401).json({ error: "Invalid token" });
	}
}
