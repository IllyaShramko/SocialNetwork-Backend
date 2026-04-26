export class AppError extends Error {
	public statusCode: number;
	/**
	 * @param code - HTTP-Status code for response (e.g. 400, 404, 500, 401...)
	 */
	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class BadRequestError extends AppError {
	constructor(message: string = "Bad request") {
		super(message, 400);
	}
}

export class NotFoundError extends AppError {
	constructor(resourceName: string) {
		super(`${resourceName} not found`, 404);
	}
}

export class ConflictError extends AppError {
	constructor(resourceName: string) {
		super(`${resourceName} already exists`, 409);
	}
}

export class InternalServerError extends AppError {
	constructor(message: string = "Server Internal Error") {
		super(message, 500);
	}
}

export class AuthenticationError extends AppError {
	constructor(message: string = "Unauthenticated Error") {
		super(message, 401);
	}
}

export class ForbiddenError extends AppError {
	constructor(resourceName: string = "Forbidden Error") {
		super(`Unable to get access to ${resourceName}`, 403);
	}
}

export class ValidationError extends AppError {
	constructor(message: string = "Validation Error") {
		super(message, 422);
	}
}
