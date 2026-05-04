import { PRISMA_CLIENT as Client } from "@config/client";
import { PostRepositoryContract } from "./types/post.contracts";
import { Prisma } from "../../generated/prisma";
import { PrismaErrorCodes } from "@app-types/error-codes";
import {
	BadRequestError,
	ConflictError,
	InternalServerError,
	NotFoundError,
} from "@errors/app.errors";

export const PostRepository: PostRepositoryContract = {
	async getAllPosts(skip, take) {
		const posts = await Client.post.findMany({
			skip: skip || 0,
			take: take || 5,
			include: {
				images: true,
				links: true,
				tagPosts: {
					include: {
						tag: true,
					},
				},
				author: {
					omit: {
						password: true,
					},
				},
			},
			orderBy: {
				id: "desc",
			},
		});
		return posts;
	},
	async getAllTags() {
		const tags = await Client.tag.findMany();
		return tags;
	},
	async getUserPosts(userId) {
		const posts = await Client.post.findMany({
			where: {
				authorId: userId,
			},
			include: {
				images: true,
				links: true,
				tagPosts: {
					include: {
						tag: true,
					},
				},
				author: {
					omit: {
						password: true,
					},
				},
			},
			orderBy: {
				id: "desc",
			},
		});
		return posts;
	},
	async createPost(data, images, tagIds, links) {
		try {
			const post = await Client.post.create({
				data: {
					...data,
					views: 0,
					tagPosts: {
						create: tagIds.map((id) => ({
							tag: { connect: { id } },
						})),
					},
					links: {
						create: links.map((url) => ({
							href: url,
						})),
					},
					images: {
						create: images.map((filename) => ({
							filename: filename,
							isVisible: true,
							userId: data.authorId,
						})),
					},
				},
				include: {
					tagPosts: {
						include: {
							tag: true,
						},
					},
					links: true,
					images: true,
					author: {
						omit: {
							password: true,
						},
					},
				},
			});

			return post;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.log(error);
				switch (error.code) {
					case PrismaErrorCodes.UNIQUE:
						throw new ConflictError("this post");
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError(`Tags with ids [${tagIds}]`);
					case PrismaErrorCodes.FOREIGN_KEY:
						throw new BadRequestError(
							"Foreign key constraint Error.",
						);
					default:
						throw new InternalServerError();
				}
			}
			throw new InternalServerError();
		}
	},
};
