import type { NextFunction, Request, Response } from "express";
import type {
	CreateUserPayload,
	LoginCredentials,
	MeDTO,
	RegisterCredentials,
	TokenDTO,
	User,
	UserWithPassword,
	VerificationCode,
} from "./user.types";
import { AuthenticatedUser, TokenPayload } from "../../../types/token";

export interface UserService {
	login: (credentials: LoginCredentials) => Promise<TokenDTO>;
	register: (credentials: RegisterCredentials) => Promise<TokenDTO>;
	generateCode: (
		email: string,
	) => Promise<{ message: "SUCCESS" | "ALREADY_EXISTS" | "INTERNAL_ERROR" }>;
	validateCode: (
		code: string,
	) => Promise<{ message: "SUCCESS" | "NOT_CORRECT" | "EXPIRED" }>;
	me: (DTO: MeDTO) => Promise<User>;
}
export interface UserRepository {
	findByEmail: (email: string) => Promise<User | null>;
	findByUsername: (username: string) => Promise<User | null>;
	findByIdWithPassword: (id: number) => Promise<UserWithPassword | null>;
	findById: (id: number) => Promise<User | null>;
	createVerificationCode: (email: string) => Promise<VerificationCode | null>;
	findVerificationByCode: (code: string) => Promise<VerificationCode | null>;
	create: (data: CreateUserPayload) => Promise<User>;
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
		req: Request<object, { message: "SUCCESS" | "ALREADY_EXISTS" | "INTERNAL_ERROR" }, { email: string }>,
		res: Response<{ message: "SUCCESS" | "ALREADY_EXISTS" | "INTERNAL_ERROR" }>,
		next: NextFunction,
	) => void;
	validateCode: (
		req: Request<object, { message: "SUCCESS" | "NOT_CORRECT" | "EXPIRED" }, { email: string, code: string }>,
		res: Response<{ message: "SUCCESS" | "NOT_CORRECT" | "EXPIRED" }>,
		next: NextFunction,
	) => void;
	me: (
		req: Request<object, object, object, object, AuthenticatedUser>,
		res: Response<User, AuthenticatedUser>,
		next: NextFunction,
	) => void;
}
