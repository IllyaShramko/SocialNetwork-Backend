import { PrismaErrorCodes } from "@app-types/error-codes";
import {
	NotFoundError,
	InternalServerError,
	BadRequestError,
} from "@errors/app.errors";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/client";
import { AlbumRepository as AlbumRepositoryContract } from "./types/album.contracts";
import { PRISMA_CLIENT as Client } from "@config/client";

export const AlbumRepository: AlbumRepositoryContract = {
	async findById(id) {
		try {
			const album = await Client.album.findUniqueOrThrow({
				where: { id: id },
				include: {
					topic: true,
					images: true,
				},
			});
			return album;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("Album with id " + id);
					default:
						throw new InternalServerError();
				}
			}
			if (error instanceof Error) {
				throw new InternalServerError(error.message);
			}
			throw new InternalServerError();
		}
	},
	async createAlbum(data) {
		try {
			const album = await Client.album.create({
				data,
				include: {
					topic: true,
					images: true,
				},
			});
			return album;
		} catch (error) {
			if (error instanceof Error) {
				throw new InternalServerError(error.message);
			}
			throw new InternalServerError();
		}
	},
	async updateAlbum(id, data) {
		try {
			const album = await Client.album.update({
				where: { id: id },
				data,
				include: {
					topic: true,
					images: true,
				},
			});
			return album;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("Album with id " + id);
					case PrismaErrorCodes.FOREIGN_KEY:
						throw new NotFoundError("Topic with id " + id);
					default:
						console.log(error);
						throw new InternalServerError();
				}
			}
			if (error instanceof Error) {
				throw new InternalServerError(error.message);
			}
			throw new InternalServerError();
		}
	},
	async deleteAlbum(id) {
		try {
			const album = await Client.album.delete({
				where: { id: id },
				include: {
					topic: true,
					images: true,
				},
			});
			return album;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("Album with id " + id);
					default:
						throw new InternalServerError();
				}
			}
			if (error instanceof Error) {
				throw new InternalServerError(error.message);
			}
			throw new InternalServerError();
		}
	},
	async getTags() {
		const tags = await Client.tag.findMany();
		return tags;
	},
	async getAlbumsByUserId(userId) {
		const albums = await Client.album.findMany({
			where: {
				userId: userId,
			},
			include: {
				topic: true,
				images: true,
			},
		});
		return albums;
	},
	async uploadImage(data) {
		const image = await Client.image.create({ data });
		return image;
	},
	async findImageById(id) {
		try {
			const image = await Client.image.findUniqueOrThrow({
				where: { id: id },
				include: {
					album: true,
				},
			});
			return image;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("image with id " + id);
					default:
						throw new InternalServerError();
				}
			}
			if (error instanceof Error) {
				throw new InternalServerError(error.message);
			}
			throw new InternalServerError();
		}
	},
	async changeImageVisibility(id, visibility) {
		try {
			const image = await Client.image.update({
				where: { id: id },
				data: {
					isVisible: visibility,
				},
			});
			return image;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("image with id " + id);
					default:
						throw new InternalServerError();
				}
			}
			if (error instanceof Error) {
				throw new InternalServerError(error.message);
			}
			throw new InternalServerError();
		}
	},
	async deleteImage(id) {
		try {
			const image = await Client.image.delete({
				where: { id: id },
			});
			return image;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("image with id " + id);
					default:
						throw new InternalServerError();
				}
			}
			if (error instanceof Error) {
				throw new InternalServerError(error.message);
			}
			throw new InternalServerError();
		}
	},
};
