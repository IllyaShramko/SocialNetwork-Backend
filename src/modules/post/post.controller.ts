import { PostControllerContract } from "./types/post.contracts";
import { PostService } from "./post.service";

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
			const posts = await PostService.getAllPosts(
				+req.params.pageNumber,
				5,
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
