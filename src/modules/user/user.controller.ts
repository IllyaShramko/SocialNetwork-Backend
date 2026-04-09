import type { Request, Response } from "express";
import type { UserController as UserControllerContract } from "./types/user.contracts";
import type {TokenDTO,LoginCredentials,RegisterCredentials,} from "./types/user.types";
import { UserService } from "./user.service";

export const UserController: UserControllerContract = {
	login: async function (
		req: Request<object, TokenDTO, LoginCredentials>,
		res: Response<TokenDTO>,
		next,
	) {
		try {
			const token = await UserService.login(req.body);
			res.status(200).json(token);
		} catch (error) {
			next(error);
		}
	},
	register: async function (
		req: Request<object, TokenDTO, RegisterCredentials>,
		res: Response<TokenDTO>,
		next,
	) {
		try {
			const token = await UserService.register(req.body);
			res.status(200).json(token);
		} catch (error) {
			next(error);
		}
	},
	me: async function (_, res, next) {
		try {
			const token = await UserService.me({ userId: res.locals.userId });
			res.status(200).json(token);
		} catch (error) {
			next(error);
		}
	},
};