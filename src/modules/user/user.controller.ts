import type { UserController as UserControllerContract } from "./types/user.contracts";
import { UserService } from "./user.service";
import { AppError } from "@errors/app.errors";

export const UserController: UserControllerContract = {
	login(req, res, next) {
		throw new AppError("Function not implemented.", 500);
	},
	register(req, res, next) {
		throw new AppError("Function not implemented.", 500);
	},
	generateCode(req, res, next) {
		throw new AppError("Function not implemented.", 500);
	},
	validateCode(req, res, next) {
		throw new AppError("Function not implemented.", 500);
	},
	me(req, res, next) {
		throw new AppError("Function not implemented.", 500);
	},
};
