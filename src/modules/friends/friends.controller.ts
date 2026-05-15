import { FriendsControllerContract } from "./types/friends.contracts";
import { FriendsService } from "./friends.service";
import { BadRequestError } from "@errors/app.errors";

export const FriendsController: FriendsControllerContract = {
	async getFriends(req, res, next) {
		try {
			const friends = await FriendsService.getFriendsByUserId(
				res.locals.userId,
			);
			res.status(200).json(friends);
		} catch (error) {
			next(error);
		}
	},
	async getRecs(req, res, next) {
		try {
			const recs = await FriendsService.getRecs(res.locals.userId);
			res.status(200).json(recs);
		} catch (error) {
			next(error);
		}
	},
	async getRequests(req, res, next) {
		try {
			const reqs = await FriendsService.getRequestsByUserId(
				res.locals.userId,
			);
			res.status(200).json(reqs);
		} catch (error) {
			next(error);
		}
	},
	async sendRequest(req, res, next) {
		try {
			if (req.params.profileId) {
				if (isNaN(+req.params.profileId)) {
					throw new BadRequestError("profileId must be integer");
				}
			} else {
				throw new BadRequestError("profileId is required");
			}
			const request = await FriendsService.sendRequest(
				res.locals.userId,
				+req.params.profileId,
			);
			res.status(201).json(request);
		} catch (error) {
			next(error);
		}
	},
	async acceptRequest(req, res, next) {
		try {
			if (req.params.profileId) {
				if (isNaN(+req.params.profileId)) {
					throw new BadRequestError("profileId must be integer");
				}
			} else {
				throw new BadRequestError("profileId is required");
			}
			const request = await FriendsService.acceptRequest(
				res.locals.userId,
				+req.params.profileId,
			);
			res.status(201).json(request);
		} catch (error) {
			next(error);
		}
	},
	async declineRequest(req, res, next) {
		try {
			if (req.params.profileId) {
				if (isNaN(+req.params.profileId)) {
					throw new BadRequestError("profileId must be integer");
				}
			} else {
				throw new BadRequestError("profileId is required");
			}
			const request = await FriendsService.declineRequest(
				res.locals.userId,
				+req.params.profileId,
			);
			res.status(201).json(request);
		} catch (error) {
			next(error);
		}
	},
	async deleteFriend(req, res, next) {
		try {
			if (req.params.profileId) {
				if (isNaN(+req.params.profileId)) {
					throw new BadRequestError("profileId must be integer");
				}
			} else {
				throw new BadRequestError("profileId is required");
			}
			const friend = await FriendsService.deleteFriend(
				res.locals.userId,
				+req.params.profileId,
			);
			res.status(202).json(friend);
		} catch (error) {
			next(error);
		}
	},
};
