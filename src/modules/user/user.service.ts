import { UserService as ServiceContract } from "./types/user.contracts";
import { UserRepository } from "./user.repository";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { env } from "../../config/env";
import { CreateUserPayload } from "./types/user.types";
import {
	NotFoundError,
	AuthenticationError,
	ConflictError,
} from "@errors/app.errors";

export const UserService: ServiceContract = {
	login: async (credentials) => {
		const user = await UserRepository.findByEmail(credentials.email);
		if (!user) {
			throw new NotFoundError("User");
		}
		const userWithPassword = await UserRepository.findByIdWithPassword(
			user.id,
		);
		if (!userWithPassword) {
			throw new NotFoundError("User");
		}

		const isMatched = await compare(
			credentials.password,
			userWithPassword.password,
		);

		if (!isMatched) {
			throw new AuthenticationError(`Passwords aren't match`);
		}

		const token = sign(
			{
				id: userWithPassword.id,
			},
			env.SECRET_KEY,
			{
				expiresIn: "7d",
			},
		);
		return { token };
	},
	register: async (credentials) => {
		const existingUserByEmail = await UserRepository.findByEmail(
			credentials.email,
		);
		if (existingUserByEmail) {
			throw new ConflictError(`User with email ${credentials.email}`);
		}
		const existingUserByUsername = await UserRepository.findByUsername(
			credentials.username,
		);
		if (existingUserByUsername) {
			throw new ConflictError(
				`User with username ${credentials.username}`,
			);
		}
		const hashedPassword = await hash(credentials.password, 10);
		const userToCreate: CreateUserPayload = {
			...credentials,
			password: hashedPassword,
		};
		const newUser = await UserRepository.create(userToCreate);
		const token = sign(
			{
				id: newUser.id,
			},
			env.SECRET_KEY,
			{
				expiresIn: "7d",
			},
		);
		return { token };
	},
	me: async (DTO) => {
		const user = await UserRepository.findById(DTO.userId);
		if (!user) {
			throw new NotFoundError("User");
		}
		return user;
	},
};