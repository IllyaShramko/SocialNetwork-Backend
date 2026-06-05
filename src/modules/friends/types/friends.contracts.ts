import { NextFunction, Request, Response } from "express";
import {
	FriendRequestWithProfile,
	FriendWithProfile,
	Profile,
	ShortFriend,
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
			{ userId: string },
			ShortFriend,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ShortFriend, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	sendRequest: (
		req: Request<
			{ userId: string },
			ShortFriend,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ShortFriend, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	declineRequest: (
		req: Request<
			{ userId: string },
			ShortFriend,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ShortFriend, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	deleteFriend: (
		req: Request<
			{ userId: string },
			ShortFriend,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ShortFriend, AuthenticatedUser>,
		next: NextFunction,
	) => void;
}

export interface FriendsServiceContract {
	getRequestsByUserId: (
		userId: number,
	) => Promise<FriendRequestWithProfile[]>;
	getFriendsByUserId: (userId: number) => Promise<FriendWithProfile[]>;
	getRecs: (userId: number) => Promise<UserWithProfile[]>;

	acceptRequest: (userId: number, toUserId: number) => Promise<ShortFriend>;
	sendRequest: (userId: number, toUserId: number) => Promise<ShortFriend>;
	declineRequest: (userId: number, toUserId: number) => Promise<ShortFriend>;
	deleteFriend: (userId: number, toUserId: number) => Promise<ShortFriend>;
}

export interface FriendsRepositoryContract {
	getShortRequestsByUserId: (userId: number) => Promise<ShortFriend[]>;
	getShortFriendsByUserId: (userId: number) => Promise<ShortFriend[]>;
	getRequestsByUserId: (
		userId: number,
	) => Promise<FriendRequestWithProfile[]>;
	getFriendsByUserId: (userId: number) => Promise<FriendWithProfile[]>;
	getRecs: (exludeIds: number[]) => Promise<UserWithProfile[]>;
	getFriendRequestByIds: (data: {
		fromUserId: number;
		toUserId: number;
	}) => Promise<ShortFriend>;
	getFriendByIds: (data: {
		fromUserId: number;
		toUserId: number;
	}) => Promise<ShortFriend>;
	getUserProfile: (userId: number) => Promise<Profile>;

	createFriendRequest: (data: {
		fromUserId: number;
		toUserId: number;
	}) => Promise<ShortFriend>;

	updateStatusFriend: (data: {
		id: number;
		status: "pending" | "accepted" | "rejected";
	}) => Promise<ShortFriend>;

	deleteProfileFriend: (id: number) => Promise<ShortFriend>;
	deleteFriendRequest: (id: number) => Promise<ShortFriend>;
}
