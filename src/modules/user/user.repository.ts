import { PrismaClient } from "../../generated/prisma";
import type { UserRepository as RepoContract } from "./types/user.contracts";
import {
	AppError,
	InternalServerError,
	NotFoundError,
} from "@errors/app.errors";

const Client = new PrismaClient();

export const UserRepository: RepoContract = {
	async findByEmail(email) {
		throw new AppError("Function not implemented.", 500);
	},
	async findByUsername(username) {
		throw new AppError("Function not implemented.", 500);
	},
	async findByIdWithPassword(id) {
		throw new AppError("Function not implemented.", 500);
	},
	async findById(id) {
		throw new AppError("Function not implemented.", 500);
	},
	async createVerificationCode(email) {
		throw new AppError("Function not implemented.", 500);
	},
	async findVerificationByCode(code) {
		throw new AppError("Function not implemented.", 500);
	},
	async create(data) {
		throw new AppError("Function not implemented.", 500);
	},
};
