import { PrismaClient } from "../../generated/prisma";
import type { UserRepository as RepoContract } from "./types/user.contracts";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { User } from "./types/user.types";
import { PrismaErrorCodes } from "@app-types/error-codes";
import { InternalServerError, NotFoundError } from "@errors/app.errors";

const Client = new PrismaClient();

export const UserRepository: RepoContract = {
	async findByEmail(email) {
		try {
			const user = await Client.user.findUnique({
				where: { email },
				omit: { password: true },
			});
			return user;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("User");
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
	async findByUsername(username) {
		try {
			const user = await Client.user.findUnique({
				where: { username },
				omit: { password: true },
			});
			return user;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("User");
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
	async findByIdWithPassword(id) {
		try {
			const user = Client.user.findUnique({
				where: { id },
			});
			return user;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("User");
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
			});
			return user;
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				switch (error.code) {
					case PrismaErrorCodes.NOT_EXIST:
						throw new NotFoundError("User");
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
	findById: function (id: number): Promise<User | null> {
		throw new Error("Function not implemented.");
	},
};