import { ChatRepositoryContract } from "./types/chats.contracts";

export const ChatRepository: ChatRepositoryContract = {
	createChat: function (data) {
		throw new Error("Function not implemented.");
	},
	findPersonalChat: function (currentUserId, targetUserId) {
		throw new Error("Function not implemented.");
	},
	getUsersByIds: function (userIds) {
		throw new Error("Function not implemented.");
	},
	getUserGroupChats: function (userId, pagination) {
		throw new Error("Function not implemented.");
	},
	getUserDirectChats: function (userId, pagination) {
		throw new Error("Function not implemented.");
	},
	getChatById: function (chatId, userId) {
		throw new Error("Function not implemented.");
	},
	deleteChat: function (id) {
		throw new Error("Function not implemented.");
	},
	searchUsers: function (query, currentUserId) {
		throw new Error("Function not implemented.");
	},
};
