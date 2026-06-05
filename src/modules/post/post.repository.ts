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
	async getAllPosts(skip, take, userId) {
		const posts = await Client.post.findMany({
			where:
				userId !== undefined
					? {
							authorId: userId,
						}
					: {},
			skip: skip || 0,
			take: take || 5,
			include: {
				images: true,
				links: true,
				tags: {
					include: {
						tag: true,
					},
				},
				author: {
					omit: {
						password: true,
					},
					include: {
						profile: {
							select: {
								pseudonym: true,
								signature: true,
								avatar: true,
								is_image_signature: true,
								is_text_signature: true,
							},
						},
					},
				},
				likes: true,
				hearts: true,
				views: true,
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
				tags: {
					include: {
						tag: true,
					},
				},
				author: {
					omit: {
						password: true,
					},
					include: {
						profile: {
							select: {
								pseudonym: true,
								signature: true,
								avatar: true,
								is_image_signature: true,
								is_text_signature: true,
							},
						},
					},
				},
				likes: true,
				hearts: true,
				views: true,
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
					tags: {
						create: tagIds.map((id) => ({
							tag: { connect: { id } },
						})),
					},
					links: {
						create: links.map((url) => ({
							url,
						})),
					},
					images: {
						create: images.map((filename) => ({
							originalImage: filename,
							compressedImage: filename,
						})),
					},
					createdAt: new Date(),
				},
				include: {
					tags: {
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
						include: {
							profile: {
								select: {
									pseudonym: true,
									signature: true,
									avatar: true,
									is_image_signature: true,
									is_text_signature: true,
								},
							},
						},
					},
					likes: true,
					hearts: true,
					views: true,
				},
			});
			return post;
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
