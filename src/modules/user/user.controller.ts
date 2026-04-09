import type { UserController as UserControllerContract } from "./types/user.contracts";
import { UserService } from "./user.service";
import { ValidationError } from "@errors/app.errors";

export const UserController: UserControllerContract = {
	async login(req, res, next) {
		const tokenDTO = await UserService.login(req.body);
		res.status(200).json({ token: tokenDTO.token });
	},
	async register(req, res, next) {
		const tokenDTO = await UserService.register(req.body);
		res.status(200).json({ token: tokenDTO.token });
	},
	async generateCode(req, res, next) {
		if (!req.body) throw new ValidationError("Body is required")
		if (!req.body.email) throw new ValidationError("Email is required")
		const response = await UserService.generateCode(req.body.email)
		
		res.status(200).json({ message: response.message });
	},
	async validateCode(req, res, next) {
		if (!req.body) throw new ValidationError("Body is required")
		if (!req.body.email) throw new ValidationError("Email is required")
		if (!req.body.code) throw new ValidationError("Code is required")
		
		const response = await UserService.validateCode(req.body.code, req.body.email)
		res.status(200).json({ message: response.message });
	},
	async me(req, res, next) {
		const user = await UserService.me({ userId: res.locals.userId });
		res.status(200).json(user);
	},
};
