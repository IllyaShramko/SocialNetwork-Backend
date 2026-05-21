import { InternalServerError } from "@errors/app.errors";
import { FriendsRepositoryContract } from "./types/friends.contracts";
import { PRISMA_CLIENT } from "@config/client";

export const FriendsRepository: FriendsRepositoryContract = {
	async getRequestsByProfileId(profileId, skip, take) {
		try {
			const requests = await PRISMA_CLIENT.friendShip.findMany({
				where: {
					toUserId: profileId,
					status: "pending",
				},
				skip,
				take,
				include: {
					fromUser: {
						omit: {
							password: true,
						},
						include: {
							profile: true,
						},
					},
				},
			});
			return requests;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async getFriendsByProfileId(profileId, skip, take) {
		try {
			const friends = await PRISMA_CLIENT.friendShip.findMany({
				where: {
					OR: [
						{ fromUserId: profileId, status: "accepted" },
						{ toUserId: profileId, status: "accepted" },
					],
				},
				skip,
				take,
				include: {
					fromUser: {
						omit: {
							password: true,
						},
						include: {
							profile: true,
						},
					},
					toUser: {
						omit: {
							password: true,
						},
						include: {
							profile: true,
						},
					},
				},
			});
			return friends;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async getRecs(excludeIds, skip, take) {
		try {
			const users = await PRISMA_CLIENT.user.findMany({
				where: {
					id: {
						notIn: excludeIds,
					},
				},
				skip,
				take,
				omit: {
					password: true,
				},
				include: {
					profile: true,
				},
			});
			return users;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async getFriendByIds(data) {
		try {
			const friend = await PRISMA_CLIENT.friendShip.findFirstOrThrow({
				where: {
					OR: [
						{
							fromUserId: data.fromUserId,
							toUserId: data.toUserId,
							status: "accepted",
						},
						{
							toUserId: data.fromUserId,
							fromUserId: data.toUserId,
							status: "accepted",
						},
					],
				},
			});
			return friend;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async getFriendRequestByIds(data) {
		try {
			const request = await PRISMA_CLIENT.friendShip.findFirstOrThrow({
				where: {
					OR: [
						{
							fromUserId: data.fromUserId,
							toUserId: data.toUserId,
							status: "pending",
						},
						{
							toUserId: data.fromUserId,
							fromUserId: data.toUserId,
							status: "pending",
						},
					],
				},
			});
			return request;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async getShortFriendsByProfileId(profileId) {
		try {
			const friends = await PRISMA_CLIENT.friendShip.findMany({
				where: {
					OR: [
						{ toUserId: profileId, status: "accepted" },
						{ fromUserId: profileId, status: "accepted" },
					],
				},
			});
			return friends;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async getShortRequestsByProfileId(profileId) {
		try {
			const request = await PRISMA_CLIENT.friendShip.findMany({
				where: {
					OR: [
						{ toUserId: profileId, status: "pending" },
						{ fromUserId: profileId, status: "pending" },
					],
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
				data: {
					fromUserId: data.fromUserId,
					toUserId: data.toUserId,
					status: "pending",
				},
			});
			return request;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async createProfileFriend(data, idRequest) {
		try {
			const [request, friend] = await PRISMA_CLIENT.$transaction([
				PRISMA_CLIENT.friendShip.delete({
					where: { id: idRequest },
				}),
				PRISMA_CLIENT.friendShip.create({
					data: {
						fromUserId: data.fromUserId,
						toUserId: data.toUserId,
						status: "accepted",
					},
				}),
			]);
			return friend;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async deleteFriendRequest(id: number) {
		try {
			const request = await PRISMA_CLIENT.friendShip.delete({
				where: { id },
			});
			return request;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async deleteFriendShip(id: number) {
		try {
			const friend = await PRISMA_CLIENT.friendShip.delete({
				where: { id },
			});
			return friend;
		} catch (error) {
			throw new InternalServerError();
		}
	},
};
