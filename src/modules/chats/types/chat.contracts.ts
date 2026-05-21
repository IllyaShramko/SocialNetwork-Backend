import { AuthenticatedUser } from "@app-types/token";
import type { PaginationLocals } from "@middlewares/pagination.middleware";
import type { NextFunction, Request, Response } from "express";
import type {
	ChatCreateData,
	ChatCreated,
	ChatCreateDto,
	ChatMedia,
	ChatMessage,
	ChatUserSearchResult,
	ChatWithPreview,
	ChatWithUsers,
	ChatGroupWithPreview,
} from "./chat.types";

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
	getChatMessages: (
		chatId: number,
		userId: number,
		skip: number,
		take: number,
	) => Promise<ChatMessage[]>;
	getChatMedia: (chatId: number, userId: number) => Promise<ChatMedia[]>;
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
	) => Promise<ChatWithPreview[]>;
	getChatById: (chatId: number, userId: number) => Promise<ChatWithUsers>;
	getChatMessages: (
		chatId: number,
		userId: number,
		skip: number,
		take: number,
	) => Promise<ChatMessage[]>;
	getChatMedia: (chatId: number, userId: number) => Promise<ChatMedia[]>;
	searchUsers: (
		query: string,
		currentUserId: number,
	) => Promise<ChatUserSearchResult[]>;
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
		res: Response<
			ChatGroupWithPreview[],
			AuthenticatedUser & PaginationLocals
		>,
		next: NextFunction,
	) => Promise<void>;
	getUserDirectChats: (
		req: Request<
			object,
			ChatWithPreview[],
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ChatWithPreview[], AuthenticatedUser & PaginationLocals>,
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
	getChatMessages: (
		req: Request<
			{ chatId: string },
			ChatMessage[],
			object,
			{ pageNumber?: string; limit?: string },
			AuthenticatedUser & PaginationLocals
		>,
		res: Response<ChatMessage[], AuthenticatedUser & PaginationLocals>,
		next: NextFunction,
	) => Promise<void>;
	getChatMedia: (
		req: Request<
			{ chatId: string },
			ChatMedia[],
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ChatMedia[], AuthenticatedUser>,
		next: NextFunction,
	) => Promise<void>;
	searchUsers: (
		req: Request<
			object,
			ChatUserSearchResult[],
			object,
			{ query?: string },
			AuthenticatedUser
		>,
		res: Response<ChatUserSearchResult[], AuthenticatedUser>,
		next: NextFunction,
	) => Promise<void>;
};
