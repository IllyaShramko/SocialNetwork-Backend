import type { NextFunction, Request, Response } from "express";
import type {
	Avatar,
	CodeType,
	CreateUserPayload,
	LoginCredentials,
	MeDTO,
	RegisterCredentials,
	TokenDTO,
	UpdatePasswordDTO,
	User,
	UserProfileDTO,
	UserUpdate,
	UserWithPassword,
	VerificationCode,
	VerificationCodeCreate,
	VerificationResult,
} from "./user.types";
import { AuthenticatedUser } from "../../../types/token";

export interface UserService {
	login: (credentials: LoginCredentials) => Promise<TokenDTO>;
	register: (credentials: RegisterCredentials) => Promise<TokenDTO>;
	generateCode: (
		email: string,
		type: CodeType,
	) => Promise<{ message: "SUCCESS" }>;
	validateCode: (
		code: string,
		email: string,
	) => Promise<{ message: VerificationResult }>;
	me: (DTO: MeDTO) => Promise<User>;
	updateAvatar: (userId: number, filename: string) => Promise<User>;
	updateProfile: (userId: number, data: UserProfileDTO) => Promise<User>;
	updatePassword: (userId: number, newPassword: string) => Promise<User>;
	updateSignature: (userId: number, filename: string) => Promise<User>;
	getMyAvatars: (userId: number) => Promise<Avatar[]>;
	deleteAvatar: (
		userId: number,
		id: number,
	) => Promise<{ message: "SUCCESS" }>;
}

export interface UserRepository {
	findByEmail: (email: string) => Promise<User | null>;
	findByIdWithPassword: (id: number) => Promise<UserWithPassword>;
	findById: (id: number) => Promise<User>;
	createVerificationCode: (
		data: VerificationCodeCreate,
	) => Promise<VerificationCode>;
	findVerificationByCode: (
		code: string,
		email: string,
	) => Promise<VerificationCode>;
	create: (data: CreateUserPayload) => Promise<User>;
	updateProfile: (userId: number, data: UserUpdate) => Promise<User>;
	getAvatarsByUserId: (userId: number) => Promise<Avatar[]>;
	uploadAvatar: (userId: number, filename: string) => Promise<User>;
	deleteAvatar: (id: number) => Promise<{ message: "SUCCESS" }>;
	findAvatarById: (id: number) => Promise<Avatar>;
}

export interface UserController {
	login: (
		req: Request<object, TokenDTO, LoginCredentials>,
		res: Response<TokenDTO>,
		next: NextFunction,
	) => void;
	register: (
		req: Request<object, TokenDTO, RegisterCredentials>,
		res: Response<TokenDTO>,
		next: NextFunction,
	) => void;
	generateCode: (
		req: Request<
			object,
			{ message: "SUCCESS" | "ALREADY_EXISTS" },
			{ email: string }
		>,
		res: Response<{ message: "SUCCESS" | "ALREADY_EXISTS" }>,
		next: NextFunction,
	) => void;
	validateCode: (
		req: Request<
			object,
			{ message: "SUCCESS" | "NOT_CORRECT" | "EXPIRED" },
			{ email: string; code: string }
		>,
		res: Response<{ message: "SUCCESS" | "NOT_CORRECT" | "EXPIRED" }>,
		next: NextFunction,
	) => void;
	me: (
		req: Request<object, object, object, object, AuthenticatedUser>,
		res: Response<User, AuthenticatedUser>,
		next: NextFunction,
	) => void;

	updateAvatar: (
		req: Request<object, object, object, object, AuthenticatedUser>,
		res: Response<User, AuthenticatedUser>,
		next: NextFunction,
	) => void;

	updateProfile: (
		req: Request<object, object, UserProfileDTO, object, AuthenticatedUser>,
		res: Response<User, AuthenticatedUser>,
		next: NextFunction,
	) => void;

	updatePassword: (
		req: Request<
			object,
			object,
			UpdatePasswordDTO,
			object,
			AuthenticatedUser
		>,
		res: Response<User, AuthenticatedUser>,
		next: NextFunction,
	) => void;

	updateSignature: (
		req: Request<object, object, object, object, AuthenticatedUser>,
		res: Response<User, AuthenticatedUser>,
		next: NextFunction,
	) => void;

	sendVerificationPasswordResetCode: (
		req: Request<
			object,
			{ message: "SUCCESS" | "NOT_EXISTS" },
			{ email: string }
		>,
		res: Response<{ message: "SUCCESS" | "NOT_EXISTS" }>,
		next: NextFunction,
	) => void;

	getAvatars: (
		req: Request<object, Avatar[], object, object, AuthenticatedUser>,
		res: Response<Avatar[], AuthenticatedUser>,
		next: NextFunction,
	) => void;

	deleteAvatar: (
		req: Request<
			{ id: string },
			{ message: "SUCCESS" },
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<{ message: "SUCCESS" }, AuthenticatedUser>,
		next: NextFunction,
	) => void;
}
