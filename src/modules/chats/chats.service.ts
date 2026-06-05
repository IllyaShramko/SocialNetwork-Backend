import { ChatServiceContract } from "./types/chats.contracts";

export const ChatService: ChatServiceContract = {
	createChat: function (data, userId) {
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
	searchUsers: function (query, currentUserId) {
		throw new Error("Function not implemented.");
	},
	isChatParticipant: function (chatId, userId) {
		throw new Error("Function not implemented.");
	},
	getChatByUserIds: function (userId, targetUserId) {
		throw new Error("Function not implemented.");
	},
};
