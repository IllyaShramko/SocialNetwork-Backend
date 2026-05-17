import { InternalServerError, NotFoundError } from "@errors/app.errors";
import { FriendsRepositoryContract } from "./types/friends.contracts";
import { PRISMA_CLIENT } from "@config/client";

export const FriendsRepository: FriendsRepositoryContract = {
	async getRequestsByProfileId(profileId) {
		try {
			const requests = await PRISMA_CLIENT.friendsRequest.findMany({
				where: {
					toProfileId: profileId,
				},
				include: {
					fromProfile: {
						include: {
							user: {
								omit: {
									password: true,
								},
							},
						},
					},
				},
			});
			return requests;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async getFriendsByProfileId(profileId) {
		try {
			const friends = await PRISMA_CLIENT.profileFriends.findMany({
				where: {
					OR: [
						{ fromProfileId: profileId },
						{ toProfileId: profileId },
					],
				},
				include: {
					fromProfile: {
						include: {
							user: {
								omit: {
									password: true,
								},
							},
						},
					},
					toProfile: {
						include: {
							user: {
								omit: {
									password: true,
								},
							},
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
			const profiles = await PRISMA_CLIENT.profile.findMany({
				where: {
					id: {
						notIn: excludeIds,
					},
				},
				include: {
					user: {
						omit: {
							password: true,
						},
					},
				},
			});
			return profiles;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async getFriendByIds(data) {
		try {
			const friend = await PRISMA_CLIENT.profileFriends.findFirstOrThrow({
				where: {
					OR: [
						data,
						{
							toProfileId: data.fromProfileId,
							fromProfileId: data.toProfileId,
						},
					],
				},
			});
			// if (!friend) {
			// 	throw new NotFoundError(
			// 		`friend with fromProfile with id ${data.fromProfileId} or toProfile with id ${data.toProfileId}`,
			// 	);
			// }
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
			const request = await PRISMA_CLIENT.friendsRequest.findFirstOrThrow(
				{
					where: {
						OR: [
							data,
							{
								toProfileId: data.fromProfileId,
								fromProfileId: data.toProfileId,
							},
						],
					},
				},
			);
			// if (!request) {
			// 	throw new NotFoundError(
			// 		`request with fromProfile with id ${data.fromProfileId} or toProfile with id ${data.toProfileId}`,
			// 	);
			// }
			return request;
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw new NotFoundError(error.message);
			}
			throw new InternalServerError();
		}
	},
	async getShortFriendsByProfileId(profileId) {
		try {
			const friends = await PRISMA_CLIENT.profileFriends.findMany({
				where: {
					OR: [
						{ toProfileId: profileId },
						{ fromProfileId: profileId },
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
			const request = await PRISMA_CLIENT.friendsRequest.findMany({
				where: {
					OR: [
						{ toProfileId: profileId },
						{ fromProfileId: profileId },
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
			const request = await PRISMA_CLIENT.friendsRequest.create({
				data,
			});
			return request;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async createProfileFriend(data, idRequest) {
		try {
			const [request, friend] = await PRISMA_CLIENT.$transaction([
				PRISMA_CLIENT.friendsRequest.delete({
					where: { id: idRequest },
				}),
				PRISMA_CLIENT.profileFriends.create({
					data,
				}),
			]);
			return friend;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async deleteFriendRequest(id) {
		try {
			const request = await PRISMA_CLIENT.friendsRequest.delete({
				where: { id },
			});
			return request;
		} catch (error) {
			throw new InternalServerError();
		}
	},
	async deleteProfileFriend(id) {
		try {
			const friend = await PRISMA_CLIENT.profileFriends.delete({
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
