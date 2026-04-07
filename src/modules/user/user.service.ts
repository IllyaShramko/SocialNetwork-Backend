import { UserService as ServiceContract } from "./types/user.contracts";
import { UserRepository } from "./user.repository";
import { AppError } from "@errors/app.errors";

export const UserService: ServiceContract = {
	login(credentials) {
		throw new AppError("Function not implemented.", 500);
	},
	register(credentials) {
		throw new AppError("Function not implemented.", 500);
	},
	generateCode(email) {
		throw new AppError("Function not implemented.", 500);
	},
	validateCode(code) {
		throw new AppError("Function not implemented.", 500);
	},
	me(DTO) {
		throw new AppError("Function not implemented.", 500);
	},
};
