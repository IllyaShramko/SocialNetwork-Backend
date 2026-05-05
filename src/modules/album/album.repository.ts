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
					images: true,
					profile: {
						select: {
							userId: true,
						},
					},
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
					images: true,
					profile: {
						select: {
							userId: true,
						},
					},
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
					images: true,
					profile: {
						select: {
							userId: true,
						},
					},
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
	async deleteAlbum(id) {
		try {
			const album = await Client.album.delete({
				where: { id: id },
				include: {
					images: true,
					profile: {
						select: {
							userId: true,
						},
					},
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
	async getAlbumsByProfileId(profileId) {
		const albums = await Client.album.findMany({
			where: {
				profileId,
			},
			include: {
				images: true,
				profile: {
					select: {
						userId: true,
					},
				},
			},
		});
		return albums;
	},
	async uploadImage(data) {
		const image = await Client.albumImage.create({ data });
		return image;
	},
	async findImageById(id) {
		try {
			const image = await Client.albumImage.findUniqueOrThrow({
				where: { id: id },
				include: {
					album: {
						select: {
							profile: {
								select: {
									userId: true,
								},
							},
						},
					},
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
			const image = await Client.albumImage.update({
				where: { id: id },
				data: {
					isShown: visibility,
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
			const image = await Client.albumImage.delete({
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
