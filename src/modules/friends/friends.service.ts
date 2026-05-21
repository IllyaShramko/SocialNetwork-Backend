import { FriendsRepository } from "./friends.repository";
import { FriendsServiceContract } from "./types/friends.contracts";
import { ChatService } from "../chats/chat.service";
import { AppError, InternalServerError } from "@errors/app.errors";

export const FriendsService: FriendsServiceContract = {
	async getRequestsByUserId(userId, skip, take) {
		const reqs = await FriendsRepository.getRequestsByProfileId(
			userId,
			skip,
			take,
		);
		return reqs;
	},
	async getFriendsByUserId(userId, skip, take) {
		const friends = await FriendsRepository.getFriendsByProfileId(
			userId,
			skip,
			take,
		);
		return friends;
	},
	async getRecs(userId, skip, take) {
		const friends =
			await FriendsRepository.getShortFriendsByProfileId(userId);
		const reqs =
			await FriendsRepository.getShortRequestsByProfileId(userId);
		const excludeIds = new Set<number>([userId]);

		friends.forEach(({ fromUserId, toUserId }) => {
			excludeIds.add(fromUserId);
			excludeIds.add(toUserId);
		});

		reqs.forEach(({ fromUserId, toUserId }) => {
			excludeIds.add(fromUserId);
			excludeIds.add(toUserId);
		});

		const recs = await FriendsRepository.getRecs(
			[...excludeIds],
			skip,
			take,
		);
		return recs;
	},
	async acceptRequest(userId, profileId) {
		const request = await FriendsRepository.getFriendRequestByIds({
			fromUserId: profileId,
			toUserId: userId,
		});
		const createdFriend = await FriendsRepository.createProfileFriend(
			{
				fromUserId: profileId,
				toUserId: userId,
			},
			request.id,
		);

		try {
			await ChatService.createChat(
				{ userIds: [userId, profileId] },
				userId,
			);
		} catch (error) {
			if (error instanceof AppError) {
				throw error;
			}
			throw new InternalServerError();
		}

		return createdFriend;
	},
	async sendRequest(userId, profileId) {
		const request = await FriendsRepository.createFriendRequest({
			fromUserId: userId,
			toUserId: profileId,
		});
		return request;
	},
	async declineRequest(userId, profileId) {
		const request = await FriendsRepository.getFriendRequestByIds({
			fromUserId: profileId,
			toUserId: userId,
		});
		const declinedRequest = await FriendsRepository.deleteFriendRequest(
			request.id,
		);
		return declinedRequest;
	},
	async deleteFriendShip(userId, profileId) {
		const friend = await FriendsRepository.getFriendByIds({
			fromUserId: profileId,
			toUserId: userId,
		});
		const deletedFriend = await FriendsRepository.deleteFriendShip(
			friend.id,
		);
		return deletedFriend;
	},
};
