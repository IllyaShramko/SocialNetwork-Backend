import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { MulterError } from "multer";

export function errorMiddleware(
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (error instanceof AppError) {
		res.status(error.statusCode).json({
			status: "error",
			message: error.message,
		});
		return;
	} else if (error instanceof MulterError) {
		res.status(400).json({
			status: "error",
			message: `${error.message} (${error.field})`,
		});
		return;
	}
	res.status(500).json({
		status: "error",
		message: "Internal Server Error",
	});
}
