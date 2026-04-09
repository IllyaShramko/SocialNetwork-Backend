import { PRISMA_CLIENT as Client } from "@config/client";
import type { UserRepository as RepoContract } from "./types/user.contracts";
import {
	AppError,
	InternalServerError,
	NotFoundError,
} from "@errors/app.errors";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/client";
import { PrismaErrorCodes } from "@app-types/error-codes";

export const UserRepository: RepoContract = {
	async findByEmail(email) {
		const user = await Client.user.findUnique({
			where: { email: email },
		});
		return user;
	},
	async findByIdWithPassword(id) {
		const user = await Client.user.findUnique({
			where: { id: id },
		});
		return user;
	},
	async findById(id) {
		const user = await Client.user.findUnique({
			where: { id: id },
			omit: { password: true },
		});
		return user;
	},
	async createVerificationCode({email, code, expiresAt}) {
		const codeDB = await Client.verificationCode.create({
			data: {
				email,
				code,
				expiresAt,
			}
		})
		return codeDB
	},
	async findVerificationByCode(code) {
		const verification = await Client.verificationCode.findUnique({
			where: { code: code }
		});
		return verification;
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
};
