import { InternalServerError, NotFoundError } from "@errors/app.errors";
import { FriendsRepositoryContract } from "./types/friends.contracts";
import { PRISMA_CLIENT } from "@config/client";

export const FriendsRepository: FriendsRepositoryContract = {
	async getRequestsByUserId(userId) {
		try {
			const requests = await PRISMA_CLIENT.friendShip.findMany({
				where: { toUserId: userId, status: "pending" },
				include: {
					fromUser: {
						include: {
							profile: true,
						},
						omit: {
							password: true,
						},
					},
				},
			});
			return requests;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async getFriendsByUserId(userId) {
		try {
			const friends = await PRISMA_CLIENT.friendShip.findMany({
				where: {
					OR: [{ fromUserId: userId }, { toUserId: userId }],
					status: "accepted",
				},
				include: {
					fromUser: {
						include: {
							profile: true,
						},
						omit: {
							password: true,
						},
					},
					toUser: {
						include: {
							profile: true,
						},
						omit: {
							password: true,
						},
					},
				},
			});
			console.log(friends);
			return friends;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async getRecs(excludeIds) {
		try {
			const profiles = await PRISMA_CLIENT.user.findMany({
				where: {
					id: {
						notIn: excludeIds,
					},
				},
				include: {
					profile: true,
				},
			});
			return profiles;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async getFriendByIds(data) {
		try {
			const friend = await PRISMA_CLIENT.friendShip.findFirstOrThrow({
				where: {
					OR: [
						data,
						{
							toUserId: data.fromUserId,
							fromUserId: data.toUserId,
						},
					],
					status: "accepted",
				},
			});
			return friend;
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw new NotFoundError(error.message);
			}
			throw new InternalServerError();
		}
	},
	async getFriendRequestByIds(data) {
		try {
			const request = await PRISMA_CLIENT.friendShip.findFirstOrThrow({
				where: {
					OR: [
						data,
						{
							toUserId: data.fromUserId,
							fromUserId: data.toUserId,
						},
					],
					status: "pending",
				},
			});
			return request;
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw new NotFoundError(error.message);
			}
			throw new InternalServerError();
		}
	},
	async getShortFriendsByUserId(userId) {
		try {
			const friends = await PRISMA_CLIENT.friendShip.findMany({
				where: {
					OR: [{ toUserId: userId }, {}],
				},
			});
			return friends;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async getShortRequestsByUserId(userId) {
		try {
			const request = await PRISMA_CLIENT.friendShip.findMany({
				where: {
					OR: [{ toUserId: userId }, { fromUserId: userId }],
				},
			});
			return request;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async createFriendRequest(data) {
		try {
			const request = await PRISMA_CLIENT.friendShip.create({
				data: { ...data, status: "pending", created_at: new Date() },
			});
			return request;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async updateStatusFriend(data) {
		try {
			const friend = await PRISMA_CLIENT.friendShip.update({
				where: {
					id: data.id,
				},
				data: {
					status: data.status,
				},
			});
			return friend;
		} catch {
			throw new InternalServerError();
		}
	},
	async deleteFriendRequest(id) {
		try {
			const request = await PRISMA_CLIENT.friendShip.delete({
				where: { id },
			});
			return request;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async deleteProfileFriend(id) {
		try {
			const friend = await PRISMA_CLIENT.friendShip.delete({
				where: { id },
			});
			return friend;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async getUserProfile(userId) {
		try {
			return await PRISMA_CLIENT.profile.findUniqueOrThrow({
				where: { userId },
			});
		} catch (error) {
			throw new InternalServerError();
		}
	},
};
