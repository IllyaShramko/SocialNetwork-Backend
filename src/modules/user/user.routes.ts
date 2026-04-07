import { Router } from "express";
import { UserController } from "./user.controller";
import { validateMiddleware } from "../../middlewares";
import { loginSchema, regSchema } from "./user.schema";
import { authMiddleware } from "../../middlewares";

export const UserRouter = Router();

UserRouter.post("login", validateMiddleware(loginSchema), UserController.login);
UserRouter.post(
	"register",
	validateMiddleware(regSchema),
	UserController.register,
);
UserRouter.post("generate-code", UserController.generateCode);
UserRouter.post("validate-code", UserController.validateCode);
UserRouter.get("me", authMiddleware, UserController.me);
