import { ChatRepository } from "./chats.repository";
import { ChatServiceContract } from "./types/chats.contracts";

export const ChatService: ChatServiceContract = {
	async createChat(data, userId) {
		if (data.userIds.length === 1) {
			const targetUserId = data.userIds[0];

			if (targetUserId !== undefined) {
				const existingChat = await ChatRepository.findPersonalChat(
					userId,
					targetUserId,
				);

				if (existingChat) {
					return existingChat;
				}
			}
		}

		return await ChatRepository.createChat({
			name: data.name ?? null,
			avatar: data.avatar ?? "",
			isGroup: data.userIds.length > 1,
			adminId: data.userIds.length >= 1 ? userId : null,
			userIds: [...new Set([userId, ...data.userIds])],
		});
	},

	async getUserGroupChats(userId, pagination) {
		return await ChatRepository.getUserGroupChats(
			userId,
			pagination,
		);
	},

	async getUserDirectChats(userId, pagination) {
		const chats = await ChatRepository.getUserDirectChats(
			userId,
			pagination,
		);

		return chats.map((chat) => {
			const participant = chat.users.find(
				(user) => user.userId !== userId,
			)!;

			return {
				...chat,
				participant,
			};
		});
	},

	async getChatById(chatId, userId) {
		return await ChatRepository.getChatById(chatId, userId);
	},

	async searchUsers(query, currentUserId) {
		return await ChatRepository.searchUsers(
			query,
			currentUserId,
		);
	},

	async isChatParticipant(chatId, userId) {
		try {
			const chat = await ChatRepository.getChatById(
				chatId,
				userId,
			);

			return chat.users.some(
				(user) => user.userId === userId,
			);
		} catch {
			return false;
		}
	},

	async getChatByUserIds(userId, targetUserId) {
		const chat = await ChatRepository.findPersonalChat(
			userId,
			targetUserId,
		);

		if (!chat) {
			throw new Error("Chat not found");
		}

		return chat;
	},
};
// asda