import { ChatService } from "./chats.service";
import { ChatControllerContract } from "./types/chats.contracts";

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
				{
					skip: 0,
					take: 20,
				},
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
				{
					skip: 0,
					take: 20,
				},
			);

			res.status(200).json(chats);
		} catch (error) {
			next(error);
		}
	},

	async getChatById(req, res, next) {
		try {
			const chat = await ChatService.getChatById(
				Number(req.params.chatId),
				res.locals.userId,
			);

			res.status(200).json(chat);
		} catch (error) {
			next(error);
		}
	},
};