import { UserRepository } from "../user/user.repository";
import { PostRepository } from "./post.repository";
import type { PostServiceContract } from "./types/post.contracts";
import { PostCreate, PostToShow } from "./types/post.types";

export const PostService: PostServiceContract = {
	async createPost(data, userId) {
		const profile = await UserRepository.findById(userId);
		const mainData: PostCreate = {
			title: data.title,
			topic: data.topic,
			content: data.content,
			authorId: profile.id,
		};
		const tagsId = data.tagIds;
		const images = data.images;
		const links = data.links;
		const post = await PostRepository.createPost(
			mainData,
			images,
			tagsId,
			links,
		);
		const { hearts, likes, views, ...cleanPost } = post;

		const finalPost: PostToShow = {
			...cleanPost,
			views: views.length,
			hearts: hearts.length,
			likes: likes.length,
			isViewed: views.some((view) => view.userId === userId),
			isHearted: hearts.some((view) => view.userId === userId),
			isLiked: likes.some((view) => view.userId === userId),
		};
		return finalPost;
	},
	async getAllPosts(page, postsPerPage, userId, targetUserId) {
		const posts = await PostRepository.getAllPosts(
			page * postsPerPage,
			postsPerPage,
			targetUserId,
		);
		const cleanPosts = posts.map((post) => {
			const { hearts, likes, views, ...cleanPost } = post;

			const finalPost: PostToShow = {
				...cleanPost,
				views: views.length,
				hearts: hearts.length,
				likes: likes.length,
				isViewed: views.some((view) => view.userId === userId),
				isHearted: hearts.some((view) => view.userId === userId),
				isLiked: likes.some((view) => view.userId === userId),
			};
			return finalPost;
		});
		return cleanPosts;
	},
	async getUserPosts(userId) {
		const posts = await PostRepository.getUserPosts(userId);
		const cleanPosts = posts.map((post) => {
			const { hearts, likes, views, ...cleanPost } = post;

			const finalPost: PostToShow = {
				...cleanPost,
				views: views.length,
				hearts: hearts.length,
				likes: likes.length,
				isViewed: views.some((view) => view.userId === userId),
				isHearted: hearts.some((view) => view.userId === userId),
				isLiked: likes.some((view) => view.userId === userId),
			};
			return finalPost;
		});
		return cleanPosts;
	},
	async getAllTags() {
		return PostRepository.getAllTags();
	},
};
