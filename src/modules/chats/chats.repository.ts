import { InternalServerError, NotFoundError } from "@errors/app.errors";
import { PRISMA_CLIENT } from "@config/client";
import { ChatRepositoryContract } from "./types/chats.contracts";

export const ChatRepository: ChatRepositoryContract = {
	async createChat(data) {
		try {
			return await PRISMA_CLIENT.chat.create({
				data: {
					name: data.name,
					avatar: data.avatar,
					isGroup: data.isGroup,
					...(data.adminId
						? {
								admin: {
									connect: {
										id: data.adminId,
									},
								},
							}
						: {}),
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
					users: {
						include: {
							user: {
								omit: {
									password: true,
								},
								include: {
									profile: true,
								},
							},
						},
					},
				},
			});
		} catch (error) {
			console.error("Error creating chat", error);
			throw new InternalServerError();
		}
	},

	async findPersonalChat(currentUserId, targetUserId) {
		try {
			return await PRISMA_CLIENT.chat.findFirst({
				where: {
					users: {
						every: {
							userId: {
								in: [currentUserId, targetUserId],
							},
						},
					},
				},
				include: {
					users: {
						include: {
							user: {
								omit: {
									password: true,
								},
								include: {
									profile: true,
								},
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
			const chats = await PRISMA_CLIENT.chat.findMany({
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
						include: {
							sender: {
								omit: {
									password: true,
								},
								include: {
									profile: true,
								},
							},
							messageImages: true,
							messageReaders: true,
						},
					},
				},
			});
			return chats.map((chat) => {
				return { ...chat, unreadCount: 0 };
			});
		} catch (error) {
			console.error(error);
			throw new InternalServerError();
		}
	},

	async getUserDirectChats(userId, pagination) {
		try {
			const chats = await PRISMA_CLIENT.chat.findMany({
				where: {
					isGroup: false,
					users: {
						some: {
							userId,
						},
					},
				},
				include: {
					messages: {
						include: {
							sender: {
								omit: {
									password: true,
								},
								include: {
									profile: true,
								},
							},
							messageImages: true,
							messageReaders: true,
						},
					},
					users: {
						include: {
							user: {
								omit: {
									password: true,
								},
								include: {
									profile: true,
								},
							},
						},
					},
				},
				skip: pagination.skip,
				take: pagination.take,
			});
			return chats.map((chat) => {
				return { ...chat, unreadCount: 0 };
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
					users: {
						some: {
							userId,
						},
					},
				},
				include: {
					users: {
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
				include: {
					users: {
						include: {
							user: {
								omit: {
									password: true,
								},
								include: {
									profile: true,
								},
							},
						},
					},
				},
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
							user: {
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
