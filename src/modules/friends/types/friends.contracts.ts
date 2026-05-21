import { NextFunction, Request, Response } from "express";
import type { PaginationLocals } from "@middlewares/pagination.middleware";
import {
	FriendRequestWithProfile,
	FriendWithProfile,
	Profile,
	ShortFriendInfo,
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
			AuthenticatedUser & PaginationLocals
		>,
		res: Response<
			FriendRequestWithProfile[],
			AuthenticatedUser & PaginationLocals
		>,
		next: NextFunction,
	) => void;
	getFriends: (
		req: Request<
			object,
			FriendWithProfile[],
			object,
			object,
			AuthenticatedUser & PaginationLocals
		>,
		res: Response<
			FriendWithProfile[],
			AuthenticatedUser & PaginationLocals
		>,
		next: NextFunction,
	) => void;
	getRecs: (
		req: Request<
			object,
			UserWithProfile[],
			object,
			object,
			AuthenticatedUser & PaginationLocals
		>,
		res: Response<UserWithProfile[], AuthenticatedUser & PaginationLocals>,
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
			ShortFriendInfo,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ShortFriendInfo, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	declineRequest: (
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
	deleteFriendShip: (
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
		skip: number,
		take: number,
	) => Promise<FriendRequestWithProfile[]>;
	getFriendsByUserId: (
		userId: number,
		skip: number,
		take: number,
	) => Promise<FriendWithProfile[]>;
	getRecs: (
		userId: number,
		skip: number,
		take: number,
	) => Promise<UserWithProfile[]>;

	acceptRequest: (
		userId: number,
		profileId: number,
	) => Promise<ShortFriendInfo>;
	sendRequest: (
		userId: number,
		profileId: number,
	) => Promise<ShortFriendInfo>;
	declineRequest: (
		userId: number,
		profileId: number,
	) => Promise<ShortFriendInfo>;
	deleteFriendShip: (
		userId: number,
		profileId: number,
	) => Promise<ShortFriendInfo>;
}

export interface FriendsRepositoryContract {
	getShortRequestsByProfileId: (
		profileId: number,
	) => Promise<ShortFriendInfo[]>;
	getShortFriendsByProfileId: (
		profileId: number,
	) => Promise<ShortFriendInfo[]>;
	getRequestsByProfileId: (
		profileId: number,
		skip: number,
		take: number,
	) => Promise<FriendRequestWithProfile[]>;
	getFriendsByProfileId: (
		profileId: number,
		skip: number,
		take: number,
	) => Promise<FriendWithProfile[]>;
	getRecs: (
		exludeIds: number[],
		skip: number,
		take: number,
	) => Promise<UserWithProfile[]>;
	getFriendRequestByIds: (data: {
		fromUserId: number;
		toUserId: number;
	}) => Promise<ShortFriendInfo>;
	getFriendByIds: (data: {
		fromUserId: number;
		toUserId: number;
	}) => Promise<ShortFriendInfo>;
	createFriendRequest: (data: {
		fromUserId: number;
		toUserId: number;
	}) => Promise<ShortFriendInfo>;
	createProfileFriend: (
		data: {
			fromUserId: number;
			toUserId: number;
		},
		idRequest: number,
	) => Promise<ShortFriendInfo>;
	deleteFriendShip: (id: number) => Promise<ShortFriendInfo>;
	deleteFriendRequest: (id: number) => Promise<ShortFriendInfo>;
}
