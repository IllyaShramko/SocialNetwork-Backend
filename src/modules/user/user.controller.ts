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
		if (!req.body) throw new ValidationError("Body is required");
		if (!req.body.email) throw new ValidationError("Email is required");
		const response = await UserService.generateCode(
			req.body.email,
			"EMAIL_VERIFICATION",
		);

		res.status(200).json({ message: response.message });
	},
	async validateCode(req, res, next) {
		if (!req.body) throw new ValidationError("Body is required");
		if (!req.body.email) throw new ValidationError("Email is required");
		if (!req.body.code) throw new ValidationError("Code is required");

		const response = await UserService.validateCode(
			req.body.code,
			req.body.email,
		);
		res.status(200).json({ message: response.message });
	},
	async me(req, res, next) {
		const user = await UserService.me({ userId: res.locals.userId });
		res.status(200).json(user);
	},
	async updateAvatar(req, res, next) {
		if (!req.file) {
			throw new ValidationError("File is required");
		}
		const updatedUser = await UserService.updateAvatar(
			res.locals.userId,
			req.file.filename,
		);
		res.status(200).json(updatedUser);
	},
	async updateProfile(req, res, next) {
		const updatedUser = await UserService.updateProfile(
			res.locals.userId,
			req.body,
		);
		res.status(200).json(updatedUser);
	},
	async updatePassword(req, res, next) {
		if (!req.body) throw new ValidationError("Body is required");
		if (!req.body.newPassword)
			throw new ValidationError("New password is required");
		const updatedUser = await UserService.updatePassword(
			res.locals.userId,
			req.body.newPassword,
		);
		res.status(200).json(updatedUser);
	},
	async sendVerificationPasswordResetCode(req, res, next) {
		if (!req.body) throw new ValidationError("Body is required");
		if (!req.body.email) throw new ValidationError("Email is required");
		const response = await UserService.generateCode(
			req.body.email,
			"PASSWORD_RESET",
		);
		res.status(200).json({ message: response.message });
	},
	async updateSignature(req, res, next) {
		if (!req.file) {
			throw new ValidationError("File is required");
		}
		const updatedUser = await UserService.updateSignature(
			res.locals.userId,
			req.file.filename,
		);
		res.status(200).json(updatedUser);
	},
};
