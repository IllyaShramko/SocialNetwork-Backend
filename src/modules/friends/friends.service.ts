import { FriendsRepository } from "./friends.repository";
import { FriendsServiceContract } from "./types/friends.contracts";

export const FriendsService: FriendsServiceContract = {
	async getRequestsByUserId(userId) {
		const reqs = await FriendsRepository.getRequestsByUserId(userId);
		return reqs;
	},
	async getFriendsByUserId(userId) {
		const friends = await FriendsRepository.getFriendsByUserId(userId);
		return friends;
	},
	async getRecs(userId) {
		const profile = await FriendsRepository.getUserProfile(userId);
		const friends = await FriendsRepository.getShortFriendsByUserId(userId);
		const reqs = await FriendsRepository.getShortRequestsByUserId(userId);
		const excludeIds = new Set<number>([profile.id]);

		friends.forEach(({ fromUserId, toUserId }) => {
			excludeIds.add(fromUserId);
			excludeIds.add(toUserId);
		});

		reqs.forEach(({ fromUserId, toUserId }) => {
			excludeIds.add(fromUserId);
			excludeIds.add(toUserId);
		});

		const recs = await FriendsRepository.getRecs([...excludeIds]);
		return recs;
	},
	async acceptRequest(userId, userId1) {
		const request = await FriendsRepository.getFriendRequestByIds({
			fromUserId: userId1,
			toUserId: userId,
		});
		const createFriend = await FriendsRepository.updateStatusFriend({
			id: request.id,
			status: "accepted",
		});
		return createFriend;
	},
	async sendRequest(userId, UserId) {
		const request = await FriendsRepository.createFriendRequest({
			fromUserId: userId,
			toUserId: UserId,
		});
		console.log(request);
		return request;
	},
	async declineRequest(userId, UserId) {
		const request = await FriendsRepository.getFriendRequestByIds({
			fromUserId: UserId,
			toUserId: userId,
		});
		const declinedRequest = await FriendsRepository.deleteFriendRequest(
			request.id,
		);
		return declinedRequest;
	},
	async deleteFriend(userId, UserId) {
		const friend = await FriendsRepository.getFriendByIds({
			fromUserId: UserId,
			toUserId: userId,
		});
		const deletedFriend = await FriendsRepository.deleteProfileFriend(
			friend.id,
		);
		return deletedFriend;
	},
};
