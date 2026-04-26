import { PRISMA_CLIENT as Client } from "@config/client";
import type { UserRepository as RepoContract } from "./types/user.contracts";
import {
	ConflictError,
	InternalServerError,
	NotFoundError,
} from "@errors/app.errors";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/client";
import { PrismaErrorCodes } from "@app-types/error-codes";

export const UserRepository: RepoContract = {
	async findByEmail(email) {
		const user = await Client.user.findUnique({
			where: { email: email },
			include: {
				avatars: {
					include: {
						image: true,
					},
				},
			},
		});
		return user;
	},
	async findByIdWithPassword(id) {
		try {
			const user = await Client.user.findUniqueOrThrow({
				where: { id: id },
			});
			return user;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("User with id " + id);
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
	async findById(id) {
		try {
			const user = await Client.user.findUniqueOrThrow({
				where: { id: id },
				omit: { password: true },
				include: {
					avatars: {
						include: {
							image: true,
						},
					},
				},
			});
			return user;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("User with id " + id);
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
	async createVerificationCode({ email, code, expiresAt }) {
		const codeDB = await Client.verificationCode.create({
			data: {
				email,
				code,
				expiresAt,
			},
		});
		return codeDB;
	},
	async findVerificationByCode(code, email) {
		try {
			const verification = await Client.verificationCode.findFirstOrThrow(
				{
					where: { AND: [{ code: code }, { email: email }] },
				},
			);
			return verification;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("Verification code");
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
	async create(data) {
		try {
			const user = await Client.user.create({
				data,
				omit: { password: true },
				include: {
					avatars: {
						include: {
							image: true,
						},
					},
				},
			});
			return user;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.UNIQUE:
						throw new ConflictError(
							`User with such data (${data}) already exists`,
						);
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
	async updateProfile(id, data) {
		try {
			const updatedUser = await Client.user.update({
				where: { id },
				data,
				omit: { password: true },
				include: {
					avatars: {
						include: {
							image: true,
						},
					},
				},
			});
			return updatedUser;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("User with id " + id);
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
	async uploadAvatar(userId, filename) {
		try {
			const updatedUser = await Client.user.update({
				where: { id: userId },
				data: {
					avatars: {
						create: {
							image: {
								create: {
									filename,
									isVisible: true,
									userId: userId,
								},
							},
						},
					},
				},
				include: {
					avatars: {
						include: { image: true },
						orderBy: { id: "desc" },
					},
				},
				omit: { password: true },
			});
			return updatedUser;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("User with id " + userId);
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
	async getAvatarsByUserId(userId) {
		try {
			const avatars = await Client.avatar.findMany({
				where: {
					userId: userId,
				},
				include: {
					image: true,
				},
				orderBy: {
					id: "desc",
				},
			});
			return avatars;
		} catch (error) {
			if (error instanceof Error) {
				throw new InternalServerError(error.message);
			}
			throw new InternalServerError();
		}
	},
	async findAvatarById(id) {
		try {
			const avatar = await Client.avatar.findUniqueOrThrow({
				where: { id: id },
				include: {
					image: true,
				},
			});
			return avatar;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("Avatar with id " + id);
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
	async deleteAvatar(imageId) {
		try {
			const image = await Client.image.delete({
				where: { id: imageId },
			});

			return { message: "SUCCESS" };
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("image with id " + imageId);
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
