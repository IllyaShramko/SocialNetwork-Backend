import { type Prisma } from "../../../generated/prisma";
import { type InferType } from "yup";
import { loginSchema, regSchema } from "../user.schema";

export type User = Prisma.UserGetPayload<{
	omit: {
		password: true;
	};
	include: {
		avatars: {
			include: {
				image: true;
			};
		};
	};
}>;

export type Avatar = Prisma.AvatarGetPayload<{
	include: {
		image: true
	}
}>

export type VerificationCode = Prisma.VerificationCodeGetPayload<{}>;

export type CreateUserPayload = Prisma.UserUncheckedCreateInput;

export type UserWithPassword = Prisma.UserGetPayload<{}>;

export type LoginCredentials = InferType<typeof loginSchema>;

export type RegisterCredentials = InferType<typeof regSchema>;

export interface UserAvatarDTO {}

export interface UserProfileDTO {
	username?: string;
	firstName?: string;
	surname?: string;
	birthday?: Date;
	email?: string;
}

export interface UpdatePasswordDTO {
	newPassword: string;
}

export interface UpdateSiqnatureDTO {}

export type UserUpdate = Prisma.UserUpdateInput;

export type MeDTO = {
	userId: number;
};
export type TokenDTO = {
	token: string;
};

export type VerificationResult = "SUCCESS" | "NOT_CORRECT" | "EXPIRED";

export type CodeType = "PASSWORD_RESET" | "EMAIL_VERIFICATION";

export type VerificationCodeCreate = Prisma.VerificationCodeCreateInput;

export type Image = Prisma.ImageGetPayload<{}>;
