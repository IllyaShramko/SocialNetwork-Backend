import type { NextFunction, Request, Response } from "express";
import type {
	CodeType,
	CreateUserDTO,
	LoginCredentials,
	MeDTO,
	Profile,
	ProfileUpdate,
	ProfileWithAlbumsAndPostsAndUser,
	RegisterCredentials,
	TokenDTO,
	UpdatePasswordDTO,
	User,
	UserAndProfileUpdateDTO,
	UserUpdate,
	UserUpdateDTO,
	UserWithPassword,
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
	updateProfile: (
		userId: number,
		data: UserAndProfileUpdateDTO,
	) => Promise<User>;
	updatePassword: (userId: number, newPassword: string) => Promise<User>;
	updateSignature: (userId: number, filename: string) => Promise<User>;
	getFullProfileById: (
		id: number,
	) => Promise<ProfileWithAlbumsAndPostsAndUser>;
}

export interface UserRepository {
	findByEmail: (email: string) => Promise<User | null>;
	findByIdWithPassword: (id: number) => Promise<UserWithPassword>;
	findById: (id: number) => Promise<User>;
	findProfileByUserId: (userId: number) => Promise<Profile>;
	// createRequest: (userId: number, toId:number) => Promise<>
	getFullProfileById: (
		id: number,
	) => Promise<ProfileWithAlbumsAndPostsAndUser>;
	create: (data: CreateUserDTO) => Promise<User>;
	updateUser: (userId: number, data: UserUpdate) => Promise<User>;
	updateProfile: (
		userId: number,
		data: ProfileUpdate & UserUpdate,
	) => Promise<User>;
	// createVerificationCode: (
	// 	data: VerificationCodeCreate,
	// ) => Promise<VerificationCode>;
	// findVerificationByCode: (
	// 	code: string,
	// 	email: string,
	// ) => Promise<VerificationCode>;
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
			{ message: VerificationResult },
			{ email: string; code: string }
		>,
		res: Response<{ message: VerificationResult }>,
		next: NextFunction,
	) => void;
	me: (
		req: Request<object, User, object, object, AuthenticatedUser>,
		res: Response<User, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	updateAvatar: (
		req: Request<object, User, object, object, AuthenticatedUser>,
		res: Response<User, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	updateProfile: (
		req: Request<
			object,
			User,
			UserAndProfileUpdateDTO,
			object,
			AuthenticatedUser
		>,
		res: Response<User, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	updatePassword: (
		req: Request<
			object,
			User,
			UpdatePasswordDTO,
			object,
			AuthenticatedUser
		>,
		res: Response<User, AuthenticatedUser>,
		next: NextFunction,
	) => void;
	updateSignature: (
		req: Request<object, User, object, object, AuthenticatedUser>,
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
	getFullProfileById: (
		req: Request<
			{ profileId: string },
			ProfileWithAlbumsAndPostsAndUser,
			object,
			object,
			AuthenticatedUser
		>,
		res: Response<ProfileWithAlbumsAndPostsAndUser, AuthenticatedUser>,
		next: NextFunction,
	) => void;
}
