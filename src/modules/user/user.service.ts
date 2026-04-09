import { transporter } from "@config/mail";
import { UserService as ServiceContract } from "./types/user.contracts";
import { UserRepository } from "./user.repository";
import {
	AppError,
	AuthenticationError,
	ConflictError,
	InternalServerError,
	NotFoundError,
} from "@errors/app.errors";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { env } from "node:process";
import { CreateUserPayload } from "./types/user.types";

export const UserService: ServiceContract = {
	async login(credentials) {
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

		const isMatch = await compare(
			credentials.password,
			userWithPassword.password,
		);

		if (!isMatch) {
			throw new AuthenticationError(`Passwords aren't match`);
		}

		const token = sign(
			{
				id: user.id,
			},
			env.SECRET_KEY as string,
			{
				expiresIn: "7d",
			},
		);
		return { token };
	},
	async register(credentials) {
		const existingUserByEmail = await UserRepository.findByEmail(
			credentials.email,
		);
		if (existingUserByEmail) {
			throw new ConflictError(`User with email ${credentials.email}`);
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
			env.SECRET_KEY as string,
			{
				expiresIn: "7d",
			},
		);
		return { token };
	},
	async generateCode(email) {
		const user = await UserRepository.findByEmail(email);
		if (user) {
			return { message: "ALREADY_EXISTS" };
		}
		function generateCode() {
			let code = "";
			for (let index = 0; index < 6; index++) {
				code += `${Math.round(Math.random() * 9)}`;
			}
			return code;
		}
		const code = generateCode();
		const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
		try {
			await UserRepository.createVerificationCode({
				email,
				code,
				expiresAt,
			});
		} catch (error) {
			throw new InternalServerError("Error creating verification code");
		}
		transporter.sendMail({
			from: "World.IT",
			to: email,
			subject: "Confirm code",
			text: `Hello there! Confirm code to create new account: ${code}`,
		});
		return { message: "SUCCESS" };
	},
	async validateCode(code, email) {
		const verification = await UserRepository.findVerificationByCode(code);
		if (!verification) {
			throw new NotFoundError("Verification code not found");
		}
		if (verification.expiresAt < new Date()) {
			throw new NotFoundError("Verification code has expired");
		}
		if (verification.email !== email) {
			throw new NotFoundError("Verification code is not correct");
		}
		return { message: "SUCCESS" };
	},
	async me(DTO) {
        const user = await UserRepository.findById(DTO.userId);
        if (!user) {
            throw new NotFoundError("User");
        }
        return user;
	},
};
