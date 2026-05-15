import { PostControllerContract } from "./types/post.contracts";
import { PostService } from "./post.service";
import { BadRequestError } from "@errors/app.errors";

export const PostController: PostControllerContract = {
	async createPost(req, res, next) {
		try {
			const images: string[] = (req.files as Express.Multer.File[]).map(
				(file) => file.filename,
			);

			const createdPost = await PostService.createPost(
				{
					...req.body,
					images,
				},
				res.locals.userId,
			);

			res.status(201).json(createdPost);
		} catch (error) {
			next(error);
		}
	},
	async getAllPosts(req, res, next) {
		try {
			const { userId } = req.query;
			let targetUserId: number | undefined;

			if (userId !== undefined) {
				const parsedUserId = +userId;
				if (userId.trim() === "") {
					throw new BadRequestError("userId is required");
				}
				if (!Number.isInteger(parsedUserId)) {
					throw new BadRequestError("userId must be integer");
				}
				if (parsedUserId <= 0) {
					throw new BadRequestError("userId must be positive");
				}
				targetUserId = +userId;
			}

			const posts = await PostService.getAllPosts(
				+req.params.pageNumber,
				5,
				res.locals.userId,
				targetUserId,
			);
			res.status(200).json(posts);
		} catch (error) {
			next(error);
		}
	},
	async getUserPosts(req, res, next) {
		try {
			const posts = await PostService.getUserPosts(res.locals.userId);
			res.status(200).json(posts);
		} catch (error) {
			next(error);
		}
	},
	async getAllTags(req, res, next) {
		try {
			const tags = await PostService.getAllTags();
			res.status(200).json(tags);
		} catch (error) {
			next(error);
		}
	},
};
