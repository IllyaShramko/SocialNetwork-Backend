import { ChatRepository } from "./chat.repository";
import type { ChatServiceContract } from "./types/chat.contracts";
import { BadRequestError, NotFoundError } from "@errors/app.errors";

const DEFAULT_CHAT_AVATAR = "default-avatar.jpg";

export const ChatService: ChatServiceContract = {
	async createChat(data, userId) {
		const targetUserIds = [...new Set(data.userIds)].filter(
			(targetUserId) => targetUserId !== userId,
		);

		if (targetUserIds.length === 0) {
			throw new BadRequestError("userIds must contain other user ids");
		}

		const users = await ChatRepository.getUsersByIds(targetUserIds);

		if (users.length !== targetUserIds.length) {
			throw new NotFoundError("Users");
		}

		if (targetUserIds.length === 1) {
			const targetUserId = targetUserIds[0]!;
			const existingChat = await ChatRepository.findPersonalChat(
				userId,
				targetUserId,
			);

			if (existingChat) {
				return existingChat;
			}

			return ChatRepository.createChat({
				name: null,
				isGroup: false,
				avatar: DEFAULT_CHAT_AVATAR,
				adminId: null,
				userIds: [userId, targetUserId],
			});
		}

		const name = data.name?.trim();

		if (!name) {
			throw new BadRequestError("name is required for group chat");
		}

		return ChatRepository.createChat({
			name,
			isGroup: true,
			avatar: DEFAULT_CHAT_AVATAR,
			adminId: userId,
			userIds: [userId, ...targetUserIds],
		});
	},
	async getUserGroupChats(userId, pagination) {
		return ChatRepository.getUserGroupChats(userId, pagination);
	},
	async getUserDirectChats(userId, pagination) {
		return ChatRepository.getUserDirectChats(userId, pagination);
	},
	async getChatById(chatId, userId) {
		return ChatRepository.getChatById(chatId, userId);
	},
	async getChatMessages(chatId, userId, skip, take) {
		const messages = await ChatRepository.getChatMessages(
			chatId,
			userId,
			skip,
			take,
		);

		return messages.reverse();
	},
	async getChatMedia(chatId, userId) {
		return ChatRepository.getChatMedia(chatId, userId);
	},
	async searchUsers(query, currentUserId) {
		return ChatRepository.searchUsers(query.trim(), currentUserId);
	},
};
