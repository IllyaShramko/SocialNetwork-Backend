import { AuthenticatedUser } from "@app-types/token";
import type { PostCreate, PostCreateDto, PostToShow, Tag } from "./post.types";
import type { Request, Response, NextFunction } from "express";

export type PostRepositoryContract = {
	createPost: (
		data: PostCreate,
		images: string[],
		tagIds: number[],
		links: string[],
	) => Promise<PostToShow>;
	//
	getUserPosts: (userId: number) => Promise<PostToShow[]>;

	getAllPosts: (skip?: number, take?: number) => Promise<PostToShow[]>;

	getAllTags: () => Promise<Tag[]>;
};

export type PostServiceContract = {
	createPost: (data: PostCreateDto, userId: number) => Promise<PostToShow>;

	getUserPosts: (userId: number) => Promise<PostToShow[]>;

	getAllPosts: (page: number, postsPerPage: number) => Promise<PostToShow[]>;

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
		req: Request<object, PostToShow[], object, object, AuthenticatedUser>,
		res: Response<PostToShow[], AuthenticatedUser>,
		next: NextFunction,
	) => Promise<void>;
	getAllPosts: (
		req: Request<{ pageNumber: string }, PostToShow[]>,
		res: Response<PostToShow[]>,
		next: NextFunction,
	) => Promise<void>;
	getAllTags: (
		req: Request<object, Tag[]>,
		res: Response<Tag[]>,
		next: NextFunction,
	) => Promise<void>;
};
