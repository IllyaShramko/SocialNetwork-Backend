import { BadRequestError } from "@errors/app.errors";
import type { NextFunction, Request, Response } from "express";

export type PaginationLocals = {
	skip: number;
	take: number;
};

function parsePositiveInteger(value: unknown, fieldName: string) {
	if (typeof value !== "string" || value.trim() === "") {
		throw new BadRequestError(`${fieldName} must be positive integer`);
	}

	const parsedValue = Number(value);

	if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
		throw new BadRequestError(`${fieldName} must be positive integer`);
	}

	return parsedValue;
}

export function paginationMiddleware(
	req: Request,
	res: Response<object, PaginationLocals>,
	next: NextFunction,
) {
	try {
		const pageNumber =
			req.query.pageNumber === undefined ? "1" : req.query.pageNumber;
		const limit = req.query.limit === undefined ? "20" : req.query.limit;
		const parsedPageNumber = parsePositiveInteger(pageNumber, "pageNumber");
		const parsedLimit = parsePositiveInteger(limit, "limit");

		res.locals.skip = (parsedPageNumber - 1) * parsedLimit;
		res.locals.take = parsedLimit;

		next();
	} catch (error) {
		next(error);
	}
}
