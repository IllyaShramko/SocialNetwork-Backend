import { FriendsRepository } from "./friends.repository";
import { FriendsServiceContract } from "./types/friends.contracts";

export const FriendsService: FriendsServiceContract = {
	async getRequestsByUserId(userId) {
		const profile = await FriendsRepository.getUserProfile(userId);
		const reqs = await FriendsRepository.getRequestsByProfileId(profile.id);
		console.log(profile, reqs)
		return reqs;
	},
	async getFriendsByUserId(userId) {
		const profile = await FriendsRepository.getUserProfile(userId);
		const friends = await FriendsRepository.getFriendsByProfileId(
			profile.id,
		);
		console.log(profile, friends)
		return friends;
	},
	async getRecs(userId) {
		const profile = await FriendsRepository.getUserProfile(userId);
		const friends =
			await FriendsRepository.getShortFriendsByProfileId(userId);
		const reqs =
			await FriendsRepository.getShortRequestsByProfileId(userId);
		const excludeIds = new Set<number>([profile.id]);

		friends.forEach(({ fromProfileId, toProfileId }) => {
			excludeIds.add(fromProfileId);
			excludeIds.add(toProfileId);
		});

		reqs.forEach(({ fromProfileId, toProfileId }) => {
			excludeIds.add(fromProfileId);
			excludeIds.add(toProfileId);
		});
		
		const recs = await FriendsRepository.getRecs([...excludeIds]);
		return recs;
	},
	async acceptRequest(userId, profileId) {
		const request = await FriendsRepository.getFriendRequestByIds({
			fromProfileId: profileId,
			toProfileId: userId,
		});
		const createdFriend = await FriendsRepository.createProfileFriend(
			{
				fromProfileId: profileId,
				toProfileId: userId,
			},
			request.id,
		);
		return createdFriend;
	},
	async sendRequest(userId, profileId) {
		const request = await FriendsRepository.createFriendRequest({
			fromProfileId: userId,
			toProfileId: profileId,
		});
		console.log(request)
		return request;
	},
	async declineRequest(userId, profileId) {
		const request = await FriendsRepository.getFriendRequestByIds({
			fromProfileId: profileId,
			toProfileId: userId,
		});
		const declinedRequest = await FriendsRepository.deleteFriendRequest(
			request.id,
		);
		return declinedRequest;
	},
	async deleteFriend(userId, profileId) {
		const friend = await FriendsRepository.getFriendByIds({
			fromProfileId: profileId,
			toProfileId: userId,
		});
		const deletedFriend = await FriendsRepository.deleteProfileFriend(
			friend.id,
		);
		return deletedFriend;
	},
};
