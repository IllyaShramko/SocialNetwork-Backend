import { PRISMA_CLIENT as Client } from "@config/client";
import {
	AppError,
	InternalServerError,
	NotFoundError,
} from "@errors/app.errors";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/client";
import { PrismaErrorCodes } from "@app-types/error-codes";
import type { ChatRepositoryContract } from "./types/chat.contracts";

const userWithProfile = {
	omit: {
		password: true,
	},
	include: {
		profile: true,
	},
} as const;

const messageDetails = {
	sender: userWithProfile,
	messageImages: true,
	messageReaders: true,
} as const;

const chatUsers = {
	include: {
		user: userWithProfile,
	},
} as const;

function handleChatError(error: unknown, resourceName: string): never {
	if (error instanceof AppError) {
		throw error;
	}

	if (
		error instanceof PrismaClientKnownRequestError &&
		error.code === PrismaErrorCodes.NOT_EXIST
	) {
		throw new NotFoundError(resourceName);
	}

	throw new InternalServerError(
		error instanceof Error ? error.message : undefined,
	);
}

export const ChatRepository: ChatRepositoryContract = {
	async createChat(data) {
		try {
			return await Client.chat.create({
				data: {
					name: data.name,
					isGroup: data.isGroup,
					avatar: data.avatar,
					adminId: data.adminId,
					users: {
						create: data.userIds.map((userId) => ({
							user: {
								connect: {
									id: userId,
								},
							},
						})),
					},
				},
				include: {
					users: chatUsers,
				},
			});
		} catch (error) {
			handleChatError(error, "Chat");
		}
	},
	async deleteChat(id) {
		try {
			return await Client.chat.delete({
				where: { id },
				include: {
					users: chatUsers,
				},
			});
		} catch (error) {
			handleChatError(error, "Chat");
		}
	},
	async findPersonalChat(currentUserId, targetUserId) {
		try {
			const chats = await Client.chat.findMany({
				where: {
					isGroup: false,
					users: {
						every: {
							userId: {
								in: [currentUserId, targetUserId],
							},
						},
					},
				},
				include: {
					users: chatUsers,
				},
			});

			return (
				chats.find((chat) => {
					const userIds = chat.users.map(({ userId }) => userId);

					return (
						userIds.length === 2 &&
						userIds.includes(currentUserId) &&
						userIds.includes(targetUserId)
					);
				}) ?? null
			);
		} catch (error) {
			handleChatError(error, "Personal chat");
		}
	},
	async getUsersByIds(userIds) {
		try {
			return await Client.user.findMany({
				where: {
					id: {
						in: userIds,
					},
				},
				omit: {
					password: true,
				},
				include: {
					profile: true,
				},
			});
		} catch (error) {
			throw new InternalServerError(
				error instanceof Error ? error.message : undefined,
			);
		}
	},
	async getUserGroupChats(userId, pagination) {
		try {
			const chats = await Client.chat.findMany({
				where: {
					isGroup: true,
					users: {
						some: {
							userId,
						},
					},
				},
				skip: pagination.skip,
				take: pagination.take,
				include: {
					messages: {
						take: 1,
						orderBy: {
							createdAt: "desc",
						},
						include: messageDetails,
					},
				},
				orderBy: {
					id: "desc",
				},
			});

			return await Promise.all(
				chats.map(async (chat) => {
					const unreadCount = await Client.message.count({
						where: {
							chatId: chat.id,
							senderId: {
								not: userId,
							},
							messageReaders: {
								none: {
									userId,
								},
							},
						},
					});

					return {
						...chat,
						unreadCount,
					};
				}),
			);
		} catch (error) {
			handleChatError(error, "Group chats");
		}
	},
	async getUserDirectChats(userId, pagination) {
		try {
			const chats = await Client.chat.findMany({
				where: {
					isGroup: false,
					users: {
						some: {
							userId,
						},
					},
				},
				skip: pagination.skip,
				take: pagination.take,
				include: {
					users: chatUsers,
					messages: {
						take: 1,
						orderBy: {
							createdAt: "desc",
						},
						include: messageDetails,
					},
				},
				orderBy: {
					id: "desc",
				},
			});

			return await Promise.all(
				chats.map(async (chat) => {
					const unreadCount = await Client.message.count({
						where: {
							chatId: chat.id,
							senderId: {
								not: userId,
							},
							messageReaders: {
								none: {
									userId,
								},
							},
						},
					});

					return {
						...chat,
						unreadCount,
					};
				}),
			);
		} catch (error) {
			handleChatError(error, "Direct chats");
		}
	},
	async getChatById(chatId, userId) {
		try {
			return await Client.chat.findFirstOrThrow({
				where: {
					id: chatId,
					users: {
						some: {
							userId,
						},
					},
				},
				include: {
					users: chatUsers,
				},
			});
		} catch (error) {
			handleChatError(error, "Chat");
		}
	},
	async getChatMessages(chatId, userId, skip, take) {
		try {
			await this.getChatById(chatId, userId);

			return await Client.message.findMany({
				where: {
					chatId,
				},
				skip,
				take,
				orderBy: {
					createdAt: "desc",
				},
				include: messageDetails,
			});
		} catch (error) {
			handleChatError(error, "Chat");
		}
	},
	async getChatMedia(chatId, userId) {
		try {
			await this.getChatById(chatId, userId);

			return await Client.messageImage.findMany({
				where: {
					message: {
						chatId,
					},
				},
				include: {
					message: {
						select: {
							id: true,
							chatId: true,
							senderId: true,
							createdAt: true,
						},
					},
				},
				orderBy: {
					id: "desc",
				},
			});
		} catch (error) {
			handleChatError(error, "Chat media");
		}
	},
	async searchUsers(query, currentUserId) {
		try {
			return await Client.user.findMany({
				where: {
					id: {
						not: currentUserId,
					},
					OR: [
						{
							username: {
								contains: query,
							},
						},
						{
							firstName: {
								contains: query,
							},
						},
						{
							lastName: {
								contains: query,
							},
						},
						{
							email: {
								contains: query,
							},
						},
						{
							profile: {
								pseudonym: {
									contains: query,
								},
							},
						},
					],
				},
				take: 20,
				orderBy: {
					id: "desc",
				},
				omit: {
					password: true,
				},
				include: {
					profile: true,
				},
			});
		} catch (error) {
			throw new InternalServerError(
				error instanceof Error ? error.message : undefined,
			);
		}
	},
};
