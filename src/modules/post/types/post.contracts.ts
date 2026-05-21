import { AuthenticatedUser } from "@app-types/token";
import type { PaginationLocals } from "@middlewares/pagination.middleware";
import type {
	PostCreate,
	PostCreateDto,
	PostFullInfoDTO,
	PostToShow,
	Tag,
} from "./post.types";
import type { Request, Response, NextFunction } from "express";

export type PostRepositoryContract = {
	createPost: (
		data: PostCreate,
		images: string[],
		tagIds: number[],
		links: string[],
	) => Promise<PostFullInfoDTO>;
	//
	getUserPosts: (
		userId: number,
		skip: number,
		take: number,
	) => Promise<PostFullInfoDTO[]>;

	getAllPosts: (
		skip: number,
		take: number,
		userId?: number,
	) => Promise<PostFullInfoDTO[]>;

	getAllTags: () => Promise<Tag[]>;
};

export type PostServiceContract = {
	createPost: (data: PostCreateDto, userId: number) => Promise<PostToShow>;

	getUserPosts: (
		userId: number,
		skip: number,
		take: number,
	) => Promise<PostToShow[]>;

	getAllPosts: (
		skip: number,
		take: number,
		userId: number,
		targetUserId?: number,
	) => Promise<PostToShow[]>;

	getAllTags: () => Promise<Tag[]>;
};

export type PostControllerContract = {
	createPost: (
		req: Request<
			object,
			PostToShow,
			PostCreateDto,
			object,
			AuthenticatedUser
		>,
		res: Response<PostToShow, AuthenticatedUser>,
		next: NextFunction,
	) => Promise<void>;
	getUserPosts: (
		req: Request<
			object,
			PostToShow[],
			object,
			{ userId?: string; limit: string; pageNumber: string },
			AuthenticatedUser & PaginationLocals
		>,
		res: Response<PostToShow[], AuthenticatedUser & PaginationLocals>,
		next: NextFunction,
	) => Promise<void>;
	getAllPosts: (
		req: Request<
			object,
			PostToShow[],
			object,
			{ userId?: string; limit: string; pageNumber: string },
			AuthenticatedUser & PaginationLocals
		>,
		res: Response<PostToShow[], AuthenticatedUser & PaginationLocals>,
		next: NextFunction,
	) => Promise<void>;
	getAllTags: (
		req: Request<object, Tag[]>,
		res: Response<Tag[]>,
		next: NextFunction,
	) => Promise<void>;
};
