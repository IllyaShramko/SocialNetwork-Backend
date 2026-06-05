import { AuthenticatedUser } from "@app-types/token";
import type { NextFunction, Request, Response } from "express";
import type {
	ChatCreateData,
	ChatCreated,
	ChatCreateDto,
	ChatUserSearchResult,
	ChatWithPreview,
	ChatWithUsers,
	ChatGroupWithPreview,
	ChatDirectPreviewDTO,
	Chat,
} from "./chats.types";

export type ChatRepositoryContract = {
	createChat: (data: ChatCreateData) => Promise<ChatCreated>;
	findPersonalChat: (
		currentUserId: number,
		targetUserId: number,
	) => Promise<ChatCreated | null>;
	getUsersByIds: (userIds: number[]) => Promise<ChatUserSearchResult[]>;
	getUserGroupChats: (
		userId: number,
		pagination: { skip: number; take: number },
	) => Promise<ChatGroupWithPreview[]>;
	getUserDirectChats: (
		userId: number,
		pagination: { skip: number; take: number },
	) => Promise<ChatWithPreview[]>;
	getChatById: (chatId: number, userId: number) => Promise<ChatWithUsers>;
	deleteChat: (id: number) => Promise<ChatCreated>;
	searchUsers: (
		query: string,
		currentUserId: number,
	) => Promise<ChatUserSearchResult[]>;
};

export type ChatServiceContract = {
	createChat: (data: ChatCreateDto, userId: number) => Promise<ChatCreated>;
	getUserGroupChats: (
		userId: number,
		pagination: { skip: number; take: number },
	) => Promise<ChatGroupWithPreview[]>;
	getUserDirectChats: (
		userId: number,
		pagination: { skip: number; take: number },
	) => Promise<ChatDirectPreviewDTO[]>;
	getChatById: (chatId: number, userId: number) => Promise<ChatWithUsers>;
	searchUsers: (
		query: string,
		currentUserId: number,
	) => Promise<ChatUserSearchResult[]>;
	isChatParticipant: (chatId: number, userId: number) => Promise<boolean>;
	getChatByUserIds: (userId: number, targetUserId: number) => Promise<Chat>;
};

export type ChatControllerContract = {
	createChat: (
		req: Request<
			object,
			ChatCreated,
			ChatCreateDto,
			object,
			AuthenticatedUser
		>,
		res: Response<ChatCreated, AuthenticatedUser>,
		next: NextFunction,
	) => Promise<void>;
	getUserGroupChats: (
		req: Request<
			object,
			ChatGroupWithPreview[],
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ChatGroupWithPreview[], AuthenticatedUser>,
		next: NextFunction,
	) => Promise<void>;
	getUserDirectChats: (
		req: Request<
			object,
			ChatDirectPreviewDTO[],
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ChatDirectPreviewDTO[], AuthenticatedUser>,
		next: NextFunction,
	) => Promise<void>;
	getChatById: (
		req: Request<
			{ chatId: string },
			ChatWithUsers,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ChatWithUsers, AuthenticatedUser>,
		next: NextFunction,
	) => Promise<void>;
};
