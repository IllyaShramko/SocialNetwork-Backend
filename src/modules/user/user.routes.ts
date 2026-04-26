import { Router } from "express";
import { UserController } from "./user.controller";
import { validateMiddleware, authMiddleware } from "../../middlewares";
import { loginSchema, regSchema, updateUserSchema } from "./user.schema";
import {
	processImageMiddleware,
	uploadMiddleware,
} from "@middlewares/upload.middleware";

export const UserRouter = Router();

UserRouter.post(
	"/login",
	validateMiddleware(loginSchema),
	UserController.login,
);
UserRouter.post(
	"/register",
	validateMiddleware(regSchema),
	UserController.register,
);
UserRouter.post("/generate-code", UserController.generateCode);
UserRouter.post("/validate-code", UserController.validateCode);
UserRouter.get("/me", authMiddleware, UserController.me);

UserRouter.patch(
	"/me/avatar",
	authMiddleware,
	uploadMiddleware.single("avatar"),
	processImageMiddleware(400, 65),
	UserController.updateAvatar,
);

UserRouter.patch(
	"/me/profile",
	authMiddleware,
	validateMiddleware(updateUserSchema),
	UserController.updateProfile,
);
UserRouter.patch("/me/password", authMiddleware, UserController.updatePassword);
UserRouter.patch(
	"/me/signature",
	authMiddleware,
	uploadMiddleware.single("signature"),
	processImageMiddleware(200),
	UserController.updateSignature,
);
UserRouter.post(
	"/me/password-reset-code",
	authMiddleware,
	UserController.sendVerificationPasswordResetCode,
);
UserRouter.get("/me/avatars", authMiddleware, UserController.getAvatars);
UserRouter.delete("/me/avatars/:id", authMiddleware, UserController.deleteAvatar)
