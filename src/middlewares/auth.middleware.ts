import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { TokenExpiredError, verify } from "jsonwebtoken";
import { AuthenticationError } from "../errors/app.errors";

export function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	const auth = req.headers.authorization;
	if (!auth) {
		next(new AuthenticationError("Authorization is required"));
		return;
	}
	const [type, token] = auth.split(" ");
	if (type != "Bearer" || !token) {
		next(new AuthenticationError("Authorization is failed"));
		return;
	}
	try {
		const payload = verify(token, env.SECRET_KEY);
		if (typeof payload == "string") {
			next(new AuthenticationError("Incorrect token"));
			return;
		}

		res.locals.userId = payload.id;
	} catch (error) {
		if (error instanceof TokenExpiredError) {
			next(new AuthenticationError("Token is expired"));
		}
		next(error);
	}
	next();
}
