import type { UserController as UserControllerContract } from "./types/user.contracts";
import { UserService } from "./user.service";
import { AppError } from "@errors/app.errors";

export const UserController: UserControllerContract = {
	login(req, res, next) {
		res.status(200).json({ token: "123123123" });
		console.log("hello world");
	},
	register(req, res, next) {
		res.status(200).json({ token: "123123123" });
		console.log("hello world");
	},
	generateCode(req, res, next) {
		res.status(200).json({ message: "SUCCESS" });
		console.log("hello world");
	},
	validateCode(req, res, next) {
		res.status(200).json({ message: "SUCCESS" });
		console.log("hello world");
	},
	me(req, res, next) {
		res.status(200).json({ id: 1, email: "user@example.com" });
		console.log("hello world");
	},
};
