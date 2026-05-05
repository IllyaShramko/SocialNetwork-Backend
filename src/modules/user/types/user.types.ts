import { type Prisma } from "../../../generated/prisma";
import { type InferType } from "yup";
import { loginSchema, regSchema } from "../user.schema";

export type User = Prisma.UserGetPayload<{
	include: {
		profile: true;
	};
	omit: {
		password: true;
	};
}>;

export type Profile = Prisma.ProfileGetPayload<{}>
// export type VerificationCode = Prisma.VerificationCodeGetPayload<{}>;

export interface CreateUserDTO {
	email: string;
	password: string;
}

export type UserWithPassword = Prisma.UserGetPayload<{}>;

export type LoginCredentials = InferType<typeof loginSchema>;

export type RegisterCredentials = InferType<typeof regSchema>;


export interface UserUpdateDTO {
	username?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
}

export interface ProfileUpdateDTO {
	birthDate?: Date;
	avatar?: string;
}

export type UserAndProfileUpdateDTO = UserUpdateDTO & ProfileUpdateDTO

export interface UpdatePasswordDTO {
	newPassword: string;
}

export type UserUpdate = Prisma.UserUpdateInput;

export type MeDTO = {
	userId: number;
};
export type TokenDTO = {
	token: string;
};

export type VerificationResult = "SUCCESS" | "NOT_CORRECT" | "EXPIRED";

export type CodeType = "PASSWORD_RESET" | "EMAIL_VERIFICATION";

// export type VerificationCodeCreate = Prisma.VerificationCodeCreateInput;
