import { authMiddleware } from "@middlewares/auth.middleware";
import { Router } from "express";
import { ChatController } from "./chats.controller";
import {
	uploadMiddleware,
	processImageMiddleware,
} from "@middlewares/upload.middleware";
import { validateMiddleware } from "@middlewares/validate.middleware";
import { chatCreateSchema } from "./chats.schema";

export const ChatsRouter = Router();

ChatsRouter.get("/direct", authMiddleware, ChatController.getUserDirectChats);

ChatsRouter.get("/groups", authMiddleware, ChatController.getUserGroupChats);

ChatsRouter.post(
	"/",
	authMiddleware,
	uploadMiddleware.single("avatar"),
	validateMiddleware(chatCreateSchema),
	processImageMiddleware(400, 80, true, false),
	ChatController.createChat,
);

ChatsRouter.get("/:chatId", authMiddleware, ChatController.getChatById);
