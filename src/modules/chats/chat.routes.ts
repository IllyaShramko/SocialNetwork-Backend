import { authMiddleware } from "@middlewares/auth.middleware";
import { paginationMiddleware } from "@middlewares/pagination.middleware";
import { validateMiddleware } from "@middlewares/validate.middleware";
import { Router } from "express";
import { ChatController } from "./chat.controller";
import { chatCreateSchema } from "./chat.schema";

export const ChatRouter = Router();

ChatRouter.post(
	"/",
	authMiddleware,
	validateMiddleware(chatCreateSchema),
	ChatController.createChat,
);
ChatRouter.get("/groups", authMiddleware, paginationMiddleware, ChatController.getUserGroupChats);
ChatRouter.get("/direct", authMiddleware, paginationMiddleware, ChatController.getUserDirectChats);
ChatRouter.get("/users/search", authMiddleware, ChatController.searchUsers);
ChatRouter.get("/:chatId", authMiddleware, ChatController.getChatById);
ChatRouter.get(
	"/:chatId/messages",
	authMiddleware,
	paginationMiddleware,
	ChatController.getChatMessages,
);
ChatRouter.get("/:chatId/media", authMiddleware, ChatController.getChatMedia);
