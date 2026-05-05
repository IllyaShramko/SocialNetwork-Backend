import { UserRepository } from "../user/user.repository";
import { PostRepository } from "./post.repository";
import type { PostServiceContract } from "./types/post.contracts";
import { PostCreate } from "./types/post.types";

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
		return post;
	},
	async getAllPosts(page, postsPerPage) {
		const posts = await PostRepository.getAllPosts(
			page * postsPerPage,
			postsPerPage,
		);
		return posts;
	},
	async getUserPosts(userId) {
		const posts = await PostRepository.getUserPosts(userId);
		return posts;
	},
	async getAllTags() {
		return PostRepository.getAllTags();
	},
};
