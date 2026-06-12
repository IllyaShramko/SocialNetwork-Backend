import { InternalServerError, NotFoundError } from "@errors/app.errors";
import { PRISMA_CLIENT } from "@config/client";
import { ChatRepositoryContract } from "./types/chats.contracts";

export const ChatRepository: ChatRepositoryContract = {
	async createChat(data) {
		try {
			return await PRISMA_CLIENT.chat.create({
				data,
			});
		} catch {
			throw new InternalServerError();
		}
	},

	async findPersonalChat(currentUserId, targetUserId) {
		try {
			return await PRISMA_CLIENT.chat.findFirst({
				where: {
					participants: {
						every: {
							userId: {
								in: [currentUserId, targetUserId],
							},
						},
					},
				},
			});
		} catch {
			throw new InternalServerError();
		}
	},

	async getUsersByIds(userIds) {
		try {
			return await PRISMA_CLIENT.user.findMany({
				where: {
					id: {
						in: userIds,
					},
				},
				include: {
					profile: true,
				},
			});
		} catch {
			throw new InternalServerError();
		}
	},

	async getUserGroupChats(userId, pagination) {
		try {
			return await PRISMA_CLIENT.chat.findMany({
				where: {
					type: "GROUP",
					participants: {
						some: {
							userId,
						},
					},
				},
				skip: pagination.skip,
				take: pagination.take,
			});
		} catch {
			throw new InternalServerError();
		}
	},

	async getUserDirectChats(userId, pagination) {
		try {
			return await PRISMA_CLIENT.chat.findMany({
				where: {
					type: "DIRECT",
					participants: {
						some: {
							userId,
						},
					},
				},
				skip: pagination.skip,
				take: pagination.take,
			});
		} catch {
			throw new InternalServerError();
		}
	},

	async getChatById(chatId, userId) {
		try {
			return await PRISMA_CLIENT.chat.findFirstOrThrow({
				where: {
					id: chatId,
					participants: {
						some: {
							userId,
						},
					},
				},
				include: {
					participants: {
						include: {
							user: {
								include: {
									profile: true,
								},
							},
						},
					},
				},
			});
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw new NotFoundError(error.message);
			}
			throw new InternalServerError();
		}
	},

	async deleteChat(id) {
		try {
			return await PRISMA_CLIENT.chat.delete({
				where: { id },
			});
		} catch {
			throw new InternalServerError();
		}
	},

	async searchUsers(query, currentUserId) {
		try {
			return await PRISMA_CLIENT.user.findMany({
				where: {
					id: {
						not: currentUserId,
					},
					OR: [
						{
							username: {
								contains: query,
								mode: "insensitive",
							},
						},
						{
							profile: {
								firstName: {
									contains: query,
									mode: "insensitive",
								},
							},
						},
					],
				},
				include: {
					profile: true,
				},
			});
		} catch {
			throw new InternalServerError();
		}
	},
};