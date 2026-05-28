import { NextFunction, Request, Response } from "express";
import {
	FriendRequestWithProfile,
	FriendWithProfile,
	Profile,
	ShortFriendInfo,
	ShortFriendRequest,
	UserWithProfile,
} from "./friends.types";
import { AuthenticatedUser } from "@app-types/token";

export interface FriendsControllerContract {
	getRequests: (
		req: Request<
			object,
			FriendRequestWithProfile[],
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<FriendRequestWithProfile[], AuthenticatedUser>,
		next: NextFunction,
	) => void;
	getFriends: (
		req: Request<
			object,
			FriendWithProfile[],
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<FriendWithProfile[], AuthenticatedUser>,
		next: NextFunction,
	) => void;
	getRecs: (
		req: Request<
			object,
			UserWithProfile[],
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<UserWithProfile[], AuthenticatedUser>,
		next: NextFunction,
	) => void;

	acceptRequest: (
		req: Request<
			{ profileId: string },
			ShortFriendInfo,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ShortFriendInfo, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	sendRequest: (
		req: Request<
			{ profileId: string },
			ShortFriendRequest,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ShortFriendRequest, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	declineRequest: (
		req: Request<
			{ profileId: string },
			ShortFriendRequest,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ShortFriendRequest, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	deleteFriend: (
		req: Request<
			{ profileId: string },
			ShortFriendInfo,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ShortFriendInfo, AuthenticatedUser>,
		next: NextFunction,
	) => void;
}

export interface FriendsServiceContract {
	getRequestsByUserId: (
		userId: number,
	) => Promise<FriendRequestWithProfile[]>;
	getFriendsByUserId: (userId: number) => Promise<FriendWithProfile[]>;
	getRecs: (userId: number) => Promise<UserWithProfile[]>;

	acceptRequest: (
		userId: number,
		profileId: number,
	) => Promise<ShortFriendInfo>;
	sendRequest: (
		userId: number,
		profileId: number,
	) => Promise<ShortFriendRequest>;
	declineRequest: (
		userId: number,
		profileId: number,
	) => Promise<ShortFriendRequest>;
	deleteFriend: (
		userId: number,
		profileId: number,
	) => Promise<ShortFriendInfo>;
}

export interface FriendsRepositoryContract {
	getShortRequestsByProfileId: (
		profileId: number,
	) => Promise<ShortFriendRequest[]>;
	getShortFriendsByProfileId: (
		profileId: number,
	) => Promise<ShortFriendInfo[]>;
	getRequestsByProfileId: (
		profileId: number,
	) => Promise<FriendRequestWithProfile[]>;
	getFriendsByProfileId: (profileId: number) => Promise<FriendWithProfile[]>;
	getRecs: (exludeIds: number[]) => Promise<UserWithProfile[]>;
	getFriendRequestByIds: (data: {
		fromProfileId: number;
		toProfileId: number;
	}) => Promise<ShortFriendRequest>;
	getFriendByIds: (data: {
		fromProfileId: number;
		toProfileId: number;
	}) => Promise<ShortFriendInfo>;
	getUserProfile: (userId: number) => Promise<Profile>;

	createFriendRequest: (data: {
		fromProfileId: number;
		toProfileId: number;
	}) => Promise<ShortFriendRequest>;
	createProfileFriend: (
		data: {
			fromProfileId: number;
			toProfileId: number;
		},
		idRequest: number,
	) => Promise<ShortFriendInfo>;
	deleteProfileFriend: (id: number) => Promise<ShortFriendInfo>;
	deleteFriendRequest: (id: number) => Promise<ShortFriendRequest>;
}
