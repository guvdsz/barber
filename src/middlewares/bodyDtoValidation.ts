import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export function bodyDtoValidation(schema: ZodType) {
	return async function (req: Request, res: Response, next: NextFunction) {
		const parseResult = schema.safeParse(req.body);
		if (!parseResult.success) {
			return res.status(400).json({
				error: JSON.parse(parseResult.error.message).map(
					(err: any) => ({
						path: err.path.join("."),
						message: err.message,
					}),
				)[0],
			});
		}
		next();
	};
}
