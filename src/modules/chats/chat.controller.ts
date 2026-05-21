import { BadRequestError } from "@errors/app.errors";
import { ChatService } from "./chat.service";
import type { ChatControllerContract } from "./types/chat.contracts";

function parsePositiveInteger(value: string | undefined, fieldName: string) {
	if (value === undefined || value.trim() === "") {
		throw new BadRequestError(`${fieldName} is required`);
	}

	const parsedValue = Number(value);

	if (!Number.isInteger(parsedValue) || parsedValue <= 0) {
		throw new BadRequestError(`${fieldName} must be positive integer`);
	}

	return parsedValue;
}

export const ChatController: ChatControllerContract = {
	async createChat(req, res, next) {
		try {
			const chat = await ChatService.createChat(
				req.body,
				res.locals.userId,
			);

			res.status(201).json(chat);
		} catch (error) {
			next(error);
		}
	},
	async getUserGroupChats(req, res, next) {
		try {
			const chats = await ChatService.getUserGroupChats(
				res.locals.userId,
				{ skip: res.locals.skip, take: res.locals.take },
			);
			res.status(200).json(chats);
		} catch (error) {
			next(error);
		}
	},
	async getUserDirectChats(req, res, next) {
		try {
			const chats = await ChatService.getUserDirectChats(
				res.locals.userId,
				{ skip: res.locals.skip, take: res.locals.take },
			);
			res.status(200).json(chats);
		} catch (error) {
			next(error);
		}
	},
	async getChatById(req, res, next) {
		try {
			const chatId = parsePositiveInteger(req.params.chatId, "chatId");
			const chat = await ChatService.getChatById(
				chatId,
				res.locals.userId,
			);

			res.status(200).json(chat);
		} catch (error) {
			next(error);
		}
	},
	async getChatMessages(req, res, next) {
		try {
			const chatId = parsePositiveInteger(req.params.chatId, "chatId");
			const messages = await ChatService.getChatMessages(
				chatId,
				res.locals.userId,
				res.locals.skip,
				res.locals.take,
			);

			res.status(200).json(messages);
		} catch (error) {
			next(error);
		}
	},
	async getChatMedia(req, res, next) {
		try {
			const chatId = parsePositiveInteger(req.params.chatId, "chatId");
			const media = await ChatService.getChatMedia(
				chatId,
				res.locals.userId,
			);

			res.status(200).json(media);
		} catch (error) {
			next(error);
		}
	},
	async searchUsers(req, res, next) {
		try {
			const query = req.query.query?.trim();

			if (!query) {
				throw new BadRequestError("query is required");
			}

			const users = await ChatService.searchUsers(
				query,
				res.locals.userId,
			);

			res.status(200).json(users);
		} catch (error) {
			next(error);
		}
	},
};
