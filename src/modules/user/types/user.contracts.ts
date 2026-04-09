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
	) => Promise<{ message: "SUCCESS" | "ALREADY_EXISTS" }>;
	validateCode: (
		code: string, email: string
	) => Promise<{ message: "SUCCESS" | "NOT_CORRECT" | "EXPIRED" }>;
	me: (DTO: MeDTO) => Promise<User>;
}
export interface UserRepository {
	findByEmail: (email: string) => Promise<User | null>;
	findByIdWithPassword: (id: number) => Promise<UserWithPassword | null>;
	findById: (id: number) => Promise<User | null>;
	createVerificationCode: (data: { email: string; code: string; expiresAt: Date; }) => Promise<VerificationCode | null>;
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
		req: Request<object, { message: "SUCCESS" | "ALREADY_EXISTS" }, { email: string }>,
		res: Response<{ message: "SUCCESS" | "ALREADY_EXISTS" }>,
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
