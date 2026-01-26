import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

export function validateResource(schema: ZodType) {
	return async function (req: Request, res: Response, next: NextFunction) {
		try {
			schema.parse(req.body || req.query || req.params);
			next();
		} catch (e) {
			if (e instanceof ZodError) {
				return res.status(400).json({
					error: JSON.parse(e.message).map(
						(e: any) => `${e.path[0]}: ${e.message}`,
					)[0],
				});
			}
			return res.status(400).send(e);
		}
	};
}
