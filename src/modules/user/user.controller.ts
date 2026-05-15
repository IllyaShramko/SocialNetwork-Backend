import type { UserController as UserControllerContract } from "./types/user.contracts";
import { UserService } from "./user.service";
import { BadRequestError } from "@errors/app.errors";

export const UserController: UserControllerContract = {
	async login(req, res, next) {
		try {
			const tokenDTO = await UserService.login(req.body);
			res.status(200).json({ token: tokenDTO.token });
		} catch (error) {
			next(error);
		}
	},
	async register(req, res, next) {
		try {
			const tokenDTO = await UserService.register(req.body);
			res.status(200).json({ token: tokenDTO.token });
		} catch (error) {
			next(error);
		}
	},
	async generateCode(req, res, next) {
		try {
			if (!req.body) throw new BadRequestError("Body is required");
			if (!req.body.email) throw new BadRequestError("Email is required");
			const response = await UserService.generateCode(
				req.body.email,
				"EMAIL_VERIFICATION",
			);

			res.status(200).json({ message: response.message });
		} catch (error) {
			next(error);
		}
	},
	async validateCode(req, res, next) {
		try {
			if (!req.body) throw new BadRequestError("Body is required");
			if (!req.body.email) throw new BadRequestError("Email is required");
			if (!req.body.code) throw new BadRequestError("Code is required");

			const response = await UserService.validateCode(
				req.body.code,
				req.body.email,
			);
			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	},
	async me(req, res, next) {
		try {
			const user = await UserService.me({ userId: res.locals.userId });
			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	},
	async updateAvatar(req, res, next) {
		try {
			const updatedUser = await UserService.updateProfile(
				res.locals.userId,
				{
					avatar: req.file!.filename,
				},
			);
			res.set("Connection", "close").status(200).json(updatedUser);
		} catch (error) {
			next(error);
		}
	},
	async updateProfile(req, res, next) {
		try {
			const updatedUser = await UserService.updateProfile(
				res.locals.userId,
				req.body,
			);
			res.set("Connection", "close").status(200).json(updatedUser);
		} catch (error) {
			next(error);
		}
	},
	async updatePassword(req, res, next) {
		try {
			if (!req.body) throw new BadRequestError("Body is required");
			if (!req.body.newPassword)
				throw new BadRequestError("New password is required");
			const updatedUser = await UserService.updatePassword(
				res.locals.userId,
				req.body.newPassword,
			);
			res.status(200).json(updatedUser);
		} catch (error) {
			next(error);
		}
	},
	async sendVerificationPasswordResetCode(req, res, next) {
		try {
			if (!req.body) throw new BadRequestError("Body is required");
			if (!req.body.email) throw new BadRequestError("Email is required");
			const response = await UserService.generateCode(
				req.body.email,
				"PASSWORD_RESET",
			);
			res.status(200).json({ message: response.message });
		} catch (error) {
			next(error);
		}
	},
	async updateSignature(req, res, next) {
		try {
			if (!req.file) {
				throw new BadRequestError("File is required");
			}
			const updatedUser = await UserService.updateSignature(
				res.locals.userId,
				req.file.filename,
			);
			res.status(200).json(updatedUser);
		} catch (error) {
			next(error);
		}
	},
	async getFullProfileById(req, res, next) {
		try {
			if (req.params.profileId) {
				if (isNaN(+req.params.profileId)) {
					throw new BadRequestError("profileId must be integer");
				}
			} else {
				throw new BadRequestError("profileId is required");
			}
			const profile = await UserService.getFullProfileById(
				+req.params.profileId,
			);
			res.status(200).json(profile);
		} catch (error) {
			next(error);
		}
	},
};
